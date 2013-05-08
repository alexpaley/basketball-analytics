/**
 * Alex Paley
 * May 2013
 *
 * This file scrapes basketball team, player, and game stats from
 * www.basketball-reference.com and stores the results in a csv
 * titled basketball_stats.csv.
*/

var cheerio   = require('cheerio'),
    cronJob   = require('cron').CronJob,
    mongoose  = require('mongoose'),
    request   = require('request');

var teams     = ['BAL','ATL','BUF','CAP','CHA','CHH','CHI','CIN','CLE','DAL',
                 'DEN','DET','GSW','HOU','IND','KCK','KCO','LAC','LAL','MEM',
                 'MIA','MIL','MIN','NJN','NOH','NOJ','NOK','NYK','NYN','OKC',
                 'ORL','PHI','PHO','POR','SAC','SAS','SDC','SDR','SEA','SFW',
                 'TOR','UTA','VAN','WAS','WSB'];

var startYear = 1970,
    endYear   = (new Date()).getFullYear(),
    data      = {};

// Simple Error function
var logger = function(err) {
  console.error(err);
};

// Add stats for individual teams and players on that team by year
// E.g. Minutes played by Lebron James (who is on Miami Heat) in 2013
var getTeamStatsByYear = exports.addTeamStat = function(team, year) {
  var url = 'http://www.basketball-reference.com/teams/' +
            team + '/' + year + '.html';

  request(url, function(err, res, body) {
    if(err) { return logger(err); }
    if(res.statusCode !== 200) { return logger(res.statusCode); }

    var $    = cheerio.load(body),
        srcs = {};

    idArray  = ['.sortable.stats_table#roster',
                '.sortable.stats_table#totals',]

    // Scrape team Roster chart - .sortable.stats_table#roster
    var rosterId   = '.sortable.stats_table#roster';
    var rosterData = $(rosterId).each(function(i, html) {
      var rows = $(html).find('tr').text();
    });

    // Scrape Totals chart - .sortable.stats_table#totals
    var totalsId   = '.sortable.stats_table#totals';
    var totalsData = $(totalsId).each(function(i, html) {
      var rows = $(html).find('tr').text();
    });

    // Scrape Per Game chart - .sortable.stats_table#per_game
    var perGameId   = '.sortable.stats_table#per_game';
    var perGameData = $(perGameId).each(function(i, html) {
      var rows = $(html).find('tr').text();
    });

    // Scrape Advanced chart - .sortable.stats_table#advanced
    var advancedId   = '.sortable.stats_table#advanced';
    var advancedData = $(advancedId).each(function(i, html) {
      var rows = $(html).find('tr').text();
    });

    // Scrape Playoff Totals chart - .sortable.stats_table#playoffs_totals
    var playoffTotalsId   = '.sortable.stats_table#playoffs_totals';
    var playoffTotalsData = $(playoffTotalsId).each(function(i, html) {
      var rows = $(html).find('tr').text();
    });

    // Scrape Playoff Advanced chart - .sortable.stats_table#playoffs_advanced
    var playoffAdvancedId   = '.sortable.stats_table#playoffs_advanced';
    var playoffAdvancedData = $(playoffAdvancedId).each(function(i, html) {
      var rows = $(html).find('tr').text();
      console.log(rows);
    });
  });
};

// Uses addTeamStatsByYear helper function to loop through and gather stats
// for all teams and years from 1970 - Present.
var getAllTeamStatsForAllYears = function() {

};

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
getTeamStatsByYear('MIA', 2013);
