var SpinnerAnimation = Class.create({
   initialize: function(controller, name, options) {
      if (typeof options === 'undefined') {
         var options = {};
      }
      this.controller = controller;
      this.name = name;
      this.frameHeight = options.frameHeight || 48;
      this.frameCount = options.frameCount || 12;
      this.fps = options.fps || 12;
      
      this.drawInterval = Math.max(1, Mojo.Animation.targetFPS / this.fps);
      this.currentFrame = 0;
      this.drawCount = 0;
      this.hasStarted = false;
      
      this.element = null;
      this.animationQueue = null;
   },
   
   _getElement: function() {
      if (this.element) {
         return this.element;
      } else {
         var icon = this.controller.select('.' + this.name);
         if (icon) {
            this.element = icon[0];
         }
         return this.element;
      }
   },
   
   start: function() {
      // Grab our target element
      var element = this._getElement();      
      if (element) {
         // Grab our animation queue
         this.animationQueue = Mojo.Animation.queueForElement(element);
      }
      // Initialize frame counts
      this.currentFrame = 0;
      this.drawCount = 0;
      if (!this.hasStarted && this.animationQueue) {
         // Let's go!
         this.animationQueue.add(this);
         this.hasStarted = true;
      }
   },
   
   stop: function() {
      // Time to end this
      if (this.hasStarted && this.animationQueue) {
         this.animationQueue.remove(this);
      }
      this.hasStarted = false;
   },
   
   animate: function() {
      // Do nothing if we have not yet hit our draw interval (keeps us at a steady FPS)
      if (this.drawCount < this.drawInterval) {
         this.drawCount++;
      } else {
         // Update our frame information
         this.drawCount -= this.drawInterval;
         this.currentFrame++;
         // This loops us back to frame 0 if we exceed the maximum
         this.currentFrame = this.currentFrame % this.frameCount;
         // Grab the element and draw it!
         var element = this._getElement();
         if (element) {
            element.setStyle({'background-position': "0px -" + (this.currentFrame * this.frameHeight) + "px"});
         }
      }
   }
});