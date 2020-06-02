'use strict';

const USERNAME = 'yujinyuz';

module.exports = {
  url: 'https://jinyuz.me',
  pathPrefix: '/',
  title: '@yujinyuz',
  subtitle: 'Eugene Oliveros | Software Developer. A lazy one.',
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
    bio: 'Software Developer. A lazy one.',
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
