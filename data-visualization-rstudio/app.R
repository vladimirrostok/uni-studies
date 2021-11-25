library(shiny)
library(ggplot2)
library(plotly)
library(ggcorrplot)
library(summarytools)

## Loeme andmed, kustutame kõik read kus on puuduvaid andmeid
carClaims<-read.csv("data/car_insurance_claim.csv",sep = ",", na.strings=c("", "","NA"), header = T)
## Eemaldame ID, BIRTH ja CLAIM_FLAG tunnused. Kasutame ainult need andmed, kus CLM_AMT ei ole tühi


## Asenda ingliskeelsed nimed eestikeelsete nimedega
kov <- c(1:length(carClaims$CAR_USE))
kov[carClaims$CAR_USE=="Commercial"] <- "Äri"
kov[carClaims$CAR_USE=="Private"] <- "Isiklik"

carClaims$CAR_USE <- kov

carClaims = carClaims[c(2,4:25,27)]
carClaims = na.omit(carClaims)
### Andmete puhastamine
## Konverteerime tüübid
carClaims <- type.convert(carClaims)
## Eemaldame kõik $ märgid andmestikust
indx <- sapply(carClaims, is.factor) 
carClaims[indx] <- lapply(carClaims[indx], function(x) as.factor(gsub("\\$", "", x)))
## Vahetame kõik komad "," punktide "." vastu
indx <- sapply(carClaims, is.factor) 
carClaims[indx] <- lapply(carClaims[indx], function(x) as.factor(gsub(",", "", x)))
## Eemaldame kõik keeldud nõuded (claim_amount=0)
carClaims<-carClaims[!(carClaims$CLM_AMT==0),]
## Uuendame tüübid uuesti, faktorid muutuvad arvulisteks tunnusteks
carClaims <- type.convert(carClaims)
## Eemaldame ekslikud andmed. Tühjad auto vanused ja negatiivsed auto vanused
carClaims<-carClaims[!(carClaims$CAR_AGE<1),]
## Sorteerime tegurid ja täisarvud erinevatesse andmestikutesse
carClaimsFactors <- carClaims[,c(6,8:11,13,16,17,20,24)]
carClaimsNums <- carClaims[,c(1:5,7,12,14,15,18,19,21:23)]

carClaimsWithColors <- carClaims
carClaimsWithColors$värv <- as.factor(carClaimsFactors$CAR_TYPE)


carClaimsModified <- carClaims
carClaimsModified$PARENT1 <- as.numeric(as.factor(carClaimsFactors$PARENT1))
carClaimsModified$MSTATUS <- as.numeric(as.factor(carClaimsFactors$MSTATUS))
carClaimsModified$GENDER <- as.numeric(as.factor(carClaimsFactors$GENDER))
carClaimsModified$EDUCATION <- as.numeric(as.factor(carClaimsFactors$EDUCATION))
carClaimsModified$OCCUPATION <- as.numeric(as.factor(carClaimsFactors$OCCUPATION))
carClaimsModified$CAR_USE <- as.numeric(as.factor(carClaimsFactors$CAR_USE))
carClaimsModified$CAR_TYPE <- as.numeric(as.factor(carClaimsFactors$CAR_TYPE))
carClaimsModified$RED_CAR <- as.numeric(as.factor(carClaimsFactors$RED_CAR))
carClaimsModified$REVOKED <- as.numeric(as.factor(carClaimsFactors$REVOKED))
carClaimsModified$URBANICITY <- as.numeric(as.factor(carClaimsFactors$URBANICITY))



