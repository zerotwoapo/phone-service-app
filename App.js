import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [ariza, setAriza] = useState("");
  const [mesaj, setMesaj] = useState("");

  const [liste, setListe] = useState([]);

  // MARKA → MODEL
  const modeller = {
    iphone: [
      { label: "iPhone 11", value: "iphone11" },
      { label: "iPhone 12", value: "iphone12" },
      { label: "iPhone 13", value: "iphone13" },
      { label: "iPhone 14", value: "iphone14" },
      { label: "iPhone 15", value: "iphone15" },
      { label: "iPhone 16", value: "iphone16" },
      { label: "iPhone 17", value: "iphone17" },
      { label: "iPhone 17 Pro", value: "iphone17pro" },
      { label: "iPhone 17 Pro Max", value: "iphone17promax" }
    ],
    samsung: [
      { label: "Galaxy A32", value: "a32" },
      { label: "Galaxy A52", value: "a52" },
      { label: "Galaxy A72", value: "a72" },
      { label: "Galaxy S20", value: "s20" },
      { label: "Galaxy S21", value: "s21" },
      { label: "Galaxy S22", value: "s22" },
      { label: "Galaxy S23", value: "s23" },
      { label: "Galaxy S24", value: "s24" },
      { label: "Galaxy S24 Ultra", value: "s24ultra" }
    ]
  };

  // MODEL → FİYAT ÇARPANI
  const modelCarpan = (model) => {
    const iphoneLevels = {
      iphone11: 1,
      iphone12: 1.1,
      iphone13: 1.2,
      iphone14: 1.3,
      iphone15: 1.4,
      iphone16: 1.5,
      iphone17: 1.6,
      iphone17pro: 1.8,
      iphone17promax: 2
    };

    const samsungLevels = {
      a32: 1,
      a52: 1.1,
      a72: 1.2,
      s20: 1.3,
      s21: 1.4,
      s22: 1.5,
      s23: 1.6,
      s24: 1.8,
      s24ultra: 2
    };

    if (iphoneLevels[model]) return iphoneLevels[model];
    if (samsungLevels[model]) return samsungLevels[model];

    return 1;
  };

  // FİYAT HESAPLA
  const fiyatHesapla = () => {
    let base = 0;

    if (marka === "iphone") {
      if (ariza === "ekran") base = 4000;
      if (ariza === "batarya") base = 1800;
      if (ariza === "hoparlor") base = 1300;
    }

    if (marka === "samsung") {
      if (ariza === "ekran") base = 2500;
      if (ariza === "batarya") base = 1200;
      if (ariza === "hoparlor") base = 900;
    }

    const carpan = modelCarpan(model);

    return Math.round(base * carpan);
  };

  const kaydet = () => {
    const yeniKayit = {
      id: Date.now(),
      marka,
      model,
      ariza,
      fiyat: fiyatHesapla(),
      mesaj
    };

    setListe([...liste, yeniKayit]);
    temizle();
  };

  const sil = (id) => {
    const yeniListe = liste.filter(item => item.id !== id);
    setListe(yeniListe);
  };

  const temizle = () => {
    setMarka("");
    setModel("");
    setAriza("");
    setMesaj("");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📱 Telefon Servis</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Marka</Text>
        <Picker
          selectedValue={marka}
          onValueChange={(value) => {
            setMarka(value);
            setModel("");
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="iPhone" value="iphone" />
          <Picker.Item label="Samsung" value="samsung" />
        </Picker>

        <Text style={styles.label}>Model</Text>
        <Picker
          selectedValue={model}
          onValueChange={setModel}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />

          {marka &&
            modeller[marka].map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
        </Picker>

        <Text style={styles.label}>Arıza</Text>
        <Picker
          selectedValue={ariza}
          onValueChange={setAriza}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="Ekran Kırık" value="ekran" />
          <Picker.Item label="Batarya" value="batarya" />
          <Picker.Item label="Hoparlör" value="hoparlor" />
        </Picker>

        <View style={styles.fiyatBox}>
          <Text style={styles.fiyatText}>
            {ariza && model ? fiyatHesapla() + " TL" : "Fiyat seçiniz"}
          </Text>
        </View>

        <Text style={styles.label}>Açıklama</Text>
        <TextInput
          style={styles.input}
          placeholder="Sorununuzu yazın..."
          value={mesaj}
          onChangeText={setMesaj}
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.kaydetBtn} onPress={kaydet}>
            <Text style={styles.btnText}>Kaydet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.temizleBtn} onPress={temizle}>
            <Text style={styles.btnText}>Temizle</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LİSTE */}
      <View style={styles.card}>
        <Text style={styles.label}>Kayıtlar</Text>

        {liste.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>{item.marka} - {item.model}</Text>
            <Text>{item.ariza} - {item.fiyat} TL</Text>
            <Text>{item.mesaj}</Text>

            <TouchableOpacity
              style={styles.silBtn}
              onPress={() => sil(item.id)}
            >
              <Text style={styles.btnText}>Sil</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f4f8",
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  label: {
    marginTop: 10,
    fontWeight: "600"
  },
  picker: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10
  },
  fiyatBox: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#e8f0fe",
    borderRadius: 10,
    alignItems: "center"
  },
  fiyatText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a73e8"
  },
  input: {
    marginTop: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top"
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10
  },
  kaydetBtn: {
    backgroundColor: "#1a73e8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  temizleBtn: {
    backgroundColor: "#e53935",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  silBtn: {
    backgroundColor: "#e53935",
    padding: 8,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold"
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    marginTop: 10
  }
});