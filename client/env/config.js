// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', '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');
});

// Put your campus prefix here
window.CAMPUS = 'hr-rpp';