ui <- fluidPage(
  titlePanel("Autode kindlustusjuhtumite andmete visualiseerimine", windowTitle = "Kindlustusjuhtumid"),
  helpText("ITB8812 Andmete visualiseerimine (Virumaa).",br(),"Andmete visualiseerimise projekt.",br(), "Vladimir Andrianov, Vadim Aland"),
  br(),
  tabsetPanel(
    tabPanel("Sissejuhatus",
             sidebarLayout(
               sidebarPanel(img(src = "cars.jpg", height = 160, width = 250)),
               mainPanel(
                 h1("Sissejuhatus:"),
                 br(),
                 p("Autoreid huvitab liiklusõnnetuste kahjude sagedust ja suurust mõjutavate tegurite uurimine visuaalse pildi abil, et välja selgitada mustrid, mille alusel on võimalik ennustada liiklusõnnetuste sageduse tõenäosust või kahju suurust. Nende teadmiste põhjal on võimalik ennustada teatud sõidukitega sõitvate sotsiaalsete gruppide riske, ning kasutada need teadmised erinevate valdkondade otsuste tegemiseks."),
                 br(),
                 p("Autorid valisid oma projekti jaoks andmestiku, mis sisaldab auto kindlustus juhtumite andmeid. Andmestik on võetud Kaggle.com veebilehe andmestikude andmebaasist."),
                 br(),
                 h1("Antud visualisatsiooniga pakutakse:"),
                 br(),
                 p("1. Andmestiku mugav ülevaade tabeli kujul."),
                 p("2. Andmestiku tunnuste kirjeldus."),
                 p("3. Histograam liiklusõnnetuste tabamuste sagedust sõltuvalt vanusest, tulpade arv visualiseerimiseks muutuv 3-50 vahemikus."),
                 p("4. Tulpdiagramm, millel kuvame õnnetuste arv kahjumi suuruse lõikes, sõltuvalt auto tüübist ja laste arvust perekonnas."),
                 p("5. Jaotusdiagramm, millel kuvame õnnetuste sagedust sõltuvalt valitud kriteeriumist ning era- ja äritranspordi lõikes."),
                 p("6. Kursuses 'Andmete visualiseerimine' omandatud meetodite ja teadmiste rakendamine."),
                 p('7. Kontrollime hüpoteesi  "Mida rohkem lapsi autojuhil on, seda turvalisem ta ennast liikluses käitub".'),
               )
             )
    ),
    tabPanel(
      "Andmed",
      mainPanel(
        verbatimTextOutput("summary"),
        dataTableOutput("tabel"),width="100%"),
    ),
    tabPanel(
      "Korrelatsioonimaatriks",
      mainPanel(
        plotOutput(outputId = "corrplot",  width = "100%"),
      )
    ),
    tabPanel(
      "Tunnused",
      mainPanel(
        h1("Tunnused:"),
        p("CLM_AMT - Kui auto oli kahjumijuhtumis, kui suur oli kahjumisuurus dollarites"),
        p("AGE - Juhi vanus"),
        p("BLUEBOOK - Auto maksumus"),
        p("CAR_AGE - Auto vanus"),
        p("CAR_TYPE - Auto tüüp"),
        p("CAR_USE - Auto kasutamise tüüp (kas äri või era)"),
        p("CLM_FREQ - Viimase viie aasta kahjujuhtumite kogus"),
        p("EDUCATION - Haridustase"),
        p("HOMEKIDS - Laste arv perekonnas"),
        p("HOME_VAL - Elukoha maksumus"),
        p("INCOME - Sissetulek"),
        p("JOB - Töökoha kategooria"),
        p("KIDSDRIV - Autojuhulubadega laste arv perekonnas"),
        p("MSTATUS - Perekonnaseis"),
        p("OLDCLAIM - Viimase viie aasta kahjumisuurus dollarites"),
        p("PARENT1 - Üksik vanem perekonnas"),
        p("RED_CAR - Punane auto"),
        p("REVOKED - Kas viimase seitse aasta järel oli autojuhiluba ära võetud"),
        p("SEX - Sugu"),
        p("TIF - Kindlustuslepingu kehtivus"),
        p("TRAVTIME - Kaugus tööle"),
        p("URBANICITY - Kodu/tööpiirkond"),
        p("YOJ - Aastat tööl")
      )
    ),
    
    tabPanel(
      "Juhtide vanuseline jaotus",
      sidebarLayout(
        sidebarPanel(
          sliderInput(inputId = "bins",
                      label = "Tulpade arv visualiseerimiseks:",
                      min = 3,
                      max = 50,
                      value = 20)
        ),
        mainPanel(
          br(),
          p("Sellel paneelil kuvame liiklusõnnetuste tabamuste sagedust sõltuvalt vanusest"),
          plotOutput(outputId = "Histogram")))
    ),
    tabPanel(
      "Sõltuvus laste arvust ja auto tüübist",
      mainPanel(
        sidebarLayout(
          sidebarPanel(
            radioButtons(inputId = "HOMEKIDS",
                         label = "1. Vali lapse arv:",
                         choices = c(0, 1, 2, 3, 4, 5)),
            selectInput(inputId = "CAR_TYPE",
                        label = "2. Vali auto tüüpi:",
                        choices = sort(unique(carClaims$CAR_TYPE)),
                        multiple = TRUE)
          ),
          mainPanel(
            br(),
            p("Sellel paneelil kuvame õnnetuste arv, sõltuvalt auto tüübist ja laste arvust perekonnas. Tulpdiagrammi ehitamiseks valige vähemalt auto tüübi."),
            plotOutput("cartypePlot"),
            tableOutput("employTable"))
        )
        
        
      )
    ),
    tabPanel(
      "Sõltuvus tunnusest",
      sidebarLayout(
        sidebarPanel(selectInput("var",
                                 label = "Vali tunnust:",
                                 choices = names(carClaimsNums[,-(13)]))),
        mainPanel(
          br(),
          p("Sellel paneelil kuvame õnnetuste sagedust sõltuvalt vasakult valitud kriteeriumist ning era- ja äritranspordi kontekstis."),
          plotlyOutput("distPlot", width = "80%",height="auto"))      
      )
    ),
  )
)

