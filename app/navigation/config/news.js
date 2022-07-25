import React from 'react'
import Feedback from '@screens/Feedback'
import Filter from '@screens/Filter'
import Messages from '@screens/Messages'
import Messenger from '@screens/Messenger'
import Notification from '@screens/Notification'
import PostDetail from '@screens/PostDetail'
import Search from '@screens/Search'
import SearchHistory from '@screens/SearchHistory'
/* Bottom News Screen */
import Home from '@screens/Home'
import NewsCategory from '@screens/NewsCategory'
import Profile from '@screens/Profile'
import Category from '@screens/Category'
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
	Category: {
		component: Category,
		options: {
			tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'th-large' }),
		},
	},
	Profile: {
		component: Profile,
		options: {
			tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'user-circle' }),
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
	Feedback: {
		component: Feedback,
		options: {
			title: 'feedback',
		},
	},
	Filter: {
		component: Filter,
		options: {
			title: 'filtering',
		},
	},
	Messages: {
		component: Messages,
		options: {
			title: 'message',
		},
	},
	Messenger: {
		component: Messenger,
		options: {
			title: 'messenger',
		},
	},
	Notification: {
		component: Notification,
		options: {
			title: 'notification',
		},
	},
	PostDetail: {
		component: PostDetail,
		options: {
			title: 'post_detail',
		},
	},
	Search: {
		component: Search,
		options: {
			title: 'search',
		},
	},
	SearchHistory: {
		component: SearchHistory,
		options: {
			title: 'search_history',
		},
	},
}
