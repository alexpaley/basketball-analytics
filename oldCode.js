/*
// Parses Active Franchises Table
// http://www.basketball-reference.com/teams/
var parseTeamIndexActive = exports.parseTeamIndexActive = function(url) {
  request(url, function(err, res, body) {
    if(err) { return logger(err); }
    if(res.statusCode !== 200) { return logger(res.statusCode); }

    var $    = cheerio.load(body),
        srcs = {};
    // console.log($('.sortable.stats_table tbody').html());
    var headers = $('.sortable.stats_table#active thead').text();
    console.log(headers);

    $('.sortable.stats_table#active tbody').each(function(i, html) {
      var rows = $(html).find('tr').text();
      console.log(rows);
    });
  });
};

var parseLeagueStandings = exports.parseLeagueStandings = function(url) {
  request(url, function(err, res, body) {
    if(err) { return logger(err); }
    if(res.statusCode !== 200) { return logger(res.statusCode); }

    var $    = cheerio.load(body),
        srcs = {};
    // console.log($('.sortable.stats_table tbody').html());

    // League Standings by Conference
    var headersEast = $('#E_standings th').text();
    // console.log(headersEast);

    var headersWest = $('#W_standings th').text();
    // console.log(headersWest);

    $('#E_standings').each(function(i, html) {
      var eastRows = $(html).find('tr').text();
      // console.log(eastRows);
    });

    $('#W_standings').each(function(i, html) {
      var westRows = $(html).find('tr').text();
      // console.log(westRows);
    });

    // Expanded Standings Table
    $('.sortable.stats_table#expanded-standings').each(function(i, html) {
      var expandedTeamData = $(html).find('tr').text();
      // console.log(expandedTeamData);
    });

    // Team vs. Team Table
    $('.sortable.stats_table#team-vs-team').each(function(i, html) {
      var teamVersusTeamData = $(html).find('tr').text();
      console.log(teamVersusTeamData);
    });
  });
};


var teamIndexUrl = 'http://www.basketball-reference.com/teams/';
var leageStandingsUrl = 'http://www.basketball-reference.com/leagues/NBA_2013_standings.html';
var teamUrl = 'http://www.basketball-reference.com/teams/DAL/';

// Find all info on every team - http://www.basketball-reference.com/teams/MIA/
// Have to get links for all years first
var getYearUrls = exports.getYearUrls = function(url, team) {
  request(url, function(err, res, body) {
    if(err) { return logger(err); }
    if(res.statusCode !== 200) { return logger(res.statusCode); }

    var $    = cheerio.load(body),
        srcs = {};

    $('.sortable.stats_table#' + team).each(function(i, html) {
      var yearLinks = $(html).find('a').text();
      console.log(yearLinks);
    });
  });
};
*/

// parseTeamIndexActive(teamIndexUrl);
// parseLeagueStandings(leageStandingsUrl);
// getYearUrls(teamUrl, 'DAL');
