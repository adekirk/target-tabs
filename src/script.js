/**
 * TABS
 * 
 * Simply adds/removes .active css class to active tab. 
 *  
 */

(function() {
    var tabs = {
        "defaultTabId": "view-default",
        "cssActiveClass": "active",

        "tabChange": function () {
            /** Either scroll the BODY to 0 or use the anti-headbutt/padding hack. */
            // document.querySelector('body').scrollTop = 0;

            this.update();
        },

        "setDefault": function () {
            var hashId = this.getHashId();
            var tabId = hashId === null || hashId === "" ? this.defaultTabId : hashId;

            var tab = document.querySelector(".tabs [href='#" + tabId + "']");
            if (tab === null || tab === undefined) return;

            this.setAttribute(tab, "class", this.cssActiveClass);
        },

        "update": function () {
            var tabs = document.querySelectorAll(".tabs a");
            if (tabs === null || tabs === undefined) return;

            for (var i = 0; i < tabs.length; i++) {
                this.clearAttribute(tabs[i], "class", this.cssActiveClass);
            }

            var tabID = this.getHashId();
            var tab = document.querySelector(".tabs [href='#" + tabID + "']");
            if (tab === null || tab === undefined) return;

            this.setAttribute(tab, "class", this.cssActiveClass);
        },

        "clearAttribute": function (element, name, value) {
            if (element === undefined || element === null) return;

            var att = element.getAttribute(name);
            if (att === null || att === undefined) return;

            att = att.replace(this.cssActiveClass, "").trim();
            element.setAttribute(name, att);
        },

        "getHashId": function() {
            return location.hash.slice(1);
        },

        "setAttribute": function (element, name, value) {
            if (element === undefined || element === null) return;

            var att = element.getAttribute(name);
            att = att === null ? value : att += (" " + value);
            element.setAttribute(name, att);
        },

        "requiredFunctions": ["querySelector", "querySelectorAll", "addEventListener"],

        "init": function (defaultTabId) {
            this.defaultTabId = defaultTabId;

            for (var i = 0; i < this.requiredFunctions.length; i++) {
                if (document[this.requiredFunctions[i]] === undefined) return;
            }

            window.addEventListener("hashchange", function () {
                tabs.tabChange();
            });

            this.setDefault();
        }
    };

    window.tabs = tabs;
})();