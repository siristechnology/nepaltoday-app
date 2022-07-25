import React from 'react'
import PostDetail from '@screens/PostDetail'
/* Bottom News Screen */
import Home from '@screens/Home'
import NewsCategory from '@screens/NewsCategory'
import FM from '@screens/FM'
import Tweet from '@screens/Tweet'
import { tabBarIcon, tabBarIconHaveNoty, BottomTabNavigatorMazi } from '@navigation/components'

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
			tabBarIcon: ({ color }) => tabBarIconHaveNoty({ color, name: 'twitter' }),
		},
	},
	FM: {
		component: FM,
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
}
