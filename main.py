from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

data= pd.read_csv(r"./src/Gesamtdatensatz.csv")



origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)



@app.get("/v1/pedestrians_count")
def erkundung(date: str = "2024-04-21", weather_condition: str | None = None, direction: str | None = None, age: str | None = None): #define a function that takes a name as a query parameter

    data_filtered=pd.DataFrame()
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


    
        data_filtered=pd.concat([data_filtered, dataframe_hour])
        
        if weather_condition is not None:
            if "weather_condition" in data_filtered.columns:
                data_filtered = data_filtered[data_filtered["weather_condition"] == weather_condition]
                
        if direction is not None:
            if direction.lower() == "bahnhof":
        # Wir definieren: Richtung Bahnhof = rtl 
                data_filtered["direction_label"] = data_filtered["rtl_label"]
                data_filtered["direction_count"] = data_filtered["rtl_pedestrians_count"]

            elif direction.lower() in ["bürkliplatz", "uraniastrasse"]:
        # Richtung Bürkliplatz/Uraniastrasse = ltr 
                data_filtered["direction_label"] = data_filtered["ltr_label"]
                data_filtered["direction_count"] = data_filtered["ltr_pedestrians_count"]

                
                
        if age is not None:
            if age == "Erwachsen":
                data_filtered = data_filtered[
                    data_filtered["adult_pedestrians_count"] > 0 #alle zeilen die mehr als 0 erwachsene haben
                ]
            elif age == "Kind":
                data_filtered = data_filtered[
                data_filtered["child_pedestrians_count"] > 0
            ]
                
                
    data_fragestellung=data_filtered.to_json( orient="records", indent=2) #orient="records", indent=2 orient ist dafür da um ein Array zu erhalten und nicht ein Dictionary, ident für bessere lesbarkeit nicht alles auf einer Zeile



    return data_fragestellung

