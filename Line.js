/**
 * Line
 * http://github.com/bmcalister
 *
 * Copyright (c) 2014 Brian Mc Alister
 *
 * Released under the MIT license
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
;(function(global, undefined) {

    /**
     * Line Constructor
     * Takes an amount, deducts 1 and instantiates itself twice until amout is = 0
     *
     * @param <Number> amount
     */
    function Line(amount, x, y, length, angle, angleChange, ctx){

        // deduct one from amount
        amount--;

        this.amount = amount;
        this.x = x;
        this.y = y;
        this.length = length;
        this.angle = angle;
        this.angleChange = angleChange;
        this.draw(ctx);

        // only spawn children if amount is still positive
        if(amount > 0) {
            this.spawnChildren(ctx);
        }

    }

    Line.prototype.spawnChildren = function(ctx) {
        this.lineRight = new Line(this.amount, this.x + Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length, this.length/ 1.45, this.angle + this.angleChange, this.angleChange, ctx );
        this.lineLeft = new Line(this.amount, this.x + Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length, this.length/ 1.45, this.angle - this.angleChange, this.angleChange, ctx );
    };

    Line.prototype.update = function(ctx, mouseY, angleChange) {

        if( this.lineRight instanceof Line && this.lineLeft instanceof Line) {
            this.lineRight.update(ctx, mouseY, angleChange);
            this.lineLeft.update(ctx, mouseY, angleChange);
        }

        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length,this.y - Math.sin(this.angle) * this.length);
        ctx.stroke();
        ctx.closePath();

    };

    Line.prototype.draw = function(ctx) {

        /*if( this.lineRight instanceof Line && this.lineLeft instanceof Line) {
            this.lineRight.update(ctx, mouseY, angleChange);
            this.lineLeft.update(ctx, mouseY, angleChange);
        }*/

        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length,this.y - Math.sin(this.angle) * this.length);
        ctx.stroke();
        ctx.closePath();

    }

    global.Line = Line;

})(window);

