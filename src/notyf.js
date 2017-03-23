(function(){
    this.Notyf = function(){
      //List of notifications currently active
      this.notifications = [];

      var defaults = {
        alertDelay:2000,
        alertIcon:'notyf__icon--alert',
        warnDelay:2000,
        warnIcon:'notyf__icon--warn',
        confirmDelay:2000,
        confirmIcon:'notyf__icon--confirm'
      }

      if (arguments[0] && typeof arguments[0] == "object"){
        this.options = extendDefaults(defaults, arguments[0]);
      }else{
        this.options = defaults;
      }

      //Creates the main notifications container
      var docFrag = document.createDocumentFragment();
      var notyfContainer = document.createElement('div');
      notyfContainer.className = 'notyf';
      docFrag.appendChild(notyfContainer);
      document.body.appendChild(docFrag);
      this.container = notyfContainer;

      //Stores which transitionEnd event this browser supports
      this.animationEnd = animationEndSelect();
    }

    //---------- Public methods ---------------
    /**
    * Shows an alert card
    */
    this.Notyf.prototype.alert = function(alertMessage){
      card(this, alertMessage, this.options.alertIcon, this.options.alertDelay, ' notyf--alert');
    }

    /**
     * Shows a warn card
     */
    this.Notyf.prototype.warn = function(alertMessage){
        card(this, alertMessage, this.options.warnIcon, this.options.warnDelay, ' notyf--warn');
    }

    /**
    * Shows a confirm card
    */
    this.Notyf.prototype.confirm = function(alertMessage){
      card(this, alertMessage, this.options.confirmIcon, this.options.confirmDelay, ' notyf--confirm');
    }

    //---------- Private methods ---------------

    /**
     * Shows any card
     */
    function card(instance, alertMessage, icon, delay, classname){
        var card = buildNotificationCard.call(instance, alertMessage, icon, delay);
        card.className += classname;
        instance.container.appendChild(card);
        instance.notifications.push(card);
    }

    /**
    * Populates the source object with the value from the same keys found in destination
    */
    function extendDefaults(source, destination){
      for (property in destination){
        //Avoid asigning inherited properties of destination, only asign to source the destination own properties
        if(destination.hasOwnProperty(property)){
          source[property] = destination[property];
        }
      }
      return source;
    }

    /**
    * Creates a generic card with the param message. Returns a document fragment.
    */
    function buildNotificationCard(messageText, iconClass, delay){
      //Card wrapper
      var notification = document.createElement('div');
      notification.className = 'notyf__toast';

      var wrapper = document.createElement('div');
      wrapper.className = 'notyf__wrapper';

      var iconContainer = document.createElement('div');
      iconContainer.className = 'notyf__icon';

      var icon = document.createElement('i');
      icon.className = iconClass;

      var message = document.createElement('div');
      message.className = 'notyf__message';
      message.innerHTML = messageText;

      //Build the card
      iconContainer.appendChild(icon);
      wrapper.appendChild(iconContainer);
      wrapper.appendChild(message);
      notification.appendChild(wrapper);

      var _this = this;
      setTimeout(function(){
          notification.className += " notyf--disappear";
          notification.addEventListener(_this.animationEnd, function(event){
            event.target == notification && _this.container.removeChild(notification);
          });
          var index = _this.notifications.indexOf(notification);
          _this.notifications.splice(index,1);
      },delay);

      return notification;
    }

    // Determine which animationend event is supported
    function animationEndSelect() {
      var t;
      var el = document.createElement('fake');
      var transitions = {
        'transition':'animationend',
        'OTransition':'oAnimationEnd',
        'MozTransition':'animationend',
        'WebkitTransition':'webkitAnimationEnd'
      }

      for(t in transitions){
          if( el.style[t] !== undefined ){
              return transitions[t];
          }
      }
    }

})();

(function() {
    if (typeof define === 'function' && define.amd)
        define('Notyf', function () { return Notyf; });
    else if (typeof module !== 'undefined' && module.exports)
        module.exports = Notyf;
    else
        window.Notyf = Notyf;
})();
