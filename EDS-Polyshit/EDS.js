/// <reference path='Core/IApp.ts' />
/// <reference path='Flow/IFlow.ts' />
var Tsar;
(function (Tsar) {
    /**
     * Power wires together an apllication and core engine facilities.
     */
    var Power = (function () {
        function Power() {
        }
        /**
         * Acquires a flow.
         * @param {Tsar.Flow.IFlow} flow [description]
         */
        Power.prototype.ride = function (flow) {
            this.flow = flow;
            var self = this;
            flow.onUpdate(function (dt, et, now) { self.onUpdate(dt, et, now); });
            flow.onRender(function () { self.onRender(); });
        };
        /**
         * Runs a client application
         * @param {Tsar.Core.IApp} app An application using the engine.
         */
        Power.prototype.empower = function (app) {
            this.app = app;
            app.ready();
            flow.run();
        };
        /**
         * Updates the underlying app.
         * @param {number} dt  Delta time, a time since the last update.
         * @param {number} et  Elapsed time, a time since the app started.
         * @param {number} now Current timestamp.
         */
        Power.prototype.onUpdate = function (dt, et, now) {
            this.app.update(dt, et, now);
        };
        /**
         * Renders the underlying app.
         */
        Power.prototype.onRender = function () {
            this.app.render();
        };
        return Power;
    })();
    Tsar.Power = Power;
})(Tsar || (Tsar = {}));
/// <reference path="Main.ts" />
/// <reference path="float2.ts" />
var gMath = Math;
var Tsar;
(function (Tsar) {
    var Math;
    (function (Math) {
        var float3 = (function () {
            function float3(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            Object.defineProperty(float3.prototype, "xy", {
                get: function () {
                    return new Tsar.Math.float2(this.x, this.y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(float3.prototype, "yz", {
                get: function () {
                    return new Tsar.Math.float2(this.y, this.z);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(float3.prototype, "xz", {
                get: function () {
                    return new Tsar.Math.float2(this.x, this.z);
                },
                enumerable: true,
                configurable: true
            });
            float3.prototype.dot = function (v) {
                return this.x * v.x + this.y * v.y + this.z * v.z;
            };
            float3.prototype.cross = function () {
                return new Math.float2(this.y, -this.x);
            };
            float3.prototype.add = function (v2) {
                return new float3(this.x + v2.x, this.y + v2.y, this.z + v2.z);
            };
            float3.prototype.sub = function (v2) {
                return new float3(this.x - v2.x, this.y - v2.y, this.z - v2.z);
            };
            float3.prototype.dist = function (v2) {
                var sub = this.sub(v2);
                return gMath.sqrt(sub.x * sub.x + sub.y * sub.y + sub.z * sub.z);
            };
            float3.prototype.ndiv = function (v) {
                return new float3(this.x / v, this.y / v, this.z / v);
            };
            float3.prototype.nmul = function (v) {
                return new float3(this.x * v, this.y * v, this.z * v);
            };
            float3.prototype.mag = function () {
                return gMath.sqrt(this.dot(this));
            };
            float3.prototype.normalize = function () {
                return this.ndiv(this.mag());
            };
            float3.prototype.lerp = function (v2, v) {
                return new float3(Math.lerp(this.x, v2.x, v), Math.lerp(this.y, v2.y, v), Math.lerp(this.z, v2.z, v));
            };
            return float3;
        })();
        Math.float3 = float3;
    })(Math = Tsar.Math || (Tsar.Math = {}));
})(Tsar || (Tsar = {}));
/// <reference path="float3.ts" />
var Tsar;
(function (Tsar) {
    var Math;
    (function (Math) {
        function lerp(from, to, t) {
            return from + (to - from) * t;
        }
        Math.lerp = lerp;
        function perspectiveProjection(p, width, height, zNear) {
            return new Math.float2((((p.x - width / 2) / (p.z - zNear)) * 0.5 + 0.5) * width, (((p.y - height / 2) / (p.z - zNear)) * 0.5 + 0.5) * height);
        }
        Math.perspectiveProjection = perspectiveProjection;
    })(Math = Tsar.Math || (Tsar.Math = {}));
})(Tsar || (Tsar = {}));
/// <reference path="Main.ts" />
var gMath = Math;
var Tsar;
(function (Tsar) {
    var Math;
    (function (Math) {
        var float2 = (function () {
            function float2(x, y) {
                this.x = x;
                this.y = y;
            }
            float2.prototype.dot = function (v) {
                return this.x * v.x + this.y * v.y;
            };
            float2.prototype.cross = function () {
                return new float2(this.y, -this.x);
            };
            float2.prototype.add = function (v2) {
                return new float2(this.x + v2.x, this.y + v2.y);
            };
            float2.prototype.sub = function (v2) {
                return new float2(this.x - v2.x, this.y - v2.y);
            };
            float2.prototype.dist = function (v2) {
                var sub = this.sub(v2);
                return gMath.sqrt(sub.x * sub.x + sub.y * sub.y);
            };
            float2.prototype.ndiv = function (v) {
                return new float2(this.x / v, this.y / v);
            };
            float2.prototype.nmul = function (v) {
                return new float2(this.x * v, this.y * v);
            };
            float2.prototype.mag = function () {
                return gMath.sqrt(this.dot(this));
            };
            float2.prototype.normalize = function () {
                return this.ndiv(this.mag());
            };
            float2.prototype.lerp = function (v2, v) {
                return new float2(Math.lerp(this.x, v2.x, v), Math.lerp(this.y, v2.y, v));
            };
            float2.prototype.toString = function () {
                return "(" + this.x + ", " + this.y + ")";
            };
            return float2;
        })();
        Math.float2 = float2;
    })(Math = Tsar.Math || (Tsar.Math = {}));
})(Tsar || (Tsar = {}));
/// <reference path="../Math/float2.ts" />
var gMath = Math;
var Tsar;
(function (Tsar) {
    var Render;
    (function (Render) {
        /**
         * I don't know how to extend the CanvasRenderingContext2D, but want some additional
         * drawing methods in my contexts, so had to make this.
         */
        var Context // implements CanvasRenderingContext2D
         = (function () {
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            function Context // implements CanvasRenderingContext2D
                (ctx) {
                this.context = ctx;
            }
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "canvas", {
                get: function () {
                    return this.context.canvas;
                },
                set: function (c) {
                    this.context.canvas = c;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "fillStyle", {
                get: function () {
                    return this.context.fillStyle;
                },
                set: function (value) {
                    this.context.fillStyle = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "font", {
                //	BROKEN
                get: function () {
                    return this.context.font;
                },
                set: function (c) {
                    this.context.font = c;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "globalAlpha", {
                get: function () {
                    return this.context.globalAlpha;
                },
                set: function (c) {
                    this.context.globalAlpha = c;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "globalCompositeOperation", {
                get: function () {
                    return this.context.globalCompositeOperation;
                },
                set: function (value) {
                    this.context.globalCompositeOperation = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "lineCap", {
                get: function () {
                    return this.context.lineCap;
                },
                set: function (value) {
                    this.context.lineCap = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "lineDashOffset", {
                get: function () {
                    return this.context.lineDashOffset;
                },
                set: function (value) {
                    this.context.lineDashOffset = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "lineJoin", {
                get: function () {
                    return this.context.lineJoin;
                },
                set: function (value) {
                    this.context.lineJoin = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "lineWidth", {
                get: function () {
                    return this.context.lineWidth;
                },
                set: function (value) {
                    this.context.lineWidth = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "miterLimit", {
                get: function () {
                    return this.context.miterLimit;
                },
                set: function (value) {
                    this.context.miterLimit = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "msFillRule", {
                get: function () {
                    return this.context.msFillRule;
                },
                set: function (value) {
                    this.context.msFillRule = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "msImageSmoothingEnabled", {
                get: function () {
                    return this.context.msImageSmoothingEnabled;
                },
                set: function (value) {
                    this.context.msImageSmoothingEnabled = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "shadowBlur", {
                get: function () {
                    return this.context.shadowBlur;
                },
                set: function (value) {
                    this.context.shadowBlur = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "shadowColor", {
                get: function () {
                    return this.context.shadowColor;
                },
                set: function (value) {
                    this.context.shadowColor = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "shadowOffsetX", {
                get: function () {
                    return this.context.shadowOffsetX;
                },
                set: function (value) {
                    this.context.shadowOffsetX = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "shadowOffsetY", {
                get: function () {
                    return this.context.shadowOffsetY;
                },
                set: function (value) {
                    this.context.shadowOffsetY = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "strokeStyle", {
                get: function () {
                    return this.context.strokeStyle;
                },
                set: function (value) {
                    this.context.strokeStyle = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "textAlign", {
                get: function () {
                    return this.context.textAlign;
                },
                set: function (value) {
                    this.context.textAlign = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context // implements CanvasRenderingContext2D
            .prototype, "textBaseline", {
                get: function () {
                    return this.context.textBaseline;
                },
                set: function (value) {
                    this.context.textBaseline = value;
                },
                enumerable: true,
                configurable: true
            });
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
            Context // implements CanvasRenderingContext2D
            .prototype.restore = function () {
                return this.context.restore();
            };
            Context // implements CanvasRenderingContext2D
            .prototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
                return this.context.setTransform(m11, m12, m21, m22, dx, dy);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.save = function () {
                return this.context.save();
            };
            Context // implements CanvasRenderingContext2D
            .prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
                return this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.measureText = function (text) {
                return this.context.measureText(text);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.isPointInPath = function (x, y, fillRule) {
                return this.context.isPointInPath(x, y, fillRule);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
                return this.context.quadraticCurveTo(cpx, cpy, x, y);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.putImageData = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
                return this.context.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.rotate = function (angle) {
                return this.context.rotate(angle);
            };
            //	BROKEN
            Context // implements CanvasRenderingContext2D
            .prototype.fillText = function (text, x, y, maxWidth) {
                return this.context.fillText(text, x, y, maxWidth);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.translate = function (x, y) {
                return this.context.translate(x, y);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.scale = function (x, y) {
                return this.context.scale(x, y);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
                return this.context.createRadialGradient(x0, y0, r0, x1, y1, r1);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.lineTo = function (x, y) {
                return this.context.lineTo(x, y);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.getLineDash = function () {
                return this.context.getLineDash();
            };
            Context // implements CanvasRenderingContext2D
            .prototype.fill = function (fillRule) {
                if (fillRule) {
                    return this.context.fill(fillRule);
                }
                return this.context.fill();
            };
            Context // implements CanvasRenderingContext2D
            .prototype.createImageData = function (imageDataOrSw, sh) {
                return this.context.createImageData(imageDataOrSw, sh);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.createPattern = function (image, repetition) {
                return this.context.createPattern(image, repetition);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.closePath = function () {
                return this.context.closePath();
            };
            Context // implements CanvasRenderingContext2D
            .prototype.rect = function (x, y, w, h) {
                return this.context.rect(x, y, w, h);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.clip = function (fillRule) {
                return this.context.clip(fillRule);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.clearRect = function (x, y, w, h) {
                return this.context.clearRect(x, y, w, h);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.moveTo = function (x, y) {
                return this.context.moveTo(x, y);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.getImageData = function (sx, sy, sw, sh) {
                return this.context.getImageData(sx, sy, sw, sh);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.fillRect = function (x, y, w, h) {
                return this.context.fillRect(x, y, w, h);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
                return this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.drawImage = function (image, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight) {
                return this.context.drawImage(image, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.transform = function (m11, m12, m21, m22, dx, dy) {
                return this.context.transform(m11, m12, m21, m22, dx, dy);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.stroke = function () {
                return this.context.stroke();
            };
            Context // implements CanvasRenderingContext2D
            .prototype.strokeRect = function (x, y, w, h) {
                return this.context.strokeRect(x, y, w, h);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.setLineDash = function (segments) {
                return this.context.setLineDash(segments);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.strokeText = function (text, x, y, maxWidth) {
                return this.context.strokeText(text, x, y, maxWidth);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.beginPath = function () {
                return this.context.beginPath();
            };
            Context // implements CanvasRenderingContext2D
            .prototype.arcTo = function (x1, y1, x2, y2, radius) {
                return this.context.arcTo(x1, y1, x2, y2, radius);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.createLinearGradient = function (x0, y0, x1, y1) {
                return this.context.createLinearGradient(x0, y0, x1, y1);
            };
            Context // implements CanvasRenderingContext2D
            .prototype.polygon = function (x, y, sides, radius) {
                var start = new Tsar.Math.float2(x + radius, y);
                this.beginPath();
                this.moveTo(start.x, start.y);
                this.context.font = 'italic 12px Arial';
                for (var sI = 0; sI < sides; sI++) {
                    var ptx = gMath.cos(gMath.PI * 2 / sides * sI) * radius + x;
                    var pty = gMath.sin(gMath.PI * 2 / sides * sI) * radius + y;
                    this.lineTo(ptx, pty);
                }
                this.closePath();
            };
            return Context // implements CanvasRenderingContext2D
            ;
        })();
        Render.Context // implements CanvasRenderingContext2D
         = Context // implements CanvasRenderingContext2D
        ;
    })(Render = Tsar.Render || (Tsar.Render = {}));
})(Tsar || (Tsar = {}));
/// <reference path="Context.ts" />
var Tsar;
(function (Tsar) {
    var Render;
    (function (Render) {
        var Target = (function () {
            function Target(w, h) {
                this.element = document.createElement('canvas');
                this.element.width = w;
                this.element.height = h;
                this.context = new Render.Context(this.element.getContext('2d'));
            }
            Target.prototype.getDOMNode = function () {
                return this.element;
            };
            return Target;
        })();
        Render.Target = Target;
    })(Render = Tsar.Render || (Tsar.Render = {}));
})(Tsar || (Tsar = {}));
/// <reference path='Target.ts' />
var Tsar;
(function (Tsar) {
    var Render;
    (function (Render) {
        function createTarget(w, h) {
            var t = new Tsar.Render.Target(w, h);
            return t;
        }
        Render.createTarget = createTarget;
    })(Render = Tsar.Render || (Tsar.Render = {}));
})(Tsar || (Tsar = {}));
var Tsar;
(function (Tsar) {
    var UI;
    (function (UI) {
        var Window = (function () {
            function Window(window, document) {
                this.wnd = window;
                this.documentElement = document.documentElement;
                this.body = document.getElementsByTagName('body')[0];
            }
            Window.prototype.width = function () {
                return this.body.clientWidth || this.wnd.innerWidth || this.documentElement.clientWidth;
            };
            Window.prototype.height = function () {
                return this.body.clientHeight || this.wnd.innerHeight || this.documentElement.clientHeight;
            };
            return Window;
        })();
        UI.Window = Window;
    })(UI = Tsar.UI || (Tsar.UI = {}));
})(Tsar || (Tsar = {}));
Tsar.UI.window = new Tsar.UI.Window(window, document);
var Tsar;
(function (Tsar) {
    var DOM;
    (function (DOM) {
        var dom;
        function root(rootNode) {
            dom = rootNode;
        }
        DOM.root = root;
        function append(node) {
            dom.appendChild(node);
        }
        DOM.append = append;
        function grab(id) {
            return document.getElementById(id);
        }
        DOM.grab = grab;
    })(DOM = Tsar.DOM || (Tsar.DOM = {}));
})(Tsar || (Tsar = {}));
var Tsar;
(function (Tsar) {
    var Input;
    (function (Input) {
        var Mouse = (function () {
            function Mouse(node) {
                this.listen(node);
            }
            Mouse.prototype.listen = function (node) {
                var mouse = this;
                node.addEventListener('mousemove', function (e) { mouse.evt_mousemove(e); });
                node.addEventListener('click', function (e) { mouse.evt_click(e); });
                node.addEventListener('dblclick', function (e) { mouse.evt_dblclick(e); });
                node.addEventListener('wheel', function (e) { mouse.evt_wheel(e); });
            };
            Mouse.prototype.evt_mousemove = function (e) {
                if (this.cbMove) {
                    this.cbMove({
                        x: e.offsetX,
                        y: e.offsetY
                    });
                }
                //	console.log("move?", e);
            };
            Mouse.prototype.evt_click = function (e) {
                if (this.cbClick) {
                    this.cbClick(e);
                }
            };
            Mouse.prototype.evt_dblclick = function (e) {
                if (this.cbDoubleClick) {
                    this.cbDoubleClick(e);
                }
            };
            Mouse.prototype.evt_wheel = function (e) {
                if (this.cbWheel) {
                    this.cbWheel(e);
                }
            };
            Mouse.prototype.onMove = function (cb) {
                this.cbMove = cb;
            };
            Mouse.prototype.onClick = function (cb) {
                this.cbClick = cb;
            };
            Mouse.prototype.onDoubleClick = function (cb) {
                this.cbDoubleClick = cb;
            };
            Mouse.prototype.onWheel = function (cb) {
                this.cbWheel = cb;
            };
            return Mouse;
        })();
        Input.Mouse = Mouse;
    })(Input = Tsar.Input || (Tsar.Input = {}));
})(Tsar || (Tsar = {}));
/// <reference path="Mouse.ts" />
var Tsar;
(function (Tsar) {
    var Input;
    (function (Input) {
        var Proxy = (function () {
            //	public keyboard : Tsar.Input.Keyboard;
            function Proxy(node) {
                this.listen(node);
            }
            Proxy.prototype.listen = function (node) {
                this.mouse = new Tsar.Input.Mouse(node);
                //	this.keyboard = Tsar.Input.Keyboard(node);
            };
            return Proxy;
        })();
        Input.Proxy = Proxy;
    })(Input = Tsar.Input || (Tsar.Input = {}));
})(Tsar || (Tsar = {}));
/// <reference path="../Render/Target.ts" />
/// <reference path="../DOM/Main.ts" />	
/// <reference path="../Input/Proxy.ts" />
var Tsar;
(function (Tsar) {
    var UI;
    (function (UI) {
        /**
         * The only reasonable (as it seems to me back here in 07.2015) way for application to read input events is to
         * mount something into HTML around. Wouldn't it be a canvas render target?
         * @param {Tsar.Render.Target} rt A render target to be layed out in HTML and receive input (mouse/kb/touch) events.
         */
        function exposeRenderTarget(rt) {
            Tsar.DOM.append(rt.getDOMNode());
            return new Tsar.Input.Proxy(rt.getDOMNode());
        }
        UI.exposeRenderTarget = exposeRenderTarget;
    })(UI = Tsar.UI || (Tsar.UI = {}));
})(Tsar || (Tsar = {}));
/// <reference path="IFlow.ts" />
var Tsar;
(function (Tsar) {
    var Flow;
    (function (Flow) {
        /**
         * A flow based on the requestAnimationFrame().
         */
        var RAF = (function () {
            function RAF() {
                this.timeElapsed = 0;
                this.lastFrameTime = (new Date().getTime());
            }
            RAF.prototype.run = function () {
                this.requestAnimationFrame();
            };
            RAF.prototype.requestAnimationFrame = function () {
                var self = this;
                window.requestAnimationFrame(function () {
                    self.onAnimationFrame();
                });
            };
            RAF.prototype.onAnimationFrame = function () {
                var t = (new Date()).getTime();
                var dt = t - this.lastFrameTime;
                var et = this.timeElapsed += dt;
                this.lastFrameTime = t;
                var now = t;
                this.requestAnimationFrame();
                if (this.cbUpdate) {
                    this.cbUpdate(dt, et, now);
                }
                else {
                    console.warn("Update callback to the RAF flow controller has not been provided.");
                }
                if (this.cbRender) {
                    this.cbRender();
                }
                else {
                    console.warn("Render callback to the RAF flow controller has not been provided.");
                }
            };
            RAF.prototype.onUpdate = function (cb) {
                this.cbUpdate = cb;
            };
            RAF.prototype.onRender = function (cb) {
                this.cbRender = cb;
            };
            return RAF;
        })();
        Flow.RAF = RAF;
    })(Flow = Tsar.Flow || (Tsar.Flow = {}));
})(Tsar || (Tsar = {}));
/// <reference path="Context.ts" />
var R = Tsar.Render;
/**
 * Some visual debugging happens here.
 */
var Tsar;
(function (Tsar) {
    var Render;
    (function (Render) {
        var Debug;
        (function (Debug) {
            (function (GridStyle) {
                //	Stroke style
                GridStyle[GridStyle["Solid"] = 0] = "Solid";
                GridStyle[GridStyle["Dashed"] = 1] = "Dashed";
                GridStyle[GridStyle["Dotted"] = 2] = "Dotted";
                //	Axiality (direction) values
                GridStyle[GridStyle["X"] = 3] = "X";
                GridStyle[GridStyle["Y"] = 4] = "Y";
            })(Debug.GridStyle || (Debug.GridStyle = {}));
            var GridStyle = Debug.GridStyle;
            var GridRender = (function () {
                function GridRender() {
                }
                GridRender.solid = function (C, options) {
                    var targetW = C.canvas.width;
                    var targetH = C.canvas.height;
                    var limit = (options.axiality == GridStyle.X) ? targetH : targetW;
                    var i = 0;
                    C.strokeStyle = options.stroke;
                    C.lineWidth = options.width;
                    C.beginPath();
                    if (options.numbers) {
                        C.font = "normal 10px Arial";
                    }
                    while (i <= limit) {
                        if (options.axiality == GridStyle.X) {
                            C.moveTo(0, i - 0.5);
                            C.lineTo(targetW, i - 0.5);
                            if (options.numbers) {
                                C.context.fillText(i + "", 5, i + 15);
                            }
                        }
                        else {
                            C.moveTo(i - 0.5, 0);
                            C.lineTo(i - 0.5, targetH);
                            if (options.numbers) {
                                C.context.fillText(i + "", i + 5, 15);
                            }
                        }
                        i += options.offset;
                    }
                    C.closePath();
                    C.stroke();
                    C.fill();
                };
                GridRender.dashed = function (C, options) {
                    var targetW = C.canvas.width;
                    var targetH = C.canvas.height;
                    var limit = (options.axiality == GridStyle.X) ? targetH : targetW;
                    var i = 0;
                    C.strokeStyle = options.stroke;
                    C.setLineDash([4, 2]);
                    C.lineWidth = options.width;
                    C.beginPath();
                    while (i <= limit) {
                        if (options.axiality == GridStyle.X) {
                            C.moveTo(0, i - 0.5);
                            C.lineTo(targetW, i - 0.5);
                        }
                        else {
                            C.moveTo(i - 0.5, 0);
                            C.lineTo(i - 0.5, targetH);
                        }
                        i += options.offset;
                    }
                    C.closePath();
                    C.stroke();
                    C.setLineDash([]);
                };
                return GridRender;
            })();
            function grid(C, grid) {
                for (var gI = 0; gI < grid.length; gI++) {
                    var line = grid[gI];
                    switch (line.style) {
                        case GridStyle.Solid:
                            GridRender.solid(C, line);
                            break;
                        case GridStyle.Dashed:
                            GridRender.dashed(C, line);
                            break;
                        default:
                            break;
                    }
                }
            }
            Debug.grid = grid;
        })(Debug = Render.Debug || (Render.Debug = {}));
    })(Render = Tsar.Render || (Tsar.Render = {}));
})(Tsar || (Tsar = {}));
var Tsar;
(function (Tsar) {
    var Render;
    (function (Render) {
        /**
         * A Shader is a way to encapsulate some rendering logic.
         * Basically, if you want to render something — you use a shader for that.
         * Don't confuse it with D3D/OGL shaders, they're different.
         */
        var Shader = (function () {
            function Shader() {
            }
            Shader.prototype.render = function (C) {
            };
            return Shader;
        })();
        Render.Shader = Shader;
    })(Render = Tsar.Render || (Tsar.Render = {}));
})(Tsar || (Tsar = {}));
/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float3.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PolyShader = (function (_super) {
    __extends(PolyShader, _super);
    function PolyShader() {
        _super.apply(this, arguments);
        this.light = (1, 0);
    }
    PolyShader.prototype.setLightVector = function (v) {
        this.light = v;
    };
    PolyShader.prototype.render = function (C) {
        var W = Tsar.UI.window.width();
        var H = Tsar.UI.window.height();
        var center = new Tsar.Math.float2(W / 2, H / 2);
        var points = [
            new Tsar.Math.float3(400, 200, 0),
            new Tsar.Math.float3(400, 200, 0),
            new Tsar.Math.float3(400, 200, 0)
        ];
    };
    return PolyShader;
})(Tsar.Render.Shader);
/// <reference path='../shared/TSAR/src/Tsar/Power.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Core/IApp.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Window.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Flow/RAF.ts' />
/// <reference path='../shared/TSAR/src/Tsar/DOM/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Debug.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Math/float3.ts' />
/// <reference path='PolyShader.ts' />
var DD = Tsar.Render.Debug;
var TMath = Tsar.Math;
var EDS = (function () {
    function EDS() {
    }
    EDS.prototype.ready = function () {
        var eds = this;
        var W = this.W = Tsar.UI.window.width();
        var H = this.H = Tsar.UI.window.height();
        this.center = new Tsar.Math.float3(W / 2, H / 2, 500);
        this.shader = new PolyShader();
        this.RT = new Tsar.Render.Target(this.W, this.H);
        var rtproxy = Tsar.UI.exposeRenderTarget(this.RT);
        var mouseFn = function (e) {
            var v = new Tsar.Math.float3(Math.floor(e.x), Math.floor(e.y), 500);
            eds.light = eds.center.sub(v).normalize();
            console.log(e.x.e.y);
            console.log(eds.light);
        };
        rtproxy.mouse.onMove(mouseFn);
        this.RT.context.beginPath();
        this.RT.context.rect(0, 0, this.W, this.H);
        this.RT.context.closePath();
        this.RT.context.fillStyle = "white";
        this.RT.context.fill();
    };
    EDS.prototype.update = function (dt, et, now) {
        this.shader.setLightVector(this.light);
    };
    EDS.prototype.render = function () {
        this.RT.context.globalCompositeOperation = "source-over";
        this.RT.context.beginPath();
        this.RT.context.rect(0, 0, this.W, this.H);
        this.RT.context.closePath();
        this.RT.context.fillStyle = "rgba(255, 255, 255, 0.1)";
        this.RT.context.fill();
        this.shader.render(this.RT.context);
    };
    return EDS;
})();
var flow = new Tsar.Flow.RAF();
var power = new Tsar.Power();
Tsar.DOM.root(document.getElementById('tsar'));
power.ride(flow);
power.empower(new EDS());
