import React from 'react'
import { tabBarIcon, BottomTabNavigatorMazi } from '@navigation/components'
import Home from '@screens/Home'
import NewsCategory from '@screens/NewsCategory'
import PostDetail from '@screens/PostDetail'
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

const NewsMenu = () => <BottomTabNavigatorMazi tabScreens={NewsTabScreens} />

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
	ArticleWeb: {
		component: ArticleWeb,
		options: {
			title: 'article_web',
		},
	},
}
