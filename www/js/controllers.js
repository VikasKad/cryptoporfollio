angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$timeout,$http) {

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];
  
  $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };

  var myCurrentBuyObject=[
    {
      name:"ETH",
      share:0.036,
      totalBuyPrice:1861.60
    },
    {
      name:"BTC",
      share:0.0016,
      totalBuyPrice:1651.50,
    },
     {
      name:"LTC",
      share:0.1,
      totalBuyPrice:1899.365,
    },
    {
      name:"XRP",
      share:20,
      totalBuyPrice:1960,
    },
    {
      name:"GNT",
      share:11,
      totalBuyPrice:239.8
    },
    {
      name:"ZRX",
      share:4,
      totalBuyPrice:192
      },
    {
      name:"TRX",
      share:110,
      totalBuyPrice:286
      },
    {
      name:"REQ",
      share:40,
      totalBuyPrice:600
      },
    {
      name:"BAT",
      share:10,
      totalBuyPrice:185
    }
  ];
  console.log('my current ', myCurrentBuyObject.length);
  $scope.finalArrayObject=[];
  $http.get("https://koinex.in/api/ticker")
    .then(function (response) {
      window.prices = response.data.prices
      $scope.totalObj={
        totalBuy:0,
        totalCur:0
      };
      for(var iLoop=0;iLoop<myCurrentBuyObject.length;iLoop++){ 
        var newObject=myCurrentBuyObject[iLoop];
        for(var prop in prices){
          if(newObject.name==prop){
            newObject.currentValue=prices[prop];
            newObject.buyPrice = parseFloat(newObject.totalBuyPrice / newObject.share).toFixed(2);
            newObject.currentBuyValue = parseFloat(newObject.share * newObject.currentValue).toFixed(2);
            //status
            var currentStatus = parseFloat(((newObject.totalBuyPrice - newObject.currentBuyValue)*100)/newObject.totalBuyPrice).toFixed(2);
            newObject.currentStatus=0-currentStatus;
            break;
          }
        }
        $scope.totalObj.totalBuy+=parseFloat(newObject.totalBuyPrice);
        $scope.totalObj.totalCur+=parseFloat(newObject.currentBuyValue);
        $scope.finalArrayObject.push(newObject);
      }
      var currentStat = (($scope.totalObj.totalBuy-$scope.totalObj.totalCur)*100)/$scope.totalObj.totalBuy;
      $scope.totalObj.status=0-currentStat;
      console.log($scope.finalArrayObject);
    });


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
