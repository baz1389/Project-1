'use strict';

var tttapi = tttapi || {};


  tttapi.gameWatcher = null;
  ttt: 'http://ttt.wdibos.com';

  tttapi.ajax = function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  };

  tttapi.register = function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  };

  tttapi.login = function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  };

  //Authenticated api actions
  tttapi.listGames = function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  };

  tttapi.createGame = function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  };

  tttapi.showGame = function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  };

  tttapi.joinGame = function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  };

  tttapi.markCell = function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  };

  tttapi.watchGame = function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  };

//$(document).ready(...
$(function() {


  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
  });

  $('#list-games').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listGames(token, callback);
  });

  $('#create-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, callback);
  });

  $('#show-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, token, callback);
  });

  $('#join-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(id, token, callback);
  });

  $('#mark-cell').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#mark-id').val();
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, token, callback);
  });

  $('#watch-game').on('submit', function(e){
    var token = $(this).children('[name="token"]').val();
    var id = $('#watch-id').val();
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(id, token);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      $('#watch-index').val(cell.index);
      $('#watch-value').val(cell.value);
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  });

});
