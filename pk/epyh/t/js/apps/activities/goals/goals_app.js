define(["app"], function (Appersonam) {
    Appersonam.module("GoalsApp", function (GoalsApp, Appersonam, Backbone, Marionette, $, _) {
        GoalsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                //"activities/goals": "listEntities",
                //"activities/goals/:id": "showEntity",
                //"activities/goals/:id/edit": "editEntity"
            }
        });

        var API = {
            listEntities: function (mode, quantity, collection, query) {
                LogDB.log('GoalsApp' + ' => listEntities');
                Appersonam.request('tracking:log:event', 'goals_list');
                require(["apps/activities/goals/list/list_controller"], function (ListController) {
                    ListController.listEntities(mode, quantity, collection, query);
                });
            }, 
            showEntity: function (item, mode) {
                LogDB.log('GoalsApp' + ' => showEntity');
                Appersonam.request('tracking:log:event', 'goals_show');
                require(["apps/activities/goals/show/show_controller"], function (ShowController) {
                    if (isNaN(item)) {
                        ShowController.showEntity(item, mode);
                    }
                    else {
                        ShowController.showEntityById(item);//navigazione tramite tasti browser
                    }
                });
            },
            newEntity: function () {
                LogDB.log('GoalsApp' + ' => newEntity');
                Appersonam.request('tracking:log:event', 'goals_create');
                require(["apps/activities/goals/profile/profile_controller"], function (ProfileController) {
                    ProfileController.newEntity();
                });
            },
            editEntity: function (item) {
                LogDB.log('GoalsApp' + ' => editEntity');
                require(["apps/activities/goals/profile/profile_controller"], function (ProfileController) {
                    if (isNaN(item)) {
                        ProfileController.editEntity(item);
                    }
                    else {
                        ProfileController.editEntityById(item);//navigazione tramite tasti browser
                    }
                });
            },
            deleteEntity: function (id) {
                LogDB.log('GoalsApp' + ' => deleteEntity');
                require(["apps/activities/goals/delete/delete_controller"], function (DeleteController) {
                    DeleteController.deleteEntity(id);
                });
            }
        };
        Appersonam.ActivitiesApp.on("goals:list", function (mode, quantity, collection, query) {
            //Appersonam.navigate("activities/goals");
            LogDB.log('Lista obiettivi');
            API.listEntities(mode, quantity, collection, query);
        });
        Appersonam.ActivitiesApp.on("goals:show", function (item, mode) {
            var id = item.get('id');
            //Appersonam.navigate("activities/goals/" + id);
            API.showEntity(item, mode);
        });
        Appersonam.ActivitiesApp.on("goals:new", function () {
            API.newEntity();
        });
        Appersonam.ActivitiesApp.on("goals:edit", function (item) {
            var id = item.get('id');
            //Appersonam.navigate("activities/goals/" + id + "/edit");
            API.editEntity(item);
        });
        Appersonam.ActivitiesApp.on("goals:delete", function (id) {
            API.deleteEntity(id);
        }); 
        Appersonam.ActivitiesApp.addInitializer(function () {
            new GoalsApp.Router({
                controller: API
            });
        });
        GoalsApp.on('start', function () {
        });
    });
    return Appersonam.GoalsApp;
});