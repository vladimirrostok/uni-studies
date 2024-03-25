import { FC, useEffect, useState } from "react";
import Box from "../containers/Box";
import Form from "../containers/Form";
import FieldInput from "../fields/Input";
import FieldLabel from "../fields/Label";
import FieldTextarea from "../fields/Textarea";
import axios from "axios";
import SubmitButton from "../fields/Button";
import { getWalletService } from "../../setup";
import { useRouter } from "next/router";
import FormModalUpdate from "./ModalUpdate";
import H2 from "../fields/H2";
import PopoverDescription from "../containers/PopoverDescription";

const backend_base_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const FormEditProfile: FC = () => {
  const router = useRouter();

  let wltAddress = "";

  const [defaultUsername, setUsername] = useState("Username");
  const [defaultBio, setBio] = useState("Bio");
  const [defaultWebsite, setWebsite] = useState("website.com");
  const [defaultTwitter, setTwitter] = useState("@TwitterUsername");
  const [defaultDiscord, setDiscord] = useState("Username#0000");
  const [defaultTelegram, setTelegram] = useState("@TelegramUsername");
  const [defaultFacebook, setFacebook] = useState("FacebookUsername");
  const [defaultInstagram, setInstagram] = useState("InstagramUsername");

  const [formStatus, setFormStatus] = useState(false);
  const [query, setQuery] = useState({});

  // Wait till page loads and fetch address to include it into the call.
  // Otherwise will fail with wlt.GetAddress() not-logged error.
  useEffect(() => {
    const fetchData = async () => {
      let wlt = getWalletService();
      if (wlt.isLoggedIn() === true) {
        wltAddress = wlt.getAddress();
      } else {
        await router.push("/");
        return;
      }

      const url =
        backend_base_url + "/profile?profile_wallet_address=" + wltAddress;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Unable to get data from ${url}.`);
      }

      let fetched = await res.json();

      if (fetched.profile_name) setUsername(fetched.profile_name);
      if (fetched.profile_bio) setBio(fetched.profile_bio);
      if (fetched.profile_website) setWebsite(fetched.profile_website);
      if (fetched.profile_twitter) setTwitter(fetched.profile_twitter);
      if (fetched.profile_discord) setDiscord(fetched.profile_discord);
      if (fetched.profile_telegram) setTelegram(fetched.profile_telegram);
      if (fetched.profile_facebook) setFacebook(fetched.profile_facebook);
      if (fetched.profile_instagram) setInstagram(fetched.profile_instagram);

      setQuery({
        profile_wallet_address: wltAddress,
        username: defaultUsername,
        bio: defaultBio,
        profile_banner_file: "",
        profile_image_file: "",
        website: defaultWebsite,
        twitter: defaultTwitter,
        discord: defaultDiscord,
        telegram: defaultTelegram,
        facebook: defaultFacebook,
        instagram: defaultInstagram,
      });
    };

    fetchData();
  }, []);

  const handleFileChange = () => (e) => {
    const name = e.target.name;
    setQuery((prevState) => ({
      ...prevState,
      [name]: e.target.files[0],
    }));
  };

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });
    axios
      .post(backend_base_url + "/profile/update", formData, {
        headers: { Accept: "application/json" },
      })
      .then(function (response) {
        setFormStatus(true);
        setQuery({
          profile_wallet_address: wltAddress,
          username: "",
          bio: "",
          profile_banner_file: null,
          profile_image_file: null,
          website: "",
          twitter: "",
          discord: "",
          telegram: "",
          facebook: "",
          instagram: "",
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Form
      acceptCharset="UTF-8"
      method="POST"
      encType="multipart/form-data"
      id="ajaxForm"
      onSubmit={handleSubmit}
    >
      <Box className="flex-col lg:flex-row mt-10">
        <Box className="flex-col lg:w-7/12 lg:mr-10">
          <H2>Profile</H2>
          <Box className="flex-col p-10 box_bordered -mt-5 mb-5">
            <Box className="flex-col lg:w-1/2">
              <FieldLabel htmlFor="username" className="label_popover">
                {"Username *"}
                <PopoverDescription>
                  {"Enter your display name."}
                </PopoverDescription>
              </FieldLabel>
              <FieldInput
                id="username"
                type="text"
                name="username"
                placeholder={defaultUsername}
                value={defaultUsername}
                onChange={handleChange()}
                required
              ></FieldInput>
            </Box>
            <Box className="flex-col">
              <FieldLabel htmlFor="bio" className="label_popover">
                {"Bio *"}
                <PopoverDescription>
                  {"Enter a description of your project."}
                </PopoverDescription>
              </FieldLabel>
              <FieldTextarea
                id="bio"
                placeholder={defaultBio}
                value={defaultBio}
                name="bio"
                onChange={handleChange()}
                required
              ></FieldTextarea>
            </Box>
          </Box>
          <H2>Images</H2>
          <Box className="flex-col xl:flex-row p-10 box_bordered -mt-5 mb-5">
            <Box className="flex-col xl:mr-auto">
              <FieldLabel htmlFor="file" className="label_popover">
                {"Profile Image *"}
                <PopoverDescription>
                  {
                    "Recommended size: 500x500px. JPG, PNG, or GIF. 10MB max size."
                  }
                </PopoverDescription>
              </FieldLabel>
              <FieldInput
                id="profile_image_file"
                type="file"
                name="profile_image_file"
                onChange={handleFileChange()}
                required
              ></FieldInput>
            </Box>
            <Box className="flex-col">
              <FieldLabel htmlFor="file" className="label_popover">
                {"Banner *"}
                <PopoverDescription>
                  {
                    "Recommended size: 1500x500px. JPG, PNG, or GIF. 5MB max size."
                  }
                </PopoverDescription>
              </FieldLabel>
              <FieldInput
                id="profile_banner_file"
                type="file"
                name="profile_banner_file"
                onChange={handleFileChange()}
              ></FieldInput>
            </Box>
          </Box>
        </Box>
        <Box className="flex-col lg:w-5/12">
          <H2>Social</H2>
          <Box className="flex-wrap p-10 box_bordered -mt-5 mb-5">
            <Box className="flex-col sm:mr-auto">
              <FieldLabel htmlFor="website" className="label_popover">
                {"Website *"}
                <PopoverDescription>
                  {"Personal site or portfolio"}
                </PopoverDescription>
              </FieldLabel>
              <FieldInput
                id="website"
                type="text"
                placeholder={defaultWebsite}
                name="website"
                onChange={handleChange()}
                required
              ></FieldInput>
            </Box>
            <Box className="flex-col">
              <FieldLabel htmlFor="twitter" className="label_popover">
                {"Twitter *"}
                <PopoverDescription>
                  {
                    "Link your Twitter account to gain more trust on the marketplace"
                  }
                </PopoverDescription>
              </FieldLabel>
              <FieldInput
                id="twitter"
                type="text"
                placeholder={defaultTwitter}
                name="twitter"
                onChange={handleChange()}
                required
              ></FieldInput>
            </Box>
            <Box className="flex-col sm:mr-auto">
              <FieldLabel htmlFor="discord">{"Discord"}</FieldLabel>
              <FieldInput
                id="discord"
                type="text"
                placeholder={defaultDiscord}
                name="discord"
                onChange={handleChange()}
              ></FieldInput>
            </Box>
            <Box className="flex-col">
              <FieldLabel htmlFor="telegram">{"Telegram"}</FieldLabel>
              <FieldInput
                id="telegram"
                type="text"
                placeholder={defaultTelegram}
                name="telegram"
                onChange={handleChange()}
              ></FieldInput>
            </Box>
            <Box className="flex-col sm:mr-auto">
              <FieldLabel htmlFor="facebook">{"Facebook"}</FieldLabel>
              <FieldInput
                id="facebook"
                type="text"
                placeholder={defaultFacebook}
                name="facebook"
                onChange={handleChange()}
              ></FieldInput>
            </Box>
            <Box className="flex-col">
              <FieldLabel htmlFor="instagram">{"Instagram"}</FieldLabel>
              <FieldInput
                id="instagram"
                type="text"
                placeholder={defaultInstagram}
                name="instagram"
                onChange={handleChange()}
              ></FieldInput>
            </Box>
          </Box>
        </Box>
      </Box>

      {formStatus ? (
        <>
          <FormModalUpdate />
        </>
      ) : (
        <SubmitButton type="submit" className="btn_solid my-10 mx-auto">
          {"Save"}
        </SubmitButton>
      )}
    </Form>
  );
};

export default FormEditProfile;
