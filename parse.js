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

var data  = {};

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

    // Selectors for all tables on page to be scraped
    selectorArray  = ['.sortable.stats_table#roster',
                      '.sortable.stats_table#totals',
                      '.sortable.stats_table#per_game',
                      '.sortable.stats_table#advanced',
                      '.sortable.stats_table#playoffs_totals',
                      '.sortable.stats_table#playoffs_advanced'];

    selectorArray.map(function(selector) {
      $(selector).each(function(i, html) {
        var rows = $(html).find('tr').text();
        console.log(rows);
      });
    });
  });
};

// Uses addTeamStatsByYear helper function to loop through and gather stats
// for all teams and years from 1970 - Present.
var getAllTeamStatsForAllYears = function() {
  var startYear = 1970,
      endYear   = (new Date()).getFullYear();

  teams.map(function(team) {
    var getTeamStats = getTeamStatsByYear.bind(null, team);
    for(var i=startYear; i<=endYear; i++) {
      getTeamStats(i);
    }
  });
};

// getTeamStatsByYear('MIA', 2013);
getAllTeamStatsForAllYears();
