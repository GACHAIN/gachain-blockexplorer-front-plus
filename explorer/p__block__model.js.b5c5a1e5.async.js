(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{aK8R:function(e,a,t){"use strict";var r=t("284h"),s=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var u=s(t("o0o1")),n=s(t("MVZn")),o=s(t("GIZZ")),d=t("3Unq"),c=r(t("A+kE")),l=c.query,p=(0,o.default)(d.baseModel,{namespace:"block",subscriptions:{setup(e){var a=e.dispatch,t=e.history;t.listen(e=>{if("/block"===e.pathname){var t={head:{version:"1.0",msgtype:"request",interface:"get_block",remark:""},params:{cmd:"001",current_page:1,page_size:10}},r=(0,n.default)({},t,e.query);a({type:"query",payload:r})}})}},effects:{query:u.default.mark(function e(a,t){var r,s,n,o,d;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,s=void 0===r?{}:r,n=t.call,o=t.put,e.next=4,n(l,s);case 4:if(d=e.sent,!d.success){e.next=8;break}return e.next=8,o({type:"querySuccess",payload:{dataList:d.body.data,total:d.body.total}});case 8:case 9:case"end":return e.stop()}},e,this)})},reducers:{showModal(e,a){var t=a.payload;return(0,n.default)({},e,t)},hideModal(e){return(0,n.default)({},e)}}});a.default=p}}]);