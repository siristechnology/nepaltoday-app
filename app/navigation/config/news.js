import React from "react";
import Feedback from "@screens/Feedback";
import Filter from "@screens/Filter";
import Messages from "@screens/Messages";
import Messenger from "@screens/Messenger";
import Notification from "@screens/Notification";
import PostDetail from "@screens/PostDetail";
import Search from "@screens/Search";
import SearchHistory from "@screens/SearchHistory";
/* Bottom News Screen */
import Home from "@screens/Home";
import Post from "@screens/Post";
import Profile from "@screens/Profile";
import Category from "@screens/Category";
import Favourite from "@screens/Favourite";
import { tabBarIcon,  tabBarIconHaveNoty, BottomTabNavigatorMazi } from "@navigation/components";

export const NewsTabScreens = {
    Home: {
        component: Home,
        options: {
            title: "home",
            tabBarIcon: ({ color }) => tabBarIcon({ color, name: "home" }),
        },
    },
    Category: {
        component: Category,
        options: {
            title: "category",
            tabBarIcon: ({ color }) => tabBarIcon({ color, name: "th-large" }),
        },
    },
    Post: {
        component: Post,
        options: {
            title: "posts",
            tabBarIcon: ({ color }) => tabBarIcon({ color, name: "file" }),
        },
    },
    Favourite: {
        component: Favourite,
        options: {
            title: "favorites",
            tabBarIcon: ({ color }) =>
                tabBarIconHaveNoty({ color, name: "bookmark" }),
        },
    },
    Profile: {
        component: Profile,
        options: {
            title: "account",
            tabBarIcon: ({ color }) =>
                tabBarIcon({ color, name: "user-circle" }),
        },
    },
};

const NewsMenu = () => <BottomTabNavigatorMazi tabScreens={NewsTabScreens} />

export default {
    NewsMenu: {
        component: NewsMenu,
        options: {
            title: "home"
        }
    },
    Feedback: {
        component: Feedback,
        options: {
            title: "feedback"
        }
    },
    Filter: {
        component: Filter,
        options: {
            title: "filtering"
        }
    },
    Messages: {
        component: Messages,
        options: {
            title: "message"
        }
    },
    Messenger: {
        component: Messenger,
        options: {
            title: "messenger"
        }
    },
    Notification: {
        component: Notification,
        options: {
            title: "notification"
        }
    },
    PostDetail: {
        component: PostDetail,
        options: {
            title: "post_detail"
        }
    },
    Search: {
        component: Search,
        options: {
            title: "search"
        }
    },
    SearchHistory: {
        component: SearchHistory,
        options: {
            title: "search_history"
        }
    },
};
