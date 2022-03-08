import {
    CardChannelGrid,
    CardSlide,
    CategoryList,
    News43,
    NewsList,
    SafeAreaView,
    Text,
} from "@components";
import { BaseColor, BaseStyle } from "@config";
import {
    HomeChannelData,
    HomeListData,
    HomePopularData,
    HomeTopicData,
    PostListData,
} from "@data";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

const Home = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const [topics, setTopics] = useState(HomeTopicData);
    const [channels, setChannels] = useState(HomeChannelData);
    const [popular, setPopular] = useState(HomePopularData);
    const [list, setList] = useState(HomeListData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const goPost = (item) => () => {
        navigation.navigate("Post", { item: item });
    };

    const goPostDetail = (item) => () => {
        navigation.navigate("PostDetail", { item: item });
    };

    const goToCategory = () => {
        navigation.navigate("Category");
    };

    const renderContent = () => {
        const mainNews = PostListData[0];
        return (
            <View>
                <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                    <Text header bold>
                        {t("today")}
                    </Text>
                    <Text subhead grayColor style={{ marginTop: 5 }}>
                        {t("discover_last_news_today")}
                    </Text>
                </View>
                <ScrollView contentContainerStyle={styles.paddingSrollView}>
                    <News43
                        loading={loading}
                        onPress={goPostDetail(mainNews)}
                        style={{ marginTop: 5 }}
                        image={mainNews.image}
                        name={mainNews.name}
                        description={mainNews.description}
                        title={mainNews.title}
                    />
                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={styles.paddingFlatList}
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <NewsList
                                loading={loading}
                                image={item.image}
                                title={item.title}
                                subtitle={item.subtitle}
                                date={item.date}
                                style={{
                                    marginBottom:
                                        index == list.length - 1 ? 0 : 15,
                                }}
                                onPress={goPostDetail(item)}
                            />
                        )}
                    />

                    <FlatList
                        contentContainerStyle={styles.paddingFlatList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={popular}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => (
                            <CardSlide
                                loading={loading}
                                onPress={goPostDetail(item)}
                                style={{
                                    marginRight:
                                        index == popular.length - 1 ? 0 : 15,
                                }}
                                image={item.image}
                                date={item.date}
                                title={item.title}
                            />
                        )}
                    />
                    <View style={styles.topicsView}>
                        <Text title3 semibold style={styles.title}>
                            {t("browse_topics")}
                        </Text>
                        <Text light footnote regular grayColor>
                            {t("select_your_most_interesting_category")}
                        </Text>
                        <FlatList
                            contentContainerStyle={{ marginTop: 10 }}
                            data={topics}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <CategoryList
                                    loading={loading}
                                    onPress={goPost(item)}
                                    style={{
                                        marginBottom:
                                            index == topics.length - 1 ? 0 : 15,
                                    }}
                                    image={item.image}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                />
                            )}
                            ListFooterComponent={
                                <TouchableOpacity onPress={goToCategory}>
                                    <Text body2 semibold accentColor>
                                        {t("see_more")}
                                    </Text>
                                </TouchableOpacity>
                            }
                            ListFooterComponentStyle={{
                                width: "100%",
                                alignItems: "center",
                                paddingTop: 15,
                            }}
                        />
                    </View>
                    <View>
                        <Text title3 semibold style={styles.title}>
                            {t("discover_channels")}
                        </Text>
                        <Text light footnote regular grayColor>
                            {t("description_discover_channels")}
                        </Text>
                        <FlatList
                            contentContainerStyle={{ marginTop: 15 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={channels}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <CardChannelGrid
                                    loading={loading}
                                    onPress={goPostDetail}
                                    style={{
                                        marginRight:
                                            index == channels.length - 1
                                                ? 0
                                                : 15,
                                    }}
                                    image={item.image}
                                    title={item.title}
                                />
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                edges={["right", "top", "left"]}
            >
                {renderContent()}
            </SafeAreaView>
        </View>
    );
};

export default Home;
