import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

const backendRoot = environment.backendRoot;

const userRest = backendRoot + '/api/user';
const tipRest = backendRoot + '/api/tip';
const ticketRest = backendRoot + '/api/ticket';
const payPalRest = backendRoot + '/api/paypal';
const statisticsRest = backendRoot + '/api/statistics';
const settingsRest = backendRoot + '/api/settings';
const socialAuthRest = backendRoot + '/api/social/auth';

export const httpOptions = {
  json: {
    withCredentials: true,
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  },
  xWwwFormUrlencoded: {
    withCredentials: true,
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  }
};

export const url = {
  // region User REST ==============================================================================
  userRest: userRest,

  getUser(id: number) {
    return `${userRest}/${id}`;
  },
  getUsersWithUsername(page: number, username: string) {
    return `${userRest}/getUsersWithUsername?page=${page}&username=${username}`;
  },
  getUserRole: userRest + '/getUserRole',
  getUserRoleAndUsername: userRest + '/getUserRoleAndUsername',
  deleteUser(id: number) {
    return `${userRest}/${id}`;
  },

  register: userRest + '/register',
  login: backendRoot + '/login',
  logout: backendRoot + '/logout',
  isUserLoggedIn: userRest + '/isUserLoggedIn',
  activateUserAccount(token: string) {
    return `${userRest}/activateUserAccount?token=${token}`;
  },

  forgotPassword: userRest + '/forgotPassword',
  resetPassword: userRest + '/resetPassword',
  updatePassword: userRest + '/updatePassword',

  isEmailUnique(email: string) {
    return `${userRest}/isEmailUnique?email=${email}`;
  },
  isUsernameUnique(username: string) {
    return `${userRest}/isUsernameUnique?username=${username}`;
  },
  // endregion =====================================================================================

  // region Tip REST ===============================================================================
  tipRest: tipRest,

  getTip(id: number) {
    return `${tipRest}/${id}`;
  },
  deleteTip(id: number) {
    return `${tipRest}/${id}`;
  },

  activeFreeTips: tipRest + '/activeFreeTips',
  activePremiumTips: tipRest + '/activePremiumTips',
  historyFreeTips: tipRest + '/historyFreeTips',
  historyPremiumTips: tipRest + '/historyPremiumTips',
  // endregion =====================================================================================

  // region Ticket REST =============================================================================
  ticketRest: ticketRest,

  deleteTicket(id: string) {
    return `${ticketRest}/${id}`;
  },
  ticketInfo(id: string) {
    return `${ticketRest}/info/${id}`;
  },
  // buyTicket(id: string) {
  //   return `${ticketRest}/buyTicket`;
  // },
  // endregion ======================================================================================

  // region PayPal REST ============================================================================
  becomePremium: payPalRest + '/become/premium',
  buyTicket: payPalRest + '/buy/ticket',
  executeTicketPayment: payPalRest + '/execute/ticket/payment',
  executePremiumPayment: payPalRest + '/execute/premium/payment',
  // endregion =====================================================================================

  // region Statistics Rest ========================================================================
  getStatistics: statisticsRest,
  increaseVisitCounter: statisticsRest + '/visit',
  getVisitorCounter: statisticsRest + '/visitor/count',
  getVisitorCounterLastDays(days: number) {
    return `${statisticsRest}/visitor/count/${days}`;
  },
  getUserCount: statisticsRest + '/getUserCount',
  // endregion =====================================================================================

  // region Settings Rest ==========================================================================
  getSettings: settingsRest,
  updateSettings: settingsRest,
  // endregion =====================================================================================

  // region Social Auth Rest ==========================================================================
  googleSignUp: socialAuthRest + '/google/signup',
  googleSignIn: socialAuthRest + '/google/signin',
  facebookSignUp: socialAuthRest + '/facebook/signup',
  facebookSignIn: socialAuthRest + '/facebook/signin',
  // endregion =====================================================================================
};
