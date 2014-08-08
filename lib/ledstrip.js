var Board = require("../lib/board.js"),
    __ = require("../lib/fn.js"),
    events = require("events"),
    util = require("util");

    // LedStrip instance private data
    var priv = new Map();

    /**
    * LedStrip
    * @constructor
    *
    * five.LedStrip();
    *
    * five.LedStrip({
    *  pixels: 32,
    *  data: 10,
    *  clock: 9
    * });
    *
    *
    * @param {Object} opts [description]
    *
    */

    function LedStrip(opts) {

    if (!(this instanceof LedStrip)) {
        return new LedStrip(opts);
    }

    // make a strip device object with "opts"
    var pixels = [];

    // TODO: 32 should be parameterized
    for (var i = 0; i < 32; i++) {
        pixels.push(
            new Pixel({
                addr: i,
                clock: opts.clock,
                data: opts.data, 
                firmata: this.firmata
            })
        );
    }

    this.pixels = pixels;
  
    LedStrip.prototype.pixel = function(addr) {
        var strip = priv.get(this);

        return strip.pixels[addr];
    };

    var priv = new Map();

    function Pixel(opts) {
      // encapsulate all aspects of a pixel to 
      // limit the exposed surface to only the
      // absolutely necessary API parts.

        this.addr = opts.addr;
        this.clock = opts.clock;
        this.data = opts.data;
        this.firmata = opts.firmata;
    }

    Pixel.prototype.write = function() {
      var pixel = this;

      // do stuff with pixel.clock, pixel.data, etc.
      // pixel.firmata.digitalWrite(...);
    };

    Pixel.prototype.color = function(color) {
      var pixel = this;

      if (color) {
        // color (name|hex) => value translations
        // send value to device with this.write(...)
        // update pixel.color = value
        return this;
      } else {
        return pixel.color;
      }
    };

    // Initialize a Device instance on a Board
    Board.Device.call(
        this, opts = Board.Options(opts)
    );

    // Set the pin to INPUT mode
    this.mode = this.io.MODES.INPUT;

    this.io.pinMode(this.pin, this.mode);

    this.io.digitalWrite(this.pin, this.io.HIGH);

    // Analog Read event loop
    this.io.digitalRead(this.pin, function(data) {
        var err = null;
        console.log(data);

    }.bind(this));

}

util.inherits(LedStrip, events.EventEmitter);

module.exports = LedStrip;