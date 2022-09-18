import React from 'react'
import { tabBarIcon, BottomTabNavigator } from './BottomTabNavigator'
import Home from '@screens/Home'
import NewsCategory from '@screens/NewsCategory'
import PostDetail from '@screens/PostDetail'
import PostDetailLive from '@screens/PostDetail/PostDetailLive'
import Radio from '@screens/Radio'
import Tweet from '@screens/Tweet'
import ArticleWeb from '@screens/ArticleWeb'

export const NewsTabScreens = {
	Home: {
		component: Home,
		options: {
			tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'home' }),
		},
	},
	NewsCategory: {
		component: NewsCategory,
		options: {
			tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'th-large' }),
		},
	},
	Tweet: {
		component: Tweet,
		options: {
			tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'twitter' }),
		},
	},
	Radio: {
		component: Radio,
		options: {
			tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'podcast' }),
		},
	},
}

const NewsMenu = () => <BottomTabNavigator tabScreens={NewsTabScreens} />

export default {
	NewsMenu: {
		component: NewsMenu,
		options: {
			title: 'home',
		},
	},
	PostDetail: {
		component: PostDetail,
		options: {
			title: 'post_detail',
		},
	},
	PostDetailLive: {
		component: PostDetailLive,
		options: {
			title: 'post_detail_live',
		},
	},
	ArticleWeb: {
		component: ArticleWeb,
		options: {
			title: 'article_web',
		},
	},
}
