#include "DHT.h"
//#include <WiFiUdp.h>
#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#define DHTPIN 13
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
WiFiClient wifiClient;
HTTPClient http;    //Declare object of class HTTPClient
const long utcOffsetInSeconds =3600;
// A UDP instance to let us send and receive packets over UDP
//WiFiUDP ntpUDP;
//NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds); //wifi nötig



void setup() {
  Serial.begin(115200);
  WiFi.begin("GoMerlin2", "Merlin1995");
  dht.begin(); //start the temp reading (agian only for temperature sensor
}

void loop() {
  //while(!timeClient.update()) 
    //{timeClient.forceUpdate();}
  //read the temperature and humidity (temperature sensor specific code)
  float humidity = dht.readHumidity(); //read humidity
  float temperature = dht.readTemperature(); //read temperature (C)
  //String zeit = timeClient.getFormattedTime() ;//read time

  send_to_server(humidity,temperature);

  // check if returns are valid
  /*if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT");
  } else {  //if it read correctly
    Serial.print(humidity);     //humidity
    Serial.print(" \t"); //tab
    Serial.println(temperature);   //temperature (C)
  }*/
  delay(1000);
}
void send_to_server(float t,float h) {
  String postData = "temperatur=" + (String)t +"&" + "humidity=" +(String)h;
  
  
  if (WiFi.status() == WL_CONNECTED) 
  { //Check WiFi connection status
    // Send and get Data
    http.begin(wifiClient,"http://192.168.0.126:3007/api/dataSave");              //Specify request destination
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");    //Specify content-type header
    int httpCode = http.POST(postData);   //Send the request
    Serial.println(httpCode);   //Print HTTP return code
    http.end();  //Close connection
    Serial.println(postData);
  }
  
  else 
  {
    Serial.println("Error in WiFi connection");
  }
  

}
