import {useState, useEffect} from "react";
import {StyleSheet, ActivityIndicator, Text, StatusBar, SafeAreaView, ScrollView, View} from 'react-native';

const getIp = async () => {
  const res = await fetch('https://ipinfo.io/ip', {
    headers: {
      "user-agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36`,
      referer: `https://ipinfo.io/`,
    }
  });
  const ip = await res.text();
  return ip;
}

const getIpInfo = async () => {
  const ip = await getIp()
  const res = await fetch(`https://ipinfo.io/widget/demo/${ip}`, {
    headers: new Headers({
      "user-agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36`,
      "referer": `https://ipinfo.io/`,
    })
  });
  const data = await res.json();
  return data;
};

const mockData = {
  "input": "113.161.65.197",
  "data": {
    "ip": "113.161.65.197",
    "hostname": "static.vnpt.vn",
    "city": "Ho Chi Minh City",
    "region": "Ho Chi Minh",
    "country": "VN",
    "loc": "10.8230,106.6296",
    "org": "AS45899 VNPT Corp",
    "postal": "71606",
    "timezone": "Asia/Ho_Chi_Minh",
    "asn": {
      "asn": "AS45899",
      "name": "VNPT Corp",
      "domain": "vnpt.vn",
      "route": "113.161.64.0/21",
      "type": "isp"
    },
    "company": {
      "name": "Vietnam Posts and Telecommunications Group",
      "domain": "vnpt.com.vn",
      "type": "isp"
    },
    "privacy": {
      "vpn": false,
      "proxy": false,
      "tor": false,
      "relay": false,
      "hosting": false,
      "service": ""
    },
    "abuse": {
      "address": "Ha Noi, VietNam",
      "country": "VN",
      "email": "hm-changed@vnnic.vn",
      "name": "Pham Tien Huy",
      "network": "113.160.0.0/11",
      "phone": "+84-24-35564944"
    }
  }
};

export default function App() {
  const [ipInfo, setIpInfo] = useState();

  useEffect(() => {
    getIpInfo().then((data) => {
      setIpInfo(data);
    }).catch(console.error);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {!ipInfo ? <ActivityIndicator size="large" color="#00ff00"/> : null}
      {ipInfo ? <ScrollView style={styles.view}>
        {Object.entries(ipInfo.data).map(([key, value]) => <View>
          <Text style={styles.key} key={key}>{key}</Text>
          <View style={styles.value}>
            {typeof value === "object" ? null : <Text>{value}</Text>}
            {typeof value !== "object" ? null : Object.entries(value).map(([k, v]) => <View>
              <Text key={k} style={styles.k}>{k}: {JSON.stringify(v)}</Text>
            </View>)}
          </View>
        </View>)}
      </ScrollView> : null}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 18,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    padding: 30
  },
  key: {
    fontSize: 24,
    textTransform: 'capitalize'
  },
  value: {
    padding: 10,
  },
  k: {
    textTransform: 'capitalize'
  }
});
