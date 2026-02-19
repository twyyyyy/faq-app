import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import axios from "axios";

const API_BASE = "http://localhost:5000";

type Faq = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
};

export default function HomeScreen() {
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    const res = await axios.get(`${API_BASE}/faqs`);
    setFaqs(res.data);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Company FAQs
      </Text>

      <FlatList<Faq>
        data={faqs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "bold" }}>{item.question}</Text>
            <Text>{item.answer}</Text>
          </View>
        )}
      />
    </View>
  );
}
