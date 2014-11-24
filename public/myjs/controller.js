secretApp.controller('homeCtrl', function($scope, Secret, $modal, $log, $routeParams, $route, $location, $window) {

    $scope.data = {
        message: 'Eternal Peace!'
    };

    $scope.currentPage = 1;
    $scope.totalItems = 0;
    $scope.itemsPerPage = 5;

    $scope.secretForms = {
        0: 'no secrets',
        one: '{} secret',
        other: '{} secrets'
    };

    $scope.radioSortOrder = 'desc';

    $scope.sortByTags = ['ID', 'Posted By', 'Posted Date', 'Location'];

    $scope.resultInfos = {
        homePage: "So far, revealed ",
        searchPage: "Search found: "
    }

    $scope.init = function() {
        $scope.hideClearSearch = true;
        $scope.resultInfo = $scope.resultInfos.homePage;
        retrieveFiveSecrets();
    };

    $scope.toReloadPage = function() {
        $window.location.reload();
    }

    $scope.pageClick = function() {
        retrieveFiveSecrets();
    }

    $scope.toSort = function() {
        retrieveFiveSecrets();
    }

    function sortByTagChange(val) {
        var retVal;
        switch (val) {
            case 'ID':
                retVal = "id";
                break;
            case 'Posted By':
                retVal = "user";
                break;
            case 'Posted Date':
                retVal = "post_date";
                break;
            case 'Location':
                retVal = "post_location";
                break;
        }
        return retVal;
    }



    function retrieveFiveSecrets() {
        var record = {
            pageNo: $scope.currentPage
        }


        if ($scope.sortByTag) {
            var tempSortByTag = sortByTagChange($scope.sortByTag);
            record.orderBy = {
                field: tempSortByTag,
                ascOrDesc: $scope.radioSortOrder
            }
        } else {
            //sort by posted_date for home page 
            record.orderBy = {
                field: 'id',
                ascOrDesc: $scope.radioSortOrder
            }
        }
        if ($scope.searchByTag) {
            $scope.resultInfo = $scope.resultInfos.searchPage;
            $scope.hideClearSearch = false;
            record.searchTag = $scope.searchByTag;
        }
        console.log(JSON.stringify(record));
        Secret.getFiveSecrets(record).success(function(data) {
            if (data.result) {
                $scope.totalItems = data.totalCount;
                $scope.secrets = data.result;
            }
        }).error(function(error) {
            alert('Something went wrong:' + error);
        })
    }

    // $scope.retrieveAllSecrets = function() {
    //     Secret.getAllSecrets().success(function(data) {
    //         if (data.result) {
    //             $scope.secrets = data.result;
    //         }
    //     }).error(function(error) {
    //         alert('Something went wrong:' + error);
    //     });
    // }

    $scope.toAddSecret = function() {
        var record = {
            data: {
                message: $scope.secretMessage,
                user: $scope.nickName,
                post_date: '',
                post_location: 'Unknown'
            }
        };

        $scope.nickName = "";
        $scope.secretMessage = "";
        Secret.createSecret(record).success(function(data) {
            if (data.result) {
                $scope.result = data.result;
                alert('posted successfully');
                retrieveFiveSecrets();

            }

        }).error(function(error) {
            alert('Something went wrong:' + error);
        })
    };

    $scope.toDeleteSecret = function(secretID) {
        var record = {
            id: secretID
        };

        Secret.deleteSecret(record).success(function(data) {
            if (data.result) {
                $scope.result = data.result;
                alert("deleted successfully");
                retrieveFiveSecrets();
            }

        }).error(function(error) {
            alert('Something went wrong:' + error);

        });
    };


    $scope.openModaltoSearchSecrets = function(size) {
        var modalInstance = $modal.open({
            templateUrl: 'searchModalContent.html',
            controller: 'ModalInstanceCtrl',
            backdrop: 'static',
            size: size,
            resolve: {
                items: function() {
                    return null;
                }
            }
        });

        modalInstance.result.then(function(secret) {
            $scope.searchByTag = secret;
            retrieveFiveSecrets();
        });
    };

    $scope.openModaltoUpdateSecret = function(secret) {

        $scope.updateSecretInfo = {
            secretID: secret.id,
            secretUser: secret.user,
            secretMessage: secret.message
        };

        var modalInstance = $modal.open({
            templateUrl: 'editModalContent.html',
            controller: 'ModalInstanceCtrl',
            backdrop: 'static',
            // size: size,
            resolve: {
                items: function() {
                    return $scope.updateSecretInfo;
                }
            }
        });

        modalInstance.result.then(function(secret) {
            var record = {
                id: secret.secretID,
                data: {
                    user: secret.secretUser,
                    message: secret.secretMessage,
                    post_date: '',
                    post_location: 'New York'
                }
            };

            Secret.updateSecret(record).success(function(data) {
                if (data.result) {
                    retrieveFiveSecrets();
                }
            }).error(function(error) {
                alert('Something went wrong:' + error);
            })
        });
    };

    $scope.init();

});


secretApp.controller('ModalInstanceCtrl', function($scope, $log, $modalInstance, $window, items) {

    $scope.items = items;

    $scope.ok = function() {
        $modalInstance.close($scope.items);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

secretApp.filter('fromNow', function() {
    return function(date) {
        return moment(date).fromNow();
    }
});


secretApp.controller('userCtrl', ['$scope, $log, $routeParams', function($scope, $log, $routeParams) {

    $scope.userName = $routeParams.userName
}])
