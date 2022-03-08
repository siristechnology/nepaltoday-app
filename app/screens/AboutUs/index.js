import {
  Card,
  Header,
  Icon,
  Image,
  ProfileDescription,
  SafeAreaView,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import { AboutUsData } from "@data";
import * as Utils from "@utils";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const AboutUs = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [ourTeam, setOurTeam] = useState(AboutUsData);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t("about_us")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View>
          <Image source={Images.trip4} style={{ width: "100%", height: 135 }} />
          <View style={styles.titleAbout}>
            <Text title1 semibold whiteColor>
              {t("about_us")}
            </Text>
            <Text subhead whiteColor>
              {t("slogan_about_us")}
            </Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text headline semibold>
            {t("who_we_are")}
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </Text>
          <Text headline semibold style={{ marginTop: 20 }}>
            {t("what_we_do")}
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            - First Class Flights
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            - 5 Star Accommodations
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            - Inclusive Packages
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            - Latest Model Vehicles
          </Text>
          <Text headline semibold style={{ marginTop: 20, marginBottom: 15 }}>
            {t("meet_our_team")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {ourTeam.map((item, index) => {
              return (
                <View
                  style={{
                    height: 200,
                    width: Utils.getWidthDevice() / 2 - 30,
                    marginBottom: 20,
                  }}
                  key={"ourTeam" + index}
                >
                  <Card
                    image={item.image}
                    onPress={() => navigation.navigate(item.screen)}
                  >
                    <Text footnote whiteColor>
                      {item.subName}
                    </Text>
                    <Text headline whiteColor semibold>
                      {item.name}
                    </Text>
                  </Card>
                </View>
              );
            })}
          </View>
          <Text headline semibold>
            {t("our_service")}
          </Text>
          {ourTeam.map((item, index) => {
            return (
              <ProfileDescription
                key={"service" + index}
                image={item.image}
                name={item.name}
                subName={item.subName}
                description={item.description}
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate(item.screen)}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
