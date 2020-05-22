'use strict';

const USERNAME = 'yujinyuz';

module.exports = {
  url: 'https://jinyuz.me',
  pathPrefix: '/',
  title: '@yujinyuz',
  subtitle: 'I\'m not sure where this is used.....',
  copyright: '© All rights reserved.',
  disqusShortname: 'jinyuz',
  postsPerPage: 4,
  googleAnalyticsId: 'UA-167446454-1',
  useKatex: false,
  menu: [
    {
      label: 'Blog',
      path: '/',
    },
    {
      label: 'About me',
      path: '/about',
    },
    {
      label: 'Uses',
      path: '/uses',
    },
  ],
  author: {
    name: '@yujinyuz',
    photo: '/photo.jpg',
    bio: 'Just another dev',
    contacts: {
      email: 'eevoliveros@gmail.com',
      facebook: '',
      telegram: '',
      twitter: `${USERNAME}_`,
      github: USERNAME,
      rss: '',
      vkontakte: '',
      linkedin: USERNAME,
      instagram: USERNAME,
      line: '',
      gitlab: '',
      weibo: '',
      codepen: USERNAME,
      youtube: '',
      soundcloud: '',
    },
  },
};
