var clamp = function(value, min, max) {
  return Math.max(min, Math.min(value, max));
};

function Color(r, g, b, a) {
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.a = a || 1;
}

Color.create = function(r, g, b, a) {
	return new Color(r, g, b, a || 1);
};

Color.fromHSV = function(h, s, v, a) {
	var c;
	a = a || 1;

	c = new Color();
	c.setHSV(h, s, v, a);
	return c;
};

Color.prototype.set = function(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a || 1;

	return this;
};

Color.prototype.hash = function() {
	return 1 * this.r + 12 * this.g + 123 * this.b + 1234 * this.a;
};

Color.prototype.setHSV = function(h, s, v, a) {
	var b, g, h6, r;

	h6 = h * 6.0;
	r = clamp(h6 - 4.0, 0.0, 1.0) - clamp(h6 - 1.0, 0.0, 1.0) + 1.0;
	g = clamp(h6, 0.0, 1.0) - clamp(h6 - 3.0, 0.0, 1.0);
	b = clamp(h6 - 2.0, 0.0, 1.0) - clamp(h6 - 5.0, 0.0, 1.0);

	this.r = r * v * s + (v * (1.0 - s));
	this.g = g * v * s + (v * (1.0 - s));
	this.b = b * v * s + (v * (1.0 - s));
	this.a = a || 1;

	return this;
};

Color.prototype.copy = function(c) {
	this.r = c.r;
	this.g = c.g;
	this.b = c.b;
	this.a = c.a;

	return this;
};

Color.prototype.clone = function(c) {
	return new Color(this.r, this.g, this.b, this.a);
};

Color.Transparent = new Color(0, 0, 0, 0);
Color.None = new Color(0, 0, 0, 0);
Color.Black = new Color(0, 0, 0, 1);
Color.White = new Color(1, 1, 1, 1);
Color.DarkGrey = new Color(0.25, 0.25, 0.25, 1);
Color.Grey = new Color(0.5, 0.5, 0.5, 1);
Color.Red = new Color(1, 0, 0, 1);
Color.Green = new Color(0, 1, 0, 1);
Color.Blue = new Color(0, 0, 1, 1);
Color.Yellow = new Color(1, 1, 0, 1);
Color.Pink = new Color(1, 0, 1, 1);
Color.Cyan = new Color(0, 1, 1, 1);
Color.Orange = new Color(1, 0.5, 0, 1);

module.exports = Color;
