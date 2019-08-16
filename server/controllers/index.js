import _ from "lodash";
import express from "express";
import acceptLanguageParser from 'accept-language-parser';

import serverRenderer from '../middleware/renderer';
import configureStore from '../../src/redux/configureStore';
import { setLanguage } from '../../src/redux/actions/account';
import { showSignInForm } from '../../src/redux/actions/sign-in-form';

const router = express.Router();
const path = require("path");

global.window = {};

import i18next from '../../src/i18next';

const actionIndex = (req, res, next) => {
  const store = configureStore();

  const languages = acceptLanguageParser.parse(_.get(req, ['headers', 'accept-language'], 'en-GB,en;q=1'));
  const language = _.get(languages, [0, 'code']);
  i18next.changeLanguage(language)
  
  store.dispatch(setLanguage({ language })); 
  store.dispatch(showSignInForm({ defaultValueEmail: '' }));

  serverRenderer(store)(req, res, next);
};

// root (/) should always serve our server rendered page
router.use('^/$', actionIndex);

// other static resources should just be served as they are
router.use(express.static(path.resolve(__dirname, '..', '..', 'build'), { maxAge: '30d' } ));

// any other route should be handled by react-router, so serve the index page
router.use('*', actionIndex);


export default router;
