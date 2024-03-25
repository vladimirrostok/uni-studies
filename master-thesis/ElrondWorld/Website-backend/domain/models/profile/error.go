package profile

type (
	// AlreadyExists signifies a profile with a specified wallet address already exists in the system.
	AlreadyExists struct{}

	// IsInactive signifies a profile fails being active invariant.
	IsInactive struct{}

	// NotFound signifies a profile is not found.
	NotFound struct{}
)

func (err AlreadyExists) Error() string {
	return "profile already exists"
}

func (err IsInactive) Error() string {
	return "profile is inactive"
}

func (err NotFound) Error() string {
	return "profile does not exist"
}
