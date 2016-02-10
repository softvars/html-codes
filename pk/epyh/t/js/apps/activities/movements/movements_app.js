define(["app"], function (Appersonam) {
    Appersonam.module("MovementsApp", function (MovementsApp, Appersonam, Backbone, Marionette, $, _) {
        MovementsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                //"activities/movements": "listEntities",
                //"activities/movements/:id": "showEntity",
                //"activities/movements/:id/spend-from-goal": "spendFromGoal",
                //"activities/movements/:id/set-venue": "setVenue",
                //"activities/movements/:id/edit": "editEntity"
            }
        });

        var API = {
            listEntities: function (mode, quantity, collection, query) {
                LogDB.log('MovementsApp' + ' => listEntities');
                Appersonam.request('tracking:log:event', 'movements_list');
                var that = this;
                require(["apps/activities/movements/list/list_controller"], function (ListController) {
                    ListController.listEntities(mode, quantity, collection, query);
                    that.ListController = ListController;
                });
            },
            showEntity: function (item, mode) {
                LogDB.log('MovementsApp' + ' => showEntity');
                Appersonam.request('tracking:log:event', 'movements_show');
                require(["apps/activities/movements/show/show_controller"], function (ShowController) {
                    if (isNaN(item)) {
                        ShowController.showEntity(item, mode);
                    }
                    else {
                        ShowController.showEntityById(item);
                    }
                });
            },
            showDeals: function () {
                this.ListController.showDeals();
            },
            newEntity: function () {
                LogDB.log('MovementsApp' + ' => newEntity');
                require(["apps/activities/movements/profile/profile_controller"], function (ProfileController) {
                    ProfileController.newEntity();
                });
            },
            editEntity: function (id) {
                LogDB.log('MovementsApp' + ' => editEntity');
                require(["apps/activities/movements/profile/profile_controller"], function (ProfileController) {
                    ProfileController.editEntity(id);
                });
            },
            spendFromGoal: function (item) {
                LogDB.log('MovementsApp' + ' => spendFromGoal');
                Appersonam.request('tracking:log:event', 'spend_from_goal');
                require(["apps/activities/movements/goal_list/goal_list_controller"], function (GoalListController) {
                    GoalListController.listGoalEntities(item);
                });
            },
            setVenue: function (item) {
                LogDB.log('MovementsApp' + ' => setVenue');
                Appersonam.request('tracking:log:event', 'associate_merchant');
                require(["apps/activities/movements/venue_list/venue_list_controller"], function (VenueListController) {
                    VenueListController.listVenueEntities(item);
                });
            },
            deleteEntity: function (id) {
                LogDB.log('MovementsApp' + ' => deleteEntity');
                require(["apps/activities/movements/delete/delete_controller"], function (DeleteController) {
                    DeleteController.deleteEntity(id);
                });
            },
            p2pReply: function (transferObject, mode) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => secondStep');
                Appersonam.request('tracking:log:event', 'p2p_reply');
                require(["common/p2p/hypeTransfer/profile_controller"], function (controller) {     
                        controller.profile(transferObject, mode, 3, false);
                });
            },
        };
        Appersonam.ActivitiesApp.on("movements:list", function (mode, quantity, collection, query) {
            //Appersonam.navigate("activities/movements");
            API.listEntities(mode, quantity, collection, query);
        });
        Appersonam.ActivitiesApp.on("movements:show", function (item, mode) {
            var id = item.get('id');
            //Appersonam.navigate("activities/movements/" + id);
            API.showEntity(item, mode);
        });
        Appersonam.ActivitiesApp.on("movements:new", function () {
            //Appersonam.navigate("activities/movements/new");
            API.newEntity();
        });
        Appersonam.ActivitiesApp.on("p2p:reply", function (transferObject, mode) {
            API.p2pReply(transferObject, mode);
        });
        Appersonam.ActivitiesApp.on("movements:edit", function (id) {
            //Appersonam.navigate("activities/movements/" + id + "/edit");
            API.editEntity(id);
        });
        Appersonam.ActivitiesApp.on("movements:spend-from-goal", function (item) {
            //Appersonam.navigate("activities/movements/" + item.get('id') + "/spend-from-goal");
            API.spendFromGoal(item);
        });
        Appersonam.ActivitiesApp.on("movements:set-venue", function (item) {
            //Appersonam.navigate("activities/movements/" + item.get('id') + "/set-venue");
            API.setVenue(item);
        });
        Appersonam.MovementsApp.on("show:deals:movements", function () {
            API.showDeals();
        });
        Appersonam.ActivitiesApp.on("movements:delete", function (id) {
            API.deleteEntity(id);
        });
        Appersonam.ActivitiesApp.addInitializer(function () {
            new MovementsApp.Router({
                controller: API
            });
        });
        MovementsApp.on('start', function () {
        });
    });
    return Appersonam.MovementsApp;
});