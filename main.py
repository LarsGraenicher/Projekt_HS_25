from fastapi import FastAPI
import pandas as pd



app = FastAPI()

data= pd.read_csv(r"C:\Users\lars2\FHNW_lokal\WID\Projekt\Projekt_HS_25\src\Gesamtdatensatz.csv")

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)



@app.get("/v1/pedestrians_count")
def erkundung(date: str = "2024-04-21"): #define a function that takes a name as a query parameter

    data_filtered_date=pd.DataFrame()
    for hour in range (24):
        dataframe_hour= data[(data['timestamp'] == f"{date}T{hour:02d}:00:00Z")]
    
        location_name= "Bahnhofstrasse (Nord)"
    
        for i in range (2):
            maske=(dataframe_hour["location_name"] == location_name)

            ltr_label=dataframe_hour.loc[maske, "ltr_label"]  #.loc und .iloc werden gebraucht um wirklich auf den Wert zuzugreifen.
                                                                    #Ohne diese Tools wird eine Serie "Ausschnitt aus dem Dataframe gemacht"
                                                                    #Dieser hat den nicht den Datentyp str sonder object und denn kann man dann nicht weiterverwenden
            rtl_label=dataframe_hour.loc[maske, "rtl_label"]
            dataframe_hour.loc[maske, "ltr_label"]=rtl_label
            dataframe_hour.loc[maske, "rtl_label"]=ltr_label

            ltr_pedestrians_count = dataframe_hour.loc[maske, "ltr_pedestrians_count"]
            rtl_pedestrians_count = dataframe_hour.loc[maske, "rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "ltr_pedestrians_count"] = rtl_pedestrians_count
            dataframe_hour.loc[maske, "rtl_pedestrians_count"] = ltr_pedestrians_count

            adult_ltr_pedestrians_count = dataframe_hour.loc[maske, "adult_ltr_pedestrians_count"]
            adult_rtl_pedestrians_count = dataframe_hour.loc[maske, "adult_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "adult_ltr_pedestrians_count"] = adult_rtl_pedestrians_count
            dataframe_hour.loc[maske, "adult_rtl_pedestrians_count"] = adult_ltr_pedestrians_count

            child_ltr_pedestrians_count = dataframe_hour.loc[maske, "child_ltr_pedestrians_count"]
            child_rtl_pedestrians_count = dataframe_hour.loc[maske, "child_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "child_ltr_pedestrians_count"] = child_rtl_pedestrians_count
            dataframe_hour.loc[maske, "child_rtl_pedestrians_count"] = child_ltr_pedestrians_count

            zone_1_ltr_pedestrians_count = dataframe_hour.loc[maske, "zone_1_ltr_pedestrians_count"]
            zone_1_rtl_pedestrians_count = dataframe_hour.loc[maske, "zone_1_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "zone_1_ltr_pedestrians_count"] = zone_1_rtl_pedestrians_count
            dataframe_hour.loc[maske, "zone_1_rtl_pedestrians_count"] = zone_1_ltr_pedestrians_count

            zone_2_ltr_pedestrians_count = dataframe_hour.loc[maske, "zone_2_ltr_pedestrians_count"]
            zone_2_rtl_pedestrians_count = dataframe_hour.loc[maske, "zone_2_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "zone_2_ltr_pedestrians_count"] = zone_2_rtl_pedestrians_count
            dataframe_hour.loc[maske, "zone_2_rtl_pedestrians_count"] = zone_2_ltr_pedestrians_count

            zone_3_ltr_pedestrians_count = dataframe_hour.loc[maske, "zone_3_ltr_pedestrians_count"]
            zone_3_rtl_pedestrians_count = dataframe_hour.loc[maske, "zone_3_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "zone_3_ltr_pedestrians_count"] = zone_3_rtl_pedestrians_count
            dataframe_hour.loc[maske, "zone_3_rtl_pedestrians_count"] = zone_3_ltr_pedestrians_count

            zone_99_ltr_pedestrians_count = dataframe_hour.loc[maske, "zone_99_ltr_pedestrians_count"]
            zone_99_rtl_pedestrians_count = dataframe_hour.loc[maske, "zone_99_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "zone_99_ltr_pedestrians_count"] = zone_99_rtl_pedestrians_count
            dataframe_hour.loc[maske, "zone_99_rtl_pedestrians_count"] = zone_99_ltr_pedestrians_count


            location_name = "Bahnhofstrasse (Süd)"


    
        data_filtered_date=pd.concat([data_filtered_date, dataframe_hour])
    data_fragestellung=data_filtered_date.to_json( orient="records", indent=2) #orient="records", indent=2 orient ist dafür da um ein Array zu erhalten und nicht ein Dictionary, ident für bessere lesbarkeit nicht alles auf einer Zeile



    return data_fragestellung