server <- function(input, output, session) {
  
  output$summary <- renderPrint({
    dataset <- carClaims
    dfSummary(dataset)
  })
  
  output$tabel <- renderDataTable(
    carClaims,
    options =list(
      searching = FALSE,ordering=F, lengthMenu = c(5, 10, 20),
      pageLength = 5,scrollX = TRUE
    )
  )  
  
  corr <- round(cor(carClaimsModified),1)
  
  output$corrplot <- renderPlot({
    ggcorrplot(corr,hc.order=TRUE,type="lower",lab=TRUE)
  }, height = 800, width = 800)
  
  output$distPlot <- renderPlotly({
    p <- ggplot(carClaims, aes_string(x = "CLM_AMT", y =input$var,
                                      colour = "CAR_USE",CAR_TYPE="CAR_TYPE")) +
      geom_point(data=carClaims,aes_string(x = "CLM_AMT", y =input$var,CAR_TYPE="CAR_TYPE"),
                 colour = "grey")+geom_point()+
      facet_wrap(~ CAR_USE)+
      theme(legend.position = "none")+
      scale_color_manual(values=c("#8B4513","#009FE3","#00983A","#FFDE00","#E30613","#82368C"))+
      xlab("Kahjumi suurus $")
    ggplotly(p,tooltip = c("CLM_AMT",input$var,"CAR_TYPE"))
  })
  
  output$Histogram <- renderPlot({
    x <- carClaims$AGE
    bins <- seq(min(x), max(x), length.out = input$bins + 1)
    hist(x, breaks = bins, col = "#75AADB", border = "white",
         xlab = "Vanus",
         main = "Juhi vanuse histogramm",
         ylab = "Sagedus (korda)") })
  
  output$cartypePlot <- renderPlot({
    carClaimsWithColors %>%
      filter(HOMEKIDS == input$HOMEKIDS,
             CAR_TYPE %in% input$CAR_TYPE) %>%
      ggplot(aes(CLM_AMT,fill=värv)) +
      ylab("Sagedus (korda)")+
      xlab("Kahjumi suurus $")+
      geom_histogram()
  }) 
}
shinyApp(ui = ui, server = server)