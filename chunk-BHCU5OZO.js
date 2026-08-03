import{$ as da,$f as Zo,Ae as tn,Ea as Go,Ef as Ee,Hd as hr,If as nn,Jf as wt,L as ca,Lf as ct,Ma as Xt,Mf as _t,Ne as Ho,Nf as N,Od as Ct,Of as Rr,Pe as ko,Qe as Wo,Ue as rn,_e as bi,_f as jo,ac as Vo,ag as ma,bf as de,bg as Yo,cg as qo,db as Uo,dg as Ko,ef as rt,eg as Qo,ie as ke,je as jt,jf as Xo,ka as Bo,le as We,mb as zo,md as Nr,ra as Fo,sd as fr,wa as Ai}from"./chunk-ISJ7W3LA.js";de([Zo,Qo]);de(jo);function Jo(e,t,r){typeof t=="object"&&(r=t,t=null);var i=this,n;if(!(e instanceof Function)){n=[];for(var a in e)e.hasOwnProperty(a)&&n.push(a)}var o=function(l){if(i.apply(this,arguments),e instanceof Function?$o(this,e.call(this,l)):Uu(this,e,n),this.constructor===o)for(var f=o.__initializers__,h=0;h<f.length;h++)f[h].apply(this,arguments)};o.__super__=i,i.__initializers__?o.__initializers__=i.__initializers__.slice():o.__initializers__=[],t&&o.__initializers__.push(t);var s=function(){};return s.prototype=i.prototype,o.prototype=new s,o.prototype.constructor=o,$o(o.prototype,r),o.extend=i.extend,o.derive=i.extend,o}function $o(e,t){if(t)for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])}function Uu(e,t,r){for(var i=0;i<r.length;i++){var n=r[i];e[n]=t[n]}}var es={extend:Jo,derive:Jo};function zu(e,t){this.action=e,this.context=t}var Vu={trigger:function(e){if(this.hasOwnProperty("__handlers__")&&this.__handlers__.hasOwnProperty(e)){var t=this.__handlers__[e],r=t.length,i=-1,n=arguments;switch(n.length){case 1:for(;++i<r;)t[i].action.call(t[i].context);return;case 2:for(;++i<r;)t[i].action.call(t[i].context,n[1]);return;case 3:for(;++i<r;)t[i].action.call(t[i].context,n[1],n[2]);return;case 4:for(;++i<r;)t[i].action.call(t[i].context,n[1],n[2],n[3]);return;case 5:for(;++i<r;)t[i].action.call(t[i].context,n[1],n[2],n[3],n[4]);return;default:for(;++i<r;)t[i].action.apply(t[i].context,Array.prototype.slice.call(n,1));return}}},on:function(e,t,r){if(!(!e||!t)){var i=this.__handlers__||(this.__handlers__={});if(!i[e])i[e]=[];else if(this.has(e,t))return;var n=new zu(t,r||this);return i[e].push(n),this}},once:function(e,t,r){if(!e||!t)return;var i=this;function n(){i.off(e,n),t.apply(this,arguments)}return this.on(e,n,r)},before:function(e,t,r){if(!(!e||!t))return e="before"+e,this.on(e,t,r)},after:function(e,t,r){if(!(!e||!t))return e="after"+e,this.on(e,t,r)},success:function(e,t){return this.once("success",e,t)},error:function(e,t){return this.once("error",e,t)},off:function(e,t){var r=this.__handlers__||(this.__handlers__={});if(!t){r[e]=[];return}if(r[e]){for(var i=r[e],n=[],a=0;a<i.length;a++)t&&i[a].action!==t&&n.push(i[a]);r[e]=n}return this},has:function(e,t){var r=this.__handlers__;if(!r||!r[e])return!1;for(var i=r[e],n=0;n<i.length;n++)if(i[n].action===t)return!0}},Qr=Vu;var Hu=0,ku=Array.prototype,Wu=ku.forEach,Li={genGUID:function(){return++Hu},relative2absolute:function(e,t){if(!t||e.match(/^\//))return e;for(var r=e.split("/"),i=t.split("/"),n=r[0];n==="."||n==="..";)n===".."&&i.pop(),r.shift(),n=r[0];return i.join("/")+"/"+r.join("/")},extend:function(e,t){if(t)for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e},defaults:function(e,t){if(t)for(var r in t)e[r]===void 0&&(e[r]=t[r]);return e},extendWithPropList:function(e,t,r){if(t)for(var i=0;i<r.length;i++){var n=r[i];e[n]=t[n]}return e},defaultsWithPropList:function(e,t,r){if(t)for(var i=0;i<r.length;i++){var n=r[i];e[n]==null&&(e[n]=t[n])}return e},each:function(e,t,r){if(e&&t)if(e.forEach&&e.forEach===Wu)e.forEach(t,r);else if(e.length===+e.length)for(var i=0,n=e.length;i<n;i++)t.call(r,e[i],i,e);else for(var a in e)e.hasOwnProperty(a)&&t.call(r,e[a],a,e)},isObject:function(e){return e===Object(e)},isArray:function(e){return Array.isArray(e)},isArrayLike:function(e){return e?e.length===+e.length:!1},clone:function(e){if(Li.isObject(e)){if(Li.isArray(e))return e.slice();if(Li.isArrayLike(e)){for(var t=new e.constructor(e.length),r=0;r<e.length;r++)t[r]=e[r];return t}else return Li.extend({},e)}else return e}},Ne=Li;var an=function(){this.__uid__=Ne.genGUID()};an.__initializers__=[function(e){Ne.extend(this,e)}];Ne.extend(an,es);Ne.extend(an.prototype,Qr);var xe=an;var ts=["OES_texture_float","OES_texture_half_float","OES_texture_float_linear","OES_texture_half_float_linear","OES_standard_derivatives","OES_vertex_array_object","OES_element_index_uint","WEBGL_compressed_texture_s3tc","WEBGL_depth_texture","EXT_texture_filter_anisotropic","EXT_shader_texture_lod","WEBGL_draw_buffers","EXT_frag_depth","EXT_sRGB","ANGLE_instanced_arrays"],rs=["MAX_TEXTURE_SIZE","MAX_CUBE_MAP_TEXTURE_SIZE"];function Xu(e){for(var t={},r={},i=0;i<ts.length;i++){var n=ts[i];o(n)}for(var i=0;i<rs.length;i++){var a=rs[i];r[a]=e.getParameter(e[a])}this.getExtension=function(s){return s in t||o(s),t[s]},this.getParameter=function(s){return r[s]};function o(s){if(e.getExtension){var l=e.getExtension(s);l||(l=e.getExtension("MOZ_"+s)),l||(l=e.getExtension("WEBKIT_"+s)),t[s]=l}}}var is=Xu;var D={DEPTH_BUFFER_BIT:256,STENCIL_BUFFER_BIT:1024,COLOR_BUFFER_BIT:16384,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,ZERO:0,ONE:1,SRC_COLOR:768,ONE_MINUS_SRC_COLOR:769,SRC_ALPHA:770,ONE_MINUS_SRC_ALPHA:771,DST_ALPHA:772,ONE_MINUS_DST_ALPHA:773,DST_COLOR:774,ONE_MINUS_DST_COLOR:775,SRC_ALPHA_SATURATE:776,FUNC_ADD:32774,BLEND_EQUATION:32777,BLEND_EQUATION_RGB:32777,BLEND_EQUATION_ALPHA:34877,FUNC_SUBTRACT:32778,FUNC_REVERSE_SUBTRACT:32779,BLEND_DST_RGB:32968,BLEND_SRC_RGB:32969,BLEND_DST_ALPHA:32970,BLEND_SRC_ALPHA:32971,CONSTANT_COLOR:32769,ONE_MINUS_CONSTANT_COLOR:32770,CONSTANT_ALPHA:32771,ONE_MINUS_CONSTANT_ALPHA:32772,BLEND_COLOR:32773,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,ARRAY_BUFFER_BINDING:34964,ELEMENT_ARRAY_BUFFER_BINDING:34965,STREAM_DRAW:35040,STATIC_DRAW:35044,DYNAMIC_DRAW:35048,BUFFER_SIZE:34660,BUFFER_USAGE:34661,CURRENT_VERTEX_ATTRIB:34342,FRONT:1028,BACK:1029,FRONT_AND_BACK:1032,CULL_FACE:2884,BLEND:3042,DITHER:3024,STENCIL_TEST:2960,DEPTH_TEST:2929,SCISSOR_TEST:3089,POLYGON_OFFSET_FILL:32823,SAMPLE_ALPHA_TO_COVERAGE:32926,SAMPLE_COVERAGE:32928,NO_ERROR:0,INVALID_ENUM:1280,INVALID_VALUE:1281,INVALID_OPERATION:1282,OUT_OF_MEMORY:1285,CW:2304,CCW:2305,LINE_WIDTH:2849,ALIASED_POINT_SIZE_RANGE:33901,ALIASED_LINE_WIDTH_RANGE:33902,CULL_FACE_MODE:2885,FRONT_FACE:2886,DEPTH_RANGE:2928,DEPTH_WRITEMASK:2930,DEPTH_CLEAR_VALUE:2931,DEPTH_FUNC:2932,STENCIL_CLEAR_VALUE:2961,STENCIL_FUNC:2962,STENCIL_FAIL:2964,STENCIL_PASS_DEPTH_FAIL:2965,STENCIL_PASS_DEPTH_PASS:2966,STENCIL_REF:2967,STENCIL_VALUE_MASK:2963,STENCIL_WRITEMASK:2968,STENCIL_BACK_FUNC:34816,STENCIL_BACK_FAIL:34817,STENCIL_BACK_PASS_DEPTH_FAIL:34818,STENCIL_BACK_PASS_DEPTH_PASS:34819,STENCIL_BACK_REF:36003,STENCIL_BACK_VALUE_MASK:36004,STENCIL_BACK_WRITEMASK:36005,VIEWPORT:2978,SCISSOR_BOX:3088,COLOR_CLEAR_VALUE:3106,COLOR_WRITEMASK:3107,UNPACK_ALIGNMENT:3317,PACK_ALIGNMENT:3333,MAX_TEXTURE_SIZE:3379,MAX_VIEWPORT_DIMS:3386,SUBPIXEL_BITS:3408,RED_BITS:3410,GREEN_BITS:3411,BLUE_BITS:3412,ALPHA_BITS:3413,DEPTH_BITS:3414,STENCIL_BITS:3415,POLYGON_OFFSET_UNITS:10752,POLYGON_OFFSET_FACTOR:32824,TEXTURE_BINDING_2D:32873,SAMPLE_BUFFERS:32936,SAMPLES:32937,SAMPLE_COVERAGE_VALUE:32938,SAMPLE_COVERAGE_INVERT:32939,COMPRESSED_TEXTURE_FORMATS:34467,DONT_CARE:4352,FASTEST:4353,NICEST:4354,GENERATE_MIPMAP_HINT:33170,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,DEPTH_COMPONENT:6402,ALPHA:6406,RGB:6407,RGBA:6408,LUMINANCE:6409,LUMINANCE_ALPHA:6410,UNSIGNED_SHORT_4_4_4_4:32819,UNSIGNED_SHORT_5_5_5_1:32820,UNSIGNED_SHORT_5_6_5:33635,FRAGMENT_SHADER:35632,VERTEX_SHADER:35633,MAX_VERTEX_ATTRIBS:34921,MAX_VERTEX_UNIFORM_VECTORS:36347,MAX_VARYING_VECTORS:36348,MAX_COMBINED_TEXTURE_IMAGE_UNITS:35661,MAX_VERTEX_TEXTURE_IMAGE_UNITS:35660,MAX_TEXTURE_IMAGE_UNITS:34930,MAX_FRAGMENT_UNIFORM_VECTORS:36349,SHADER_TYPE:35663,DELETE_STATUS:35712,LINK_STATUS:35714,VALIDATE_STATUS:35715,ATTACHED_SHADERS:35717,ACTIVE_UNIFORMS:35718,ACTIVE_ATTRIBUTES:35721,SHADING_LANGUAGE_VERSION:35724,CURRENT_PROGRAM:35725,NEVER:512,LESS:513,EQUAL:514,LEQUAL:515,GREATER:516,NOTEQUAL:517,GEQUAL:518,ALWAYS:519,KEEP:7680,REPLACE:7681,INCR:7682,DECR:7683,INVERT:5386,INCR_WRAP:34055,DECR_WRAP:34056,VENDOR:7936,RENDERER:7937,VERSION:7938,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,TEXTURE_MAG_FILTER:10240,TEXTURE_MIN_FILTER:10241,TEXTURE_WRAP_S:10242,TEXTURE_WRAP_T:10243,TEXTURE_2D:3553,TEXTURE:5890,TEXTURE_CUBE_MAP:34067,TEXTURE_BINDING_CUBE_MAP:34068,TEXTURE_CUBE_MAP_POSITIVE_X:34069,TEXTURE_CUBE_MAP_NEGATIVE_X:34070,TEXTURE_CUBE_MAP_POSITIVE_Y:34071,TEXTURE_CUBE_MAP_NEGATIVE_Y:34072,TEXTURE_CUBE_MAP_POSITIVE_Z:34073,TEXTURE_CUBE_MAP_NEGATIVE_Z:34074,MAX_CUBE_MAP_TEXTURE_SIZE:34076,TEXTURE0:33984,TEXTURE1:33985,TEXTURE2:33986,TEXTURE3:33987,TEXTURE4:33988,TEXTURE5:33989,TEXTURE6:33990,TEXTURE7:33991,TEXTURE8:33992,TEXTURE9:33993,TEXTURE10:33994,TEXTURE11:33995,TEXTURE12:33996,TEXTURE13:33997,TEXTURE14:33998,TEXTURE15:33999,TEXTURE16:34e3,TEXTURE17:34001,TEXTURE18:34002,TEXTURE19:34003,TEXTURE20:34004,TEXTURE21:34005,TEXTURE22:34006,TEXTURE23:34007,TEXTURE24:34008,TEXTURE25:34009,TEXTURE26:34010,TEXTURE27:34011,TEXTURE28:34012,TEXTURE29:34013,TEXTURE30:34014,TEXTURE31:34015,ACTIVE_TEXTURE:34016,REPEAT:10497,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,INT_VEC2:35667,INT_VEC3:35668,INT_VEC4:35669,BOOL:35670,BOOL_VEC2:35671,BOOL_VEC3:35672,BOOL_VEC4:35673,FLOAT_MAT2:35674,FLOAT_MAT3:35675,FLOAT_MAT4:35676,SAMPLER_2D:35678,SAMPLER_CUBE:35680,VERTEX_ATTRIB_ARRAY_ENABLED:34338,VERTEX_ATTRIB_ARRAY_SIZE:34339,VERTEX_ATTRIB_ARRAY_STRIDE:34340,VERTEX_ATTRIB_ARRAY_TYPE:34341,VERTEX_ATTRIB_ARRAY_NORMALIZED:34922,VERTEX_ATTRIB_ARRAY_POINTER:34373,VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:34975,COMPILE_STATUS:35713,LOW_FLOAT:36336,MEDIUM_FLOAT:36337,HIGH_FLOAT:36338,LOW_INT:36339,MEDIUM_INT:36340,HIGH_INT:36341,FRAMEBUFFER:36160,RENDERBUFFER:36161,RGBA4:32854,RGB5_A1:32855,RGB565:36194,DEPTH_COMPONENT16:33189,STENCIL_INDEX:6401,STENCIL_INDEX8:36168,DEPTH_STENCIL:34041,RENDERBUFFER_WIDTH:36162,RENDERBUFFER_HEIGHT:36163,RENDERBUFFER_INTERNAL_FORMAT:36164,RENDERBUFFER_RED_SIZE:36176,RENDERBUFFER_GREEN_SIZE:36177,RENDERBUFFER_BLUE_SIZE:36178,RENDERBUFFER_ALPHA_SIZE:36179,RENDERBUFFER_DEPTH_SIZE:36180,RENDERBUFFER_STENCIL_SIZE:36181,FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE:36048,FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:36049,FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL:36050,FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE:36051,COLOR_ATTACHMENT0:36064,DEPTH_ATTACHMENT:36096,STENCIL_ATTACHMENT:36128,DEPTH_STENCIL_ATTACHMENT:33306,NONE:0,FRAMEBUFFER_COMPLETE:36053,FRAMEBUFFER_INCOMPLETE_ATTACHMENT:36054,FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:36055,FRAMEBUFFER_INCOMPLETE_DIMENSIONS:36057,FRAMEBUFFER_UNSUPPORTED:36061,FRAMEBUFFER_BINDING:36006,RENDERBUFFER_BINDING:36007,MAX_RENDERBUFFER_SIZE:34024,INVALID_FRAMEBUFFER_OPERATION:1286,UNPACK_FLIP_Y_WEBGL:37440,UNPACK_PREMULTIPLY_ALPHA_WEBGL:37441,CONTEXT_LOST_WEBGL:37442,UNPACK_COLORSPACE_CONVERSION_WEBGL:37443,BROWSER_DEFAULT_WEBGL:37444};function ju(e){var t=new XMLHttpRequest;t.open("get",e.url),t.responseType=e.responseType||"text",e.onprogress&&(t.onprogress=function(r){if(r.lengthComputable){var i=r.loaded/r.total;e.onprogress(i,r.loaded,r.total)}else e.onprogress(null)}),t.onload=function(r){t.status>=400?e.onerror&&e.onerror():e.onload&&e.onload(t.response)},e.onerror&&(t.onerror=e.onerror),t.send(null)}var ns={get:ju};var pa,dt={};dt.supportWebGL=function(){if(pa==null)try{var e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");if(!t)throw new Error}catch{pa=!1}return pa};dt.Int8Array=typeof Int8Array>"u"?Array:Int8Array;dt.Uint8Array=typeof Uint8Array>"u"?Array:Uint8Array;dt.Uint16Array=typeof Uint16Array>"u"?Array:Uint16Array;dt.Uint32Array=typeof Uint32Array>"u"?Array:Uint32Array;dt.Int16Array=typeof Int16Array>"u"?Array:Int16Array;dt.Float32Array=typeof Float32Array>"u"?Array:Float32Array;dt.Float64Array=typeof Float64Array>"u"?Array:Float64Array;var Ir={};typeof window<"u"?Ir=window:typeof global<"u"&&(Ir=global);dt.requestAnimationFrame=Ir.requestAnimationFrame||Ir.msRequestAnimationFrame||Ir.mozRequestAnimationFrame||Ir.webkitRequestAnimationFrame||function(e){setTimeout(e,16)};dt.createCanvas=function(){return document.createElement("canvas")};dt.createImage=function(){return new Ir.Image};dt.request={get:ns.get};dt.addEventListener=function(e,t,r,i){e.addEventListener(t,r,i)};dt.removeEventListener=function(e,t,r){e.removeEventListener(t,r)};var me=dt;var it=function(){this.head=null,this.tail=null,this._length=0};it.prototype.insert=function(e){var t=new it.Entry(e);return this.insertEntry(t),t};it.prototype.insertAt=function(e,t){if(!(e<0)){for(var r=this.head,i=0;r&&i!=e;)r=r.next,i++;if(r){var n=new it.Entry(t),a=r.prev;a?(a.next=n,n.prev=a):this.head=n,n.next=r,r.prev=n}else this.insert(t)}};it.prototype.insertBeforeEntry=function(e,t){var r=new it.Entry(e),i=t.prev;i?(i.next=r,r.prev=i):this.head=r,r.next=t,t.prev=r,this._length++};it.prototype.insertEntry=function(e){this.head?(this.tail.next=e,e.prev=this.tail,this.tail=e):this.head=this.tail=e,this._length++};it.prototype.remove=function(e){var t=e.prev,r=e.next;t?t.next=r:this.head=r,r?r.prev=t:this.tail=t,e.next=e.prev=null,this._length--};it.prototype.removeAt=function(e){if(!(e<0)){for(var t=this.head,r=0;t&&r!=e;)t=t.next,r++;if(t)return this.remove(t),t.value}};it.prototype.getHead=function(){if(this.head)return this.head.value};it.prototype.getTail=function(){if(this.tail)return this.tail.value};it.prototype.getAt=function(e){if(!(e<0)){for(var t=this.head,r=0;t&&r!=e;)t=t.next,r++;return t.value}};it.prototype.indexOf=function(e){for(var t=this.head,r=0;t;){if(t.value===e)return r;t=t.next,r++}};it.prototype.length=function(){return this._length};it.prototype.isEmpty=function(){return this._length===0};it.prototype.forEach=function(e,t){for(var r=this.head,i=0,n=typeof t<"u";r;)n?e.call(t,r.value,i):e(r.value,i),r=r.next,i++};it.prototype.clear=function(){this.tail=this.head=null,this._length=0};it.Entry=function(e){this.value=e,this.next=null,this.prev=null};var as=it;var Jr=function(e){this._list=new as,this._map={},this._maxSize=e||10};Jr.prototype.setMaxSize=function(e){this._maxSize=e};Jr.prototype.put=function(e,t){if(!this._map.hasOwnProperty(e)){var r=this._list.length();if(r>=this._maxSize&&r>0){var i=this._list.head;this._list.remove(i),delete this._map[i.key]}var n=this._list.insert(t);n.key=e,this._map[e]=n}};Jr.prototype.get=function(e){var t=this._map[e];if(this._map.hasOwnProperty(e))return t!==this._list.tail&&(this._list.remove(t),this._list.insertEntry(t)),t.value};Jr.prototype.remove=function(e){var t=this._map[e];typeof t<"u"&&(delete this._map[e],this._list.remove(t))};Jr.prototype.clear=function(){this._list.clear(),this._map={}};var on=Jr;var Re={},os={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function zt(e){return e=Math.round(e),e<0?0:e>255?255:e}function Zu(e){return e=Math.round(e),e<0?0:e>360?360:e}function Di(e){return e<0?0:e>1?1:e}function va(e){return e.length&&e.charAt(e.length-1)==="%"?zt(parseFloat(e)/100*255):zt(parseInt(e,10))}function ei(e){return e.length&&e.charAt(e.length-1)==="%"?Di(parseFloat(e)/100):Di(parseFloat(e))}function ga(e,t,r){return r<0?r+=1:r>1&&(r-=1),r*6<1?e+(t-e)*r*6:r*2<1?t:r*3<2?e+(t-e)*(2/3-r)*6:e}function ur(e,t,r){return e+(t-e)*r}function Ut(e,t,r,i,n){return e[0]=t,e[1]=r,e[2]=i,e[3]=n,e}function _a(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}var ss=new on(20),sn=null;function $r(e,t){sn&&_a(sn,t),sn=ss.put(e,sn||t.slice())}Re.parse=function(e,t){if(e){t=t||[];var r=ss.get(e);if(r)return _a(t,r);e=e+"";var i=e.replace(/ /g,"").toLowerCase();if(i in os)return _a(t,os[i]),$r(e,t),t;if(i.charAt(0)==="#"){if(i.length===4){var n=parseInt(i.substr(1),16);if(!(n>=0&&n<=4095)){Ut(t,0,0,0,1);return}return Ut(t,(n&3840)>>4|(n&3840)>>8,n&240|(n&240)>>4,n&15|(n&15)<<4,1),$r(e,t),t}else if(i.length===7){var n=parseInt(i.substr(1),16);if(!(n>=0&&n<=16777215)){Ut(t,0,0,0,1);return}return Ut(t,(n&16711680)>>16,(n&65280)>>8,n&255,1),$r(e,t),t}return}var a=i.indexOf("("),o=i.indexOf(")");if(a!==-1&&o+1===i.length){var s=i.substr(0,a),l=i.substr(a+1,o-(a+1)).split(","),f=1;switch(s){case"rgba":if(l.length!==4){Ut(t,0,0,0,1);return}f=ei(l.pop());case"rgb":if(l.length!==3){Ut(t,0,0,0,1);return}return Ut(t,va(l[0]),va(l[1]),va(l[2]),f),$r(e,t),t;case"hsla":if(l.length!==4){Ut(t,0,0,0,1);return}return l[3]=ei(l[3]),xa(l,t),$r(e,t),t;case"hsl":if(l.length!==3){Ut(t,0,0,0,1);return}return xa(l,t),$r(e,t),t;default:return}}Ut(t,0,0,0,1)}};Re.parseToFloat=function(e,t){if(t=Re.parse(e,t),!!t)return t[0]/=255,t[1]/=255,t[2]/=255,t};function xa(e,t){var r=(parseFloat(e[0])%360+360)%360/360,i=ei(e[1]),n=ei(e[2]),a=n<=.5?n*(i+1):n+i-n*i,o=n*2-a;return t=t||[],Ut(t,zt(ga(o,a,r+1/3)*255),zt(ga(o,a,r)*255),zt(ga(o,a,r-1/3)*255),1),e.length===4&&(t[3]=e[3]),t}function Yu(e){if(e){var t=e[0]/255,r=e[1]/255,i=e[2]/255,n=Math.min(t,r,i),a=Math.max(t,r,i),o=a-n,s=(a+n)/2,l,f;if(o===0)l=0,f=0;else{s<.5?f=o/(a+n):f=o/(2-a-n);var h=((a-t)/6+o/2)/o,u=((a-r)/6+o/2)/o,d=((a-i)/6+o/2)/o;t===a?l=d-u:r===a?l=1/3+h-d:i===a&&(l=2/3+u-h),l<0&&(l+=1),l>1&&(l-=1)}var c=[l*360,f,s];return e[3]!=null&&c.push(e[3]),c}}Re.lift=function(e,t){var r=Re.parse(e);if(r){for(var i=0;i<3;i++)t<0?r[i]=r[i]*(1-t)|0:r[i]=(255-r[i])*t+r[i]|0;return Re.stringify(r,r.length===4?"rgba":"rgb")}};Re.toHex=function(e){var t=Re.parse(e);if(t)return((1<<24)+(t[0]<<16)+(t[1]<<8)+ +t[2]).toString(16).slice(1)};Re.fastLerp=function(e,t,r){if(!(!(t&&t.length)||!(e>=0&&e<=1))){r=r||[];var i=e*(t.length-1),n=Math.floor(i),a=Math.ceil(i),o=t[n],s=t[a],l=i-n;return r[0]=zt(ur(o[0],s[0],l)),r[1]=zt(ur(o[1],s[1],l)),r[2]=zt(ur(o[2],s[2],l)),r[3]=Di(ur(o[3],s[3],l)),r}};Re.fastMapToColor=Re.fastLerp;Re.lerp=function(e,t,r){if(!(!(t&&t.length)||!(e>=0&&e<=1))){var i=e*(t.length-1),n=Math.floor(i),a=Math.ceil(i),o=Re.parse(t[n]),s=Re.parse(t[a]),l=i-n,f=Re.stringify([zt(ur(o[0],s[0],l)),zt(ur(o[1],s[1],l)),zt(ur(o[2],s[2],l)),Di(ur(o[3],s[3],l))],"rgba");return r?{color:f,leftIndex:n,rightIndex:a,value:i}:f}};Re.mapToColor=Re.lerp;Re.modifyHSL=function(e,t,r,i){if(e=Re.parse(e),e)return e=Yu(e),t!=null&&(e[0]=Zu(t)),r!=null&&(e[1]=ei(r)),i!=null&&(e[2]=ei(i)),Re.stringify(xa(e),"rgba")};Re.modifyAlpha=function(e,t){if(e=Re.parse(e),e&&t!=null)return e[3]=Di(t),Re.stringify(e,"rgba")};Re.stringify=function(e,t){if(!(!e||!e.length)){var r=e[0]+","+e[1]+","+e[2];return(t==="rgba"||t==="hsva"||t==="hsla")&&(r+=","+e[3]),t+"("+r+")"}};var ls=Re;var qu=ls.parseToFloat,ya={};function fs(e){var t=Object.keys(e);t.sort();for(var r=[],i=0;i<t.length;i++){var n=t[i],a=e[n];a===null?r.push(n):r.push(n+" "+a.toString())}return r.join(`
`)}function Ku(e,t,r){r.sort();for(var i=[],n=0;n<r.length;n++){var a=r[n];i.push(a)}var o=fs(e)+`
`+fs(t)+`
`+i.join(`
`);if(ya[o])return ya[o];var s=Ne.genGUID();return ya[o]=s,s}var Qu=xe.extend(function(){return{name:"",depthTest:!0,depthMask:!0,transparent:!1,blend:null,autoUpdateTextureStatus:!0,uniforms:{},vertexDefines:{},fragmentDefines:{},_textureStatus:{},_enabledUniforms:null}},function(){this.name||(this.name="MATERIAL_"+this.__uid__),this.shader&&this.attachShader(this.shader,!0)},{precision:"highp",setUniform:function(e,t){t===void 0&&console.warn('Uniform value "'+e+'" is undefined');var r=this.uniforms[e];r&&(typeof t=="string"&&(t=qu(t)||t),r.value=t,this.autoUpdateTextureStatus&&r.type==="t"&&(t?this.enableTexture(e):this.disableTexture(e)))},setUniforms:function(e){for(var t in e){var r=e[t];this.setUniform(t,r)}},isUniformEnabled:function(e){return this._enabledUniforms.indexOf(e)>=0},getEnabledUniforms:function(){return this._enabledUniforms},getTextureUniforms:function(){return this._textureUniforms},set:function(e,t){if(typeof e=="object")for(var r in e){var i=e[r];this.setUniform(r,i)}else this.setUniform(e,t)},get:function(e){var t=this.uniforms[e];if(t)return t.value},attachShader:function(e,t){var r=this.uniforms;this.uniforms=e.createUniforms(),this.shader=e;var i=this.uniforms;this._enabledUniforms=Object.keys(i),this._enabledUniforms.sort(),this._textureUniforms=this._enabledUniforms.filter(function(f){var h=this.uniforms[f].type;return h==="t"||h==="tv"},this);var n=this.vertexDefines,a=this.fragmentDefines;if(this.vertexDefines=Ne.clone(e.vertexDefines),this.fragmentDefines=Ne.clone(e.fragmentDefines),t){for(var o in r)i[o]&&(i[o].value=r[o].value);Ne.defaults(this.vertexDefines,n),Ne.defaults(this.fragmentDefines,a)}var s={};for(var l in e.textures)s[l]={shaderType:e.textures[l].shaderType,type:e.textures[l].type,enabled:t&&this._textureStatus[l]?this._textureStatus[l].enabled:!1};this._textureStatus=s,this._programKey=""},clone:function(){var e=new this.constructor({name:this.name,shader:this.shader});for(var t in this.uniforms)e.uniforms[t].value=this.uniforms[t].value;return e.depthTest=this.depthTest,e.depthMask=this.depthMask,e.transparent=this.transparent,e.blend=this.blend,e.vertexDefines=Ne.clone(this.vertexDefines),e.fragmentDefines=Ne.clone(this.fragmentDefines),e.enableTexture(this.getEnabledTextures()),e.precision=this.precision,e},define:function(e,t,r){var i=this.vertexDefines,n=this.fragmentDefines;e!=="vertex"&&e!=="fragment"&&e!=="both"&&arguments.length<3&&(r=t,t=e,e="both"),r=r??null,(e==="vertex"||e==="both")&&i[t]!==r&&(i[t]=r,this._programKey=""),(e==="fragment"||e==="both")&&n[t]!==r&&(n[t]=r,e!=="both"&&(this._programKey=""))},undefine:function(e,t){e!=="vertex"&&e!=="fragment"&&e!=="both"&&arguments.length<2&&(t=e,e="both"),(e==="vertex"||e==="both")&&this.isDefined("vertex",t)&&(delete this.vertexDefines[t],this._programKey=""),(e==="fragment"||e==="both")&&this.isDefined("fragment",t)&&(delete this.fragmentDefines[t],e!=="both"&&(this._programKey=""))},isDefined:function(e,t){switch(e){case"vertex":return this.vertexDefines[t]!==void 0;case"fragment":return this.fragmentDefines[t]!==void 0}},getDefine:function(e,t){switch(e){case"vertex":return this.vertexDefines[t];case"fragment":return this.fragmentDefines[t]}},enableTexture:function(e){if(Array.isArray(e)){for(var t=0;t<e.length;t++)this.enableTexture(e[t]);return}var r=this._textureStatus[e];if(r){var i=r.enabled;i||(r.enabled=!0,this._programKey="")}},enableTexturesAll:function(){var e=this._textureStatus;for(var t in e)e[t].enabled=!0;this._programKey=""},disableTexture:function(e){if(Array.isArray(e)){for(var t=0;t<e.length;t++)this.disableTexture(e[t]);return}var r=this._textureStatus[e];if(r){var i=!r.enabled;i||(r.enabled=!1,this._programKey="")}},disableTexturesAll:function(){var e=this._textureStatus;for(var t in e)e[t].enabled=!1;this._programKey=""},isTextureEnabled:function(e){var t=this._textureStatus;return!!t[e]&&t[e].enabled},getEnabledTextures:function(){var e=[],t=this._textureStatus;for(var r in t)t[r].enabled&&e.push(r);return e},dirtyDefines:function(){this._programKey=""},getProgramKey:function(){return this._programKey||(this._programKey=Ku(this.vertexDefines,this.fragmentDefines,this.getEnabledTextures())),this._programKey}}),Ye=Qu;var Ci=1e-6,Ce=Array,cr=Math.random;var te={};te.create=function(){var e=new Ce(2);return e[0]=0,e[1]=0,e};te.clone=function(e){var t=new Ce(2);return t[0]=e[0],t[1]=e[1],t};te.fromValues=function(e,t){var r=new Ce(2);return r[0]=e,r[1]=t,r};te.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e};te.set=function(e,t,r){return e[0]=t,e[1]=r,e};te.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e};te.subtract=function(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e};te.sub=te.subtract;te.multiply=function(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e};te.mul=te.multiply;te.divide=function(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e};te.div=te.divide;te.min=function(e,t,r){return e[0]=Math.min(t[0],r[0]),e[1]=Math.min(t[1],r[1]),e};te.max=function(e,t,r){return e[0]=Math.max(t[0],r[0]),e[1]=Math.max(t[1],r[1]),e};te.scale=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e};te.scaleAndAdd=function(e,t,r,i){return e[0]=t[0]+r[0]*i,e[1]=t[1]+r[1]*i,e};te.distance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1];return Math.sqrt(r*r+i*i)};te.dist=te.distance;te.squaredDistance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1];return r*r+i*i};te.sqrDist=te.squaredDistance;te.length=function(e){var t=e[0],r=e[1];return Math.sqrt(t*t+r*r)};te.len=te.length;te.squaredLength=function(e){var t=e[0],r=e[1];return t*t+r*r};te.sqrLen=te.squaredLength;te.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e};te.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e};te.normalize=function(e,t){var r=t[0],i=t[1],n=r*r+i*i;return n>0&&(n=1/Math.sqrt(n),e[0]=t[0]*n,e[1]=t[1]*n),e};te.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]};te.cross=function(e,t,r){var i=t[0]*r[1]-t[1]*r[0];return e[0]=e[1]=0,e[2]=i,e};te.lerp=function(e,t,r,i){var n=t[0],a=t[1];return e[0]=n+i*(r[0]-n),e[1]=a+i*(r[1]-a),e};te.random=function(e,t){t=t||1;var r=GLMAT_RANDOM()*2*Math.PI;return e[0]=Math.cos(r)*t,e[1]=Math.sin(r)*t,e};te.transformMat2=function(e,t,r){var i=t[0],n=t[1];return e[0]=r[0]*i+r[2]*n,e[1]=r[1]*i+r[3]*n,e};te.transformMat2d=function(e,t,r){var i=t[0],n=t[1];return e[0]=r[0]*i+r[2]*n+r[4],e[1]=r[1]*i+r[3]*n+r[5],e};te.transformMat3=function(e,t,r){var i=t[0],n=t[1];return e[0]=r[0]*i+r[3]*n+r[6],e[1]=r[1]*i+r[4]*n+r[7],e};te.transformMat4=function(e,t,r){var i=t[0],n=t[1];return e[0]=r[0]*i+r[4]*n+r[12],e[1]=r[1]*i+r[5]*n+r[13],e};te.forEach=(function(){var e=te.create();return function(t,r,i,n,a,o){var s,l;for(r||(r=2),i||(i=0),n?l=Math.min(n*r+i,t.length):l=t.length,s=i;s<l;s+=r)e[0]=t[s],e[1]=t[s+1],a(e,e,o),t[s]=e[0],t[s+1]=e[1];return t}})();var q=te;var ne=function(e,t){e=e||0,t=t||0,this.array=q.fromValues(e,t),this._dirty=!0};ne.prototype={constructor:ne,add:function(e){return q.add(this.array,this.array,e.array),this._dirty=!0,this},set:function(e,t){return this.array[0]=e,this.array[1]=t,this._dirty=!0,this},setArray:function(e){return this.array[0]=e[0],this.array[1]=e[1],this._dirty=!0,this},clone:function(){return new ne(this.x,this.y)},copy:function(e){return q.copy(this.array,e.array),this._dirty=!0,this},cross:function(e,t){return q.cross(e.array,this.array,t.array),e._dirty=!0,this},dist:function(e){return q.dist(this.array,e.array)},distance:function(e){return q.distance(this.array,e.array)},div:function(e){return q.div(this.array,this.array,e.array),this._dirty=!0,this},divide:function(e){return q.divide(this.array,this.array,e.array),this._dirty=!0,this},dot:function(e){return q.dot(this.array,e.array)},len:function(){return q.len(this.array)},length:function(){return q.length(this.array)},lerp:function(e,t,r){return q.lerp(this.array,e.array,t.array,r),this._dirty=!0,this},min:function(e){return q.min(this.array,this.array,e.array),this._dirty=!0,this},max:function(e){return q.max(this.array,this.array,e.array),this._dirty=!0,this},mul:function(e){return q.mul(this.array,this.array,e.array),this._dirty=!0,this},multiply:function(e){return q.multiply(this.array,this.array,e.array),this._dirty=!0,this},negate:function(){return q.negate(this.array,this.array),this._dirty=!0,this},normalize:function(){return q.normalize(this.array,this.array),this._dirty=!0,this},random:function(e){return q.random(this.array,e),this._dirty=!0,this},scale:function(e){return q.scale(this.array,this.array,e),this._dirty=!0,this},scaleAndAdd:function(e,t){return q.scaleAndAdd(this.array,this.array,e.array,t),this._dirty=!0,this},sqrDist:function(e){return q.sqrDist(this.array,e.array)},squaredDistance:function(e){return q.squaredDistance(this.array,e.array)},sqrLen:function(){return q.sqrLen(this.array)},squaredLength:function(){return q.squaredLength(this.array)},sub:function(e){return q.sub(this.array,this.array,e.array),this._dirty=!0,this},subtract:function(e){return q.subtract(this.array,this.array,e.array),this._dirty=!0,this},transformMat2:function(e){return q.transformMat2(this.array,this.array,e.array),this._dirty=!0,this},transformMat2d:function(e){return q.transformMat2d(this.array,this.array,e.array),this._dirty=!0,this},transformMat3:function(e){return q.transformMat3(this.array,this.array,e.array),this._dirty=!0,this},transformMat4:function(e){return q.transformMat4(this.array,this.array,e.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};Object.defineProperty&&(Ta=ne.prototype,Object.defineProperty(Ta,"x",{get:function(){return this.array[0]},set:function(e){this.array[0]=e,this._dirty=!0}}),Object.defineProperty(Ta,"y",{get:function(){return this.array[1]},set:function(e){this.array[1]=e,this._dirty=!0}}));var Ta;ne.add=function(e,t,r){return q.add(e.array,t.array,r.array),e._dirty=!0,e};ne.set=function(e,t,r){return q.set(e.array,t,r),e._dirty=!0,e};ne.copy=function(e,t){return q.copy(e.array,t.array),e._dirty=!0,e};ne.cross=function(e,t,r){return q.cross(e.array,t.array,r.array),e._dirty=!0,e};ne.dist=function(e,t){return q.distance(e.array,t.array)};ne.distance=ne.dist;ne.div=function(e,t,r){return q.divide(e.array,t.array,r.array),e._dirty=!0,e};ne.divide=ne.div;ne.dot=function(e,t){return q.dot(e.array,t.array)};ne.len=function(e){return q.length(e.array)};ne.lerp=function(e,t,r,i){return q.lerp(e.array,t.array,r.array,i),e._dirty=!0,e};ne.min=function(e,t,r){return q.min(e.array,t.array,r.array),e._dirty=!0,e};ne.max=function(e,t,r){return q.max(e.array,t.array,r.array),e._dirty=!0,e};ne.mul=function(e,t,r){return q.multiply(e.array,t.array,r.array),e._dirty=!0,e};ne.multiply=ne.mul;ne.negate=function(e,t){return q.negate(e.array,t.array),e._dirty=!0,e};ne.normalize=function(e,t){return q.normalize(e.array,t.array),e._dirty=!0,e};ne.random=function(e,t){return q.random(e.array,t),e._dirty=!0,e};ne.scale=function(e,t,r){return q.scale(e.array,t.array,r),e._dirty=!0,e};ne.scaleAndAdd=function(e,t,r,i){return q.scaleAndAdd(e.array,t.array,r.array,i),e._dirty=!0,e};ne.sqrDist=function(e,t){return q.sqrDist(e.array,t.array)};ne.squaredDistance=ne.sqrDist;ne.sqrLen=function(e){return q.sqrLen(e.array)};ne.squaredLength=ne.sqrLen;ne.sub=function(e,t,r){return q.subtract(e.array,t.array,r.array),e._dirty=!0,e};ne.subtract=ne.sub;ne.transformMat2=function(e,t,r){return q.transformMat2(e.array,t.array,r.array),e._dirty=!0,e};ne.transformMat2d=function(e,t,r){return q.transformMat2d(e.array,t.array,r.array),e._dirty=!0,e};ne.transformMat3=function(e,t,r){return q.transformMat3(e.array,t.array,r.array),e._dirty=!0,e};ne.transformMat4=function(e,t,r){return q.transformMat4(e.array,t.array,r.array),e._dirty=!0,e};var nt=ne;var hs=1,us=2,Ea=3,cs={};function Ju(e){for(var t=e.split(`
`),r=0,i=t.length;r<i;r++)t[r]=r+1+": "+t[r];return t.join(`
`)}function ds(e,t,r){if(!e.getShaderParameter(t,e.COMPILE_STATUS))return[e.getShaderInfoLog(t),Ju(r)].join(`
`)}var ms=new me.Float32Array(16),$u=xe.extend({uniformSemantics:{},attributes:{}},function(){this._locations={},this._textureSlot=0,this._program=null},{bind:function(e){this._textureSlot=0,e.gl.useProgram(this._program)},hasUniform:function(e){var t=this._locations[e];return t!=null},useTextureSlot:function(e,t,r){t&&(e.gl.activeTexture(e.gl.TEXTURE0+r),t.isRenderable()?t.bind(e):t.unbind(e))},currentTextureSlot:function(){return this._textureSlot},resetTextureSlot:function(e){this._textureSlot=e||0},takeCurrentTextureSlot:function(e,t){var r=this._textureSlot;return this.useTextureSlot(e,t,r),this._textureSlot++,r},setUniform:function(e,t,r,i){var n=this._locations,a=n[r];if(a==null)return!1;switch(t){case"m4":if(!(i instanceof Float32Array)){for(var o=0;o<i.length;o++)ms[o]=i[o];i=ms}e.uniformMatrix4fv(a,!1,i);break;case"2i":e.uniform2i(a,i[0],i[1]);break;case"2f":e.uniform2f(a,i[0],i[1]);break;case"3i":e.uniform3i(a,i[0],i[1],i[2]);break;case"3f":e.uniform3f(a,i[0],i[1],i[2]);break;case"4i":e.uniform4i(a,i[0],i[1],i[2],i[3]);break;case"4f":e.uniform4f(a,i[0],i[1],i[2],i[3]);break;case"1i":e.uniform1i(a,i);break;case"1f":e.uniform1f(a,i);break;case"1fv":e.uniform1fv(a,i);break;case"1iv":e.uniform1iv(a,i);break;case"2iv":e.uniform2iv(a,i);break;case"2fv":e.uniform2fv(a,i);break;case"3iv":e.uniform3iv(a,i);break;case"3fv":e.uniform3fv(a,i);break;case"4iv":e.uniform4iv(a,i);break;case"4fv":e.uniform4fv(a,i);break;case"m2":case"m2v":e.uniformMatrix2fv(a,!1,i);break;case"m3":case"m3v":e.uniformMatrix3fv(a,!1,i);break;case"m4v":if(Array.isArray(i)&&Array.isArray(i[0])){for(var s=new me.Float32Array(i.length*16),l=0,o=0;o<i.length;o++)for(var f=i[o],h=0;h<16;h++)s[l++]=f[h];e.uniformMatrix4fv(a,!1,s)}else e.uniformMatrix4fv(a,!1,i);break}return!0},setUniformOfSemantic:function(e,t,r){var i=this.uniformSemantics[t];return i?this.setUniform(e,i.type,i.symbol,r):!1},enableAttributes:function(e,t,r){var i=e.gl,n=this._program,a=this._locations,o;r?o=r.__enabledAttributeList:o=cs[e.__uid__],o||(r?o=r.__enabledAttributeList=[]:o=cs[e.__uid__]=[]);for(var s=[],l=0;l<t.length;l++){var f=t[l];if(!this.attributes[f]){s[l]=-1;continue}var h=a[f];if(h==null){if(h=i.getAttribLocation(n,f),h===-1){s[l]=-1;continue}a[f]=h}s[l]=h,o[h]?o[h]=us:o[h]=hs}for(var l=0;l<o.length;l++)switch(o[l]){case hs:i.enableVertexAttribArray(l),o[l]=Ea;break;case us:o[l]=Ea;break;case Ea:i.disableVertexAttribArray(l),o[l]=0;break}return s},getAttribLocation:function(e,t){var r=this._locations,i=r[t];return i==null&&(i=e.getAttribLocation(this._program,t),r[t]=i),i},buildProgram:function(e,t,r,i){var n=e.createShader(e.VERTEX_SHADER),a=e.createProgram();e.shaderSource(n,r),e.compileShader(n);var o=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(o,i),e.compileShader(o);var s=ds(e,n,r);if(s||(s=ds(e,o,i),s))return s;if(e.attachShader(a,n),e.attachShader(a,o),t.attributeSemantics.POSITION)e.bindAttribLocation(a,0,t.attributeSemantics.POSITION.symbol);else{var l=Object.keys(this.attributes);e.bindAttribLocation(a,0,l[0])}if(e.linkProgram(a),e.deleteShader(n),e.deleteShader(o),this._program=a,this.vertexCode=r,this.fragmentCode=i,!e.getProgramParameter(a,e.LINK_STATUS))return`Could not link program
`+e.getProgramInfoLog(a);for(var f=0;f<t.uniforms.length;f++){var h=t.uniforms[f];this._locations[h]=e.getUniformLocation(a,h)}}}),ps=$u;var ec=/for\s*?\(int\s*?_idx_\s*\=\s*([\w-]+)\;\s*_idx_\s*<\s*([\w-]+);\s*_idx_\s*\+\+\s*\)\s*\{\{([\s\S]+?)(?=\}\})\}\}/g;function vs(e,t,r){function i(o,s,l,f){var h="";isNaN(s)&&(s in t?s=t[s]:s=n[s]),isNaN(l)&&(l in t?l=t[l]:l=n[l]);for(var u=parseInt(s);u<parseInt(l);u++)h+="{"+f.replace(/float\s*\(\s*_idx_\s*\)/g,u.toFixed(1)).replace(/_idx_/g,u)+"}";return h}var n={};for(var a in r)n[a+"_COUNT"]=r[a];return e.replace(ec,i)}function Sa(e,t,r){var i=[];if(t)for(var n in t){var a=t[n];a>0&&i.push("#define "+n.toUpperCase()+"_COUNT "+a)}if(r)for(var o=0;o<r.length;o++){var s=r[o];i.push("#define "+s.toUpperCase()+"_ENABLED")}for(var s in e){var l=e[s];l===null?i.push("#define "+s):i.push("#define "+s+" "+l.toString())}return i.join(`
`)}function tc(e){for(var t=[],r=0;r<e.length;r++)t.push("#extension GL_"+e[r]+" : enable");return t.join(`
`)}function rc(e){return["precision",e,"float"].join(" ")+`;
`+["precision",e,"int"].join(" ")+`;
`+["precision",e,"sampler2D"].join(" ")+`;
`}function gs(e){this._renderer=e,this._cache={}}gs.prototype.getProgram=function(e,t,r){var i=this._cache,n=e.isSkinnedMesh&&e.isSkinnedMesh(),a=e.isInstancedMesh&&e.isInstancedMesh(),o="s"+t.shader.shaderID+"m"+t.getProgramKey();r&&(o+="se"+r.getProgramKey(e.lightGroup)),n&&(o+=",sk"+e.joints.length),a&&(o+=",is");var _=i[o];if(_)return _;var s=r?r.getLightsNumbers(e.lightGroup):{},l=this._renderer,f=l.gl,h=t.getEnabledTextures(),u="";if(n){var d={SKINNING:null,JOINT_COUNT:e.joints.length};e.joints.length>l.getMaxJointNumber()&&(d.USE_SKIN_MATRICES_TEXTURE=null),u+=`
`+Sa(d)+`
`}a&&(u+=`
#define INSTANCING
`);var c=u+Sa(t.vertexDefines,s,h),m=u+Sa(t.fragmentDefines,s,h),p=c+`
`+t.shader.vertex,v=["OES_standard_derivatives","EXT_shader_texture_lod"].filter(function(E){return l.getGLExtension(E)!=null});v.indexOf("EXT_shader_texture_lod")>=0&&(m+=`
#define SUPPORT_TEXTURE_LOD`),v.indexOf("OES_standard_derivatives")>=0&&(m+=`
#define SUPPORT_STANDARD_DERIVATIVES`);var g=tc(v)+`
`+rc(t.precision)+`
`+m+`
`+t.shader.fragment,y=vs(p,t.vertexDefines,s),x=vs(g,t.fragmentDefines,s),_=new ps;_.uniformSemantics=t.shader.uniformSemantics,_.attributes=t.shader.attributes;var S=_.buildProgram(f,t.shader,y,x);return _.__error=S,i[o]=_,_};var _s=gs;var xs=/uniform\s+(bool|float|int|vec2|vec3|vec4|ivec2|ivec3|ivec4|mat2|mat3|mat4|sampler2D|samplerCube)\s+([\s\S]*?);/g,ic=/attribute\s+(float|int|vec2|vec3|vec4)\s+([\s\S]*?);/g,ys=/#define\s+(\w+)?(\s+[\d-.]+)?\s*;?\s*\n/g,nc={bool:"1i",int:"1i",sampler2D:"t",samplerCube:"t",float:"1f",vec2:"2f",vec3:"3f",vec4:"4f",ivec2:"2i",ivec3:"3i",ivec4:"4i",mat2:"m2",mat3:"m3",mat4:"m4"};function Jt(e){for(var t=[],r=0;r<e;r++)t[r]=0;return t}var Ts={bool:function(){return!0},int:function(){return 0},float:function(){return 0},sampler2D:function(){return null},samplerCube:function(){return null},vec2:function(){return Jt(2)},vec3:function(){return Jt(3)},vec4:function(){return Jt(4)},ivec2:function(){return Jt(2)},ivec3:function(){return Jt(3)},ivec4:function(){return Jt(4)},mat2:function(){return Jt(4)},mat3:function(){return Jt(9)},mat4:function(){return Jt(16)},array:function(){return[]}},Aa=["POSITION","NORMAL","BINORMAL","TANGENT","TEXCOORD","TEXCOORD_0","TEXCOORD_1","COLOR","JOINT","WEIGHT"],ws=["SKIN_MATRIX","VIEWPORT_SIZE","VIEWPORT","DEVICEPIXELRATIO","WINDOW_SIZE","NEAR","FAR","TIME"],As=["WORLD","VIEW","PROJECTION","WORLDVIEW","VIEWPROJECTION","WORLDVIEWPROJECTION","WORLDINVERSE","VIEWINVERSE","PROJECTIONINVERSE","WORLDVIEWINVERSE","VIEWPROJECTIONINVERSE","WORLDVIEWPROJECTIONINVERSE","WORLDTRANSPOSE","VIEWTRANSPOSE","PROJECTIONTRANSPOSE","WORLDVIEWTRANSPOSE","VIEWPROJECTIONTRANSPOSE","WORLDVIEWPROJECTIONTRANSPOSE","WORLDINVERSETRANSPOSE","VIEWINVERSETRANSPOSE","PROJECTIONINVERSETRANSPOSE","WORLDVIEWINVERSETRANSPOSE","VIEWPROJECTIONINVERSETRANSPOSE","WORLDVIEWPROJECTIONINVERSETRANSPOSE"],ac={vec4:4,vec3:3,vec2:2,float:1},wa={},bs={};function oc(e,t){var r="vertex:"+e+"fragment:"+t;if(wa[r])return wa[r];var i=Ne.genGUID();return wa[r]=i,bs[i]={vertex:e,fragment:t},i}function Es(e){return e.replace(/[ \t]*\/\/.*\n/g,"").replace(/[ \t]*\/\*[\s\S]*?\*\//g,"")}function ti(){console.error("Wrong uniform/attributes syntax")}function Ss(e,t){for(var r=/[,=\(\):]/,i=t.replace(/:\s*\[\s*(.*)\s*\]/g,"="+e+"($1)").replace(/\s+/g,"").split(/(?=[,=\(\):])/g),n=[],a=0;a<i.length;a++)i[a].match(r)?n.push(i[a].charAt(0),i[a].slice(1)):n.push(i[a]);i=n;var o=0,s=1,l=2,f=3,h=4,u=5,d=o,c={},m=null,p;v(i[0]);function v(x){x||ti();var _=x.match(/\[(.*?)\]/);p=x.replace(/\[(.*?)\]/,""),c[p]={},_&&(c[p].isArray=!0,c[p].arraySize=_[1])}for(var a=1;a<i.length;a++){var g=i[a];if(g){if(g==="="){if(d!==o&&d!==f){ti();break}d=s;continue}else if(g===":"){d=h;continue}else if(g===","){if(d===l){if(!(m instanceof Array)){ti();break}m.push(+i[++a])}else d=u;continue}else if(g===")"){c[p].value=new me.Float32Array(m),m=null,d=u;continue}else if(g==="("){if(d!==l){ti();break}if(!(m instanceof Array)){ti();break}m.push(+i[++a]);continue}else if(g.indexOf("vec")>=0){if(d!==s&&d!==h){ti();break}d=l,m=[];continue}else if(d===s){e==="bool"?c[p].value=g==="true":c[p].value=parseFloat(g),m=null;continue}else if(d===h){var y=g;Aa.indexOf(y)>=0||ws.indexOf(y)>=0||As.indexOf(y)>=0?c[p].semantic=y:y==="ignore"||y==="unconfigurable"?c[p].ignore=!0:e==="bool"?c[p].value=y==="true":c[p].value=parseFloat(y);continue}v(g),d=o}}return c}function qe(e,t){typeof e=="object"&&(t=e.fragment,e=e.vertex),e=Es(e),t=Es(t),this._shaderID=oc(e,t),this._vertexCode=qe.parseImport(e),this._fragmentCode=qe.parseImport(t),this.attributeSemantics={},this.matrixSemantics={},this.uniformSemantics={},this.matrixSemanticKeys=[],this.uniformTemplates={},this.attributes={},this.textures={},this.vertexDefines={},this.fragmentDefines={},this._parseAttributes(),this._parseUniforms(),this._parseDefines()}qe.prototype={constructor:qe,createUniforms:function(){var e={};for(var t in this.uniformTemplates){var r=this.uniformTemplates[t];e[t]={type:r.type,value:r.value()}}return e},_parseImport:function(){this._vertexCode=qe.parseImport(this.vertex),this._fragmentCode=qe.parseImport(this.fragment)},_addSemanticUniform:function(e,t,r){if(Aa.indexOf(r)>=0)this.attributeSemantics[r]={symbol:e,type:t};else if(As.indexOf(r)>=0){var i=!1,n=r;r.match(/TRANSPOSE$/)&&(i=!0,n=r.slice(0,-9)),this.matrixSemantics[r]={symbol:e,type:t,isTranspose:i,semanticNoTranspose:n}}else ws.indexOf(r)>=0&&(this.uniformSemantics[r]={symbol:e,type:t})},_addMaterialUniform:function(e,t,r,i,n,a){a[e]={type:r,value:n?Ts.array:i||Ts[t],semantic:null}},_parseUniforms:function(){var e={},t=this,r="vertex";this._uniformList=[],this._vertexCode=this._vertexCode.replace(xs,n),r="fragment",this._fragmentCode=this._fragmentCode.replace(xs,n),t.matrixSemanticKeys=Object.keys(this.matrixSemantics);function i(a){return a!=null?function(){return a}:null}function n(a,o,s){var l=Ss(o,s),f=[];for(var h in l){var u=l[h],d=u.semantic,c=h,m=nc[o],p=i(l[h].value);l[h].isArray&&(c+="["+l[h].arraySize+"]",m+="v"),f.push(c),t._uniformList.push(h),u.ignore||((o==="sampler2D"||o==="samplerCube")&&(t.textures[h]={shaderType:r,type:o}),d?t._addSemanticUniform(h,m,d):t._addMaterialUniform(h,o,m,p,l[h].isArray,e))}return f.length>0?"uniform "+o+" "+f.join(",")+`;
`:""}this.uniformTemplates=e},_parseAttributes:function(){var e={},t=this;this._vertexCode=this._vertexCode.replace(ic,r);function r(i,n,a){var o=Ss(n,a),s=ac[n]||1,l=[];for(var f in o){var h=o[f].semantic;if(e[f]={type:"float",size:s,semantic:h||null},h){if(Aa.indexOf(h)<0)throw new Error('Unkown semantic "'+h+'"');t.attributeSemantics[h]={symbol:f,type:n}}l.push(f)}return"attribute "+n+" "+l.join(",")+`;
`}this.attributes=e},_parseDefines:function(){var e=this,t="vertex";this._vertexCode=this._vertexCode.replace(ys,r),t="fragment",this._fragmentCode=this._fragmentCode.replace(ys,r);function r(i,n,a){var o=t==="vertex"?e.vertexDefines:e.fragmentDefines;return o[n]||(a==="false"?o[n]=!1:a==="true"?o[n]=!0:o[n]=a?isNaN(parseFloat(a))?a.trim():parseFloat(a):null),""}},clone:function(){var e=bs[this._shaderID],t=new qe(e.vertex,e.fragment);return t}};Object.defineProperty&&(Object.defineProperty(qe.prototype,"shaderID",{get:function(){return this._shaderID}}),Object.defineProperty(qe.prototype,"vertex",{get:function(){return this._vertexCode}}),Object.defineProperty(qe.prototype,"fragment",{get:function(){return this._fragmentCode}}),Object.defineProperty(qe.prototype,"uniforms",{get:function(){return this._uniformList}}));var sc=/(@import)\s*([0-9a-zA-Z_\-\.]*)/g;qe.parseImport=function(e){return e=e.replace(sc,function(n,r,i){var n=qe.source(i);return n?qe.parseImport(n):(console.error('Shader chunk "'+i+'" not existed in library'),"")}),e};var lc=/(@export)\s*([0-9a-zA-Z_\-\.]*)\s*\n([\s\S]*?)@end/g;qe.import=function(e){e.replace(lc,function(t,r,i,a){var a=a.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+\x24)/g,"");if(a){for(var o=i.split("."),s=qe.codes,l=0,f;l<o.length-1;)f=o[l++],s[f]||(s[f]={}),s=s[f];f=o[l],s[f]=a}return a})};qe.codes={};qe.source=function(e){for(var t=e.split("."),r=qe.codes,i=0;r&&i<t.length;){var n=t[i++];r=r[n]}return typeof r!="string"?(console.error('Shader "'+e+'" not existed in library'),""):r};var F=qe;var ln=`@export clay.prez.vertex
uniform mat4 WVP : WORLDVIEWPROJECTION;
attribute vec3 pos : POSITION;
attribute vec2 uv : TEXCOORD_0;
uniform vec2 uvRepeat : [1.0, 1.0];
uniform vec2 uvOffset : [0.0, 0.0];
@import clay.chunk.skinning_header
@import clay.chunk.instancing_header
varying vec2 v_Texcoord;
void main()
{
 vec4 P = vec4(pos, 1.0);
#ifdef SKINNING
 @import clay.chunk.skin_matrix
 P = skinMatrixWS * P;
#endif
#ifdef INSTANCING
 @import clay.chunk.instancing_matrix
 P = instanceMat * P;
#endif
 gl_Position = WVP * P;
 v_Texcoord = uv * uvRepeat + uvOffset;
}
@end
@export clay.prez.fragment
uniform sampler2D alphaMap;
uniform float alphaCutoff: 0.0;
varying vec2 v_Texcoord;
void main()
{
 if (alphaCutoff > 0.0) {
 if (texture2D(alphaMap, v_Texcoord).a <= alphaCutoff) {
 discard;
 }
 }
 gl_FragColor = vec4(0.0,0.0,0.0,1.0);
}
@end`;var Se={};Se.create=function(){var e=new Ce(16);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};Se.clone=function(e){var t=new Ce(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t};Se.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e};Se.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};Se.transpose=function(e,t){if(e===t){var r=t[1],i=t[2],n=t[3],a=t[6],o=t[7],s=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=r,e[6]=t[9],e[7]=t[13],e[8]=i,e[9]=a,e[11]=t[14],e[12]=n,e[13]=o,e[14]=s}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e};Se.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],f=t[7],h=t[8],u=t[9],d=t[10],c=t[11],m=t[12],p=t[13],v=t[14],g=t[15],y=r*s-i*o,x=r*l-n*o,_=r*f-a*o,S=i*l-n*s,E=i*f-a*s,b=n*f-a*l,A=h*p-u*m,L=h*v-d*m,P=h*g-c*m,C=u*v-d*p,I=u*g-c*p,B=d*g-c*v,M=y*B-x*I+_*C+S*P-E*L+b*A;return M?(M=1/M,e[0]=(s*B-l*I+f*C)*M,e[1]=(n*I-i*B-a*C)*M,e[2]=(p*b-v*E+g*S)*M,e[3]=(d*E-u*b-c*S)*M,e[4]=(l*P-o*B-f*L)*M,e[5]=(r*B-n*P+a*L)*M,e[6]=(v*_-m*b-g*x)*M,e[7]=(h*b-d*_+c*x)*M,e[8]=(o*I-s*P+f*A)*M,e[9]=(i*P-r*I-a*A)*M,e[10]=(m*E-p*_+g*y)*M,e[11]=(u*_-h*E-c*y)*M,e[12]=(s*L-o*C-l*A)*M,e[13]=(r*C-i*L+n*A)*M,e[14]=(p*x-m*S-v*y)*M,e[15]=(h*S-u*x+d*y)*M,e):null};Se.adjoint=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],f=t[7],h=t[8],u=t[9],d=t[10],c=t[11],m=t[12],p=t[13],v=t[14],g=t[15];return e[0]=s*(d*g-c*v)-u*(l*g-f*v)+p*(l*c-f*d),e[1]=-(i*(d*g-c*v)-u*(n*g-a*v)+p*(n*c-a*d)),e[2]=i*(l*g-f*v)-s*(n*g-a*v)+p*(n*f-a*l),e[3]=-(i*(l*c-f*d)-s*(n*c-a*d)+u*(n*f-a*l)),e[4]=-(o*(d*g-c*v)-h*(l*g-f*v)+m*(l*c-f*d)),e[5]=r*(d*g-c*v)-h*(n*g-a*v)+m*(n*c-a*d),e[6]=-(r*(l*g-f*v)-o*(n*g-a*v)+m*(n*f-a*l)),e[7]=r*(l*c-f*d)-o*(n*c-a*d)+h*(n*f-a*l),e[8]=o*(u*g-c*p)-h*(s*g-f*p)+m*(s*c-f*u),e[9]=-(r*(u*g-c*p)-h*(i*g-a*p)+m*(i*c-a*u)),e[10]=r*(s*g-f*p)-o*(i*g-a*p)+m*(i*f-a*s),e[11]=-(r*(s*c-f*u)-o*(i*c-a*u)+h*(i*f-a*s)),e[12]=-(o*(u*v-d*p)-h*(s*v-l*p)+m*(s*d-l*u)),e[13]=r*(u*v-d*p)-h*(i*v-n*p)+m*(i*d-n*u),e[14]=-(r*(s*v-l*p)-o*(i*v-n*p)+m*(i*l-n*s)),e[15]=r*(s*d-l*u)-o*(i*d-n*u)+h*(i*l-n*s),e};Se.determinant=function(e){var t=e[0],r=e[1],i=e[2],n=e[3],a=e[4],o=e[5],s=e[6],l=e[7],f=e[8],h=e[9],u=e[10],d=e[11],c=e[12],m=e[13],p=e[14],v=e[15],g=t*o-r*a,y=t*s-i*a,x=t*l-n*a,_=r*s-i*o,S=r*l-n*o,E=i*l-n*s,b=f*m-h*c,A=f*p-u*c,L=f*v-d*c,P=h*p-u*m,C=h*v-d*m,I=u*v-d*p;return g*I-y*C+x*P+_*L-S*A+E*b};Se.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],f=t[6],h=t[7],u=t[8],d=t[9],c=t[10],m=t[11],p=t[12],v=t[13],g=t[14],y=t[15],x=r[0],_=r[1],S=r[2],E=r[3];return e[0]=x*i+_*s+S*u+E*p,e[1]=x*n+_*l+S*d+E*v,e[2]=x*a+_*f+S*c+E*g,e[3]=x*o+_*h+S*m+E*y,x=r[4],_=r[5],S=r[6],E=r[7],e[4]=x*i+_*s+S*u+E*p,e[5]=x*n+_*l+S*d+E*v,e[6]=x*a+_*f+S*c+E*g,e[7]=x*o+_*h+S*m+E*y,x=r[8],_=r[9],S=r[10],E=r[11],e[8]=x*i+_*s+S*u+E*p,e[9]=x*n+_*l+S*d+E*v,e[10]=x*a+_*f+S*c+E*g,e[11]=x*o+_*h+S*m+E*y,x=r[12],_=r[13],S=r[14],E=r[15],e[12]=x*i+_*s+S*u+E*p,e[13]=x*n+_*l+S*d+E*v,e[14]=x*a+_*f+S*c+E*g,e[15]=x*o+_*h+S*m+E*y,e};Se.multiplyAffine=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[4],s=t[5],l=t[6],f=t[8],h=t[9],u=t[10],d=t[12],c=t[13],m=t[14],p=r[0],v=r[1],g=r[2];return e[0]=p*i+v*o+g*f,e[1]=p*n+v*s+g*h,e[2]=p*a+v*l+g*u,p=r[4],v=r[5],g=r[6],e[4]=p*i+v*o+g*f,e[5]=p*n+v*s+g*h,e[6]=p*a+v*l+g*u,p=r[8],v=r[9],g=r[10],e[8]=p*i+v*o+g*f,e[9]=p*n+v*s+g*h,e[10]=p*a+v*l+g*u,p=r[12],v=r[13],g=r[14],e[12]=p*i+v*o+g*f+d,e[13]=p*n+v*s+g*h+c,e[14]=p*a+v*l+g*u+m,e};Se.mul=Se.multiply;Se.mulAffine=Se.multiplyAffine;Se.translate=function(e,t,r){var i=r[0],n=r[1],a=r[2],o,s,l,f,h,u,d,c,m,p,v,g;return t===e?(e[12]=t[0]*i+t[4]*n+t[8]*a+t[12],e[13]=t[1]*i+t[5]*n+t[9]*a+t[13],e[14]=t[2]*i+t[6]*n+t[10]*a+t[14],e[15]=t[3]*i+t[7]*n+t[11]*a+t[15]):(o=t[0],s=t[1],l=t[2],f=t[3],h=t[4],u=t[5],d=t[6],c=t[7],m=t[8],p=t[9],v=t[10],g=t[11],e[0]=o,e[1]=s,e[2]=l,e[3]=f,e[4]=h,e[5]=u,e[6]=d,e[7]=c,e[8]=m,e[9]=p,e[10]=v,e[11]=g,e[12]=o*i+h*n+m*a+t[12],e[13]=s*i+u*n+p*a+t[13],e[14]=l*i+d*n+v*a+t[14],e[15]=f*i+c*n+g*a+t[15]),e};Se.scale=function(e,t,r){var i=r[0],n=r[1],a=r[2];return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*a,e[9]=t[9]*a,e[10]=t[10]*a,e[11]=t[11]*a,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e};Se.rotate=function(e,t,r,i){var n=i[0],a=i[1],o=i[2],s=Math.sqrt(n*n+a*a+o*o),l,f,h,u,d,c,m,p,v,g,y,x,_,S,E,b,A,L,P,C,I,B,M,G;return Math.abs(s)<Ci?null:(s=1/s,n*=s,a*=s,o*=s,l=Math.sin(r),f=Math.cos(r),h=1-f,u=t[0],d=t[1],c=t[2],m=t[3],p=t[4],v=t[5],g=t[6],y=t[7],x=t[8],_=t[9],S=t[10],E=t[11],b=n*n*h+f,A=a*n*h+o*l,L=o*n*h-a*l,P=n*a*h-o*l,C=a*a*h+f,I=o*a*h+n*l,B=n*o*h+a*l,M=a*o*h-n*l,G=o*o*h+f,e[0]=u*b+p*A+x*L,e[1]=d*b+v*A+_*L,e[2]=c*b+g*A+S*L,e[3]=m*b+y*A+E*L,e[4]=u*P+p*C+x*I,e[5]=d*P+v*C+_*I,e[6]=c*P+g*C+S*I,e[7]=m*P+y*C+E*I,e[8]=u*B+p*M+x*G,e[9]=d*B+v*M+_*G,e[10]=c*B+g*M+S*G,e[11]=m*B+y*M+E*G,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)};Se.rotateX=function(e,t,r){var i=Math.sin(r),n=Math.cos(r),a=t[4],o=t[5],s=t[6],l=t[7],f=t[8],h=t[9],u=t[10],d=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=a*n+f*i,e[5]=o*n+h*i,e[6]=s*n+u*i,e[7]=l*n+d*i,e[8]=f*n-a*i,e[9]=h*n-o*i,e[10]=u*n-s*i,e[11]=d*n-l*i,e};Se.rotateY=function(e,t,r){var i=Math.sin(r),n=Math.cos(r),a=t[0],o=t[1],s=t[2],l=t[3],f=t[8],h=t[9],u=t[10],d=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*n-f*i,e[1]=o*n-h*i,e[2]=s*n-u*i,e[3]=l*n-d*i,e[8]=a*i+f*n,e[9]=o*i+h*n,e[10]=s*i+u*n,e[11]=l*i+d*n,e};Se.rotateZ=function(e,t,r){var i=Math.sin(r),n=Math.cos(r),a=t[0],o=t[1],s=t[2],l=t[3],f=t[4],h=t[5],u=t[6],d=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*n+f*i,e[1]=o*n+h*i,e[2]=s*n+u*i,e[3]=l*n+d*i,e[4]=f*n-a*i,e[5]=h*n-o*i,e[6]=u*n-s*i,e[7]=d*n-l*i,e};Se.fromRotationTranslation=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=i+i,l=n+n,f=a+a,h=i*s,u=i*l,d=i*f,c=n*l,m=n*f,p=a*f,v=o*s,g=o*l,y=o*f;return e[0]=1-(c+p),e[1]=u+y,e[2]=d-g,e[3]=0,e[4]=u-y,e[5]=1-(h+p),e[6]=m+v,e[7]=0,e[8]=d+g,e[9]=m-v,e[10]=1-(h+c),e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e};Se.fromQuat=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r+r,s=i+i,l=n+n,f=r*o,h=i*o,u=i*s,d=n*o,c=n*s,m=n*l,p=a*o,v=a*s,g=a*l;return e[0]=1-u-m,e[1]=h+g,e[2]=d-v,e[3]=0,e[4]=h-g,e[5]=1-f-m,e[6]=c+p,e[7]=0,e[8]=d+v,e[9]=c-p,e[10]=1-f-u,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};Se.frustum=function(e,t,r,i,n,a,o){var s=1/(r-t),l=1/(n-i),f=1/(a-o);return e[0]=a*2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a*2*l,e[6]=0,e[7]=0,e[8]=(r+t)*s,e[9]=(n+i)*l,e[10]=(o+a)*f,e[11]=-1,e[12]=0,e[13]=0,e[14]=o*a*2*f,e[15]=0,e};Se.perspective=function(e,t,r,i,n){var a=1/Math.tan(t/2),o=1/(i-n);return e[0]=a/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=(n+i)*o,e[11]=-1,e[12]=0,e[13]=0,e[14]=2*n*i*o,e[15]=0,e};Se.ortho=function(e,t,r,i,n,a,o){var s=1/(t-r),l=1/(i-n),f=1/(a-o);return e[0]=-2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*l,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*f,e[11]=0,e[12]=(t+r)*s,e[13]=(n+i)*l,e[14]=(o+a)*f,e[15]=1,e};Se.lookAt=function(e,t,r,i){var n,a,o,s,l,f,h,u,d,c,m=t[0],p=t[1],v=t[2],g=i[0],y=i[1],x=i[2],_=r[0],S=r[1],E=r[2];return Math.abs(m-_)<Ci&&Math.abs(p-S)<Ci&&Math.abs(v-E)<Ci?Se.identity(e):(h=m-_,u=p-S,d=v-E,c=1/Math.sqrt(h*h+u*u+d*d),h*=c,u*=c,d*=c,n=y*d-x*u,a=x*h-g*d,o=g*u-y*h,c=Math.sqrt(n*n+a*a+o*o),c?(c=1/c,n*=c,a*=c,o*=c):(n=0,a=0,o=0),s=u*o-d*a,l=d*n-h*o,f=h*a-u*n,c=Math.sqrt(s*s+l*l+f*f),c?(c=1/c,s*=c,l*=c,f*=c):(s=0,l=0,f=0),e[0]=n,e[1]=s,e[2]=h,e[3]=0,e[4]=a,e[5]=l,e[6]=u,e[7]=0,e[8]=o,e[9]=f,e[10]=d,e[11]=0,e[12]=-(n*m+a*p+o*v),e[13]=-(s*m+l*p+f*v),e[14]=-(h*m+u*p+d*v),e[15]=1,e)};Se.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+Math.pow(e[6],2)+Math.pow(e[7],2)+Math.pow(e[8],2)+Math.pow(e[9],2)+Math.pow(e[10],2)+Math.pow(e[11],2)+Math.pow(e[12],2)+Math.pow(e[13],2)+Math.pow(e[14],2)+Math.pow(e[15],2))};var O=Se;var Q={};Q.create=function(){var e=new Ce(3);return e[0]=0,e[1]=0,e[2]=0,e};Q.clone=function(e){var t=new Ce(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t};Q.fromValues=function(e,t,r){var i=new Ce(3);return i[0]=e,i[1]=t,i[2]=r,i};Q.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e};Q.set=function(e,t,r,i){return e[0]=t,e[1]=r,e[2]=i,e};Q.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e};Q.subtract=function(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e};Q.sub=Q.subtract;Q.multiply=function(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e};Q.mul=Q.multiply;Q.divide=function(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e[2]=t[2]/r[2],e};Q.div=Q.divide;Q.min=function(e,t,r){return e[0]=Math.min(t[0],r[0]),e[1]=Math.min(t[1],r[1]),e[2]=Math.min(t[2],r[2]),e};Q.max=function(e,t,r){return e[0]=Math.max(t[0],r[0]),e[1]=Math.max(t[1],r[1]),e[2]=Math.max(t[2],r[2]),e};Q.scale=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e};Q.scaleAndAdd=function(e,t,r,i){return e[0]=t[0]+r[0]*i,e[1]=t[1]+r[1]*i,e[2]=t[2]+r[2]*i,e};Q.distance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1],n=t[2]-e[2];return Math.sqrt(r*r+i*i+n*n)};Q.dist=Q.distance;Q.squaredDistance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1],n=t[2]-e[2];return r*r+i*i+n*n};Q.sqrDist=Q.squaredDistance;Q.length=function(e){var t=e[0],r=e[1],i=e[2];return Math.sqrt(t*t+r*r+i*i)};Q.len=Q.length;Q.squaredLength=function(e){var t=e[0],r=e[1],i=e[2];return t*t+r*r+i*i};Q.sqrLen=Q.squaredLength;Q.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e};Q.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e};Q.normalize=function(e,t){var r=t[0],i=t[1],n=t[2],a=r*r+i*i+n*n;return a>0&&(a=1/Math.sqrt(a),e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a),e};Q.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]};Q.cross=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=r[0],s=r[1],l=r[2];return e[0]=n*l-a*s,e[1]=a*o-i*l,e[2]=i*s-n*o,e};Q.lerp=function(e,t,r,i){var n=t[0],a=t[1],o=t[2];return e[0]=n+i*(r[0]-n),e[1]=a+i*(r[1]-a),e[2]=o+i*(r[2]-o),e};Q.random=function(e,t){t=t||1;var r=cr()*2*Math.PI,i=cr()*2-1,n=Math.sqrt(1-i*i)*t;return e[0]=Math.cos(r)*n,e[1]=Math.sin(r)*n,e[2]=i*t,e};Q.transformMat4=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=r[3]*i+r[7]*n+r[11]*a+r[15];return o=o||1,e[0]=(r[0]*i+r[4]*n+r[8]*a+r[12])/o,e[1]=(r[1]*i+r[5]*n+r[9]*a+r[13])/o,e[2]=(r[2]*i+r[6]*n+r[10]*a+r[14])/o,e};Q.transformMat3=function(e,t,r){var i=t[0],n=t[1],a=t[2];return e[0]=i*r[0]+n*r[3]+a*r[6],e[1]=i*r[1]+n*r[4]+a*r[7],e[2]=i*r[2]+n*r[5]+a*r[8],e};Q.transformQuat=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=r[0],s=r[1],l=r[2],f=r[3],h=f*i+s*a-l*n,u=f*n+l*i-o*a,d=f*a+o*n-s*i,c=-o*i-s*n-l*a;return e[0]=h*f+c*-o+u*-l-d*-s,e[1]=u*f+c*-s+d*-o-h*-l,e[2]=d*f+c*-l+h*-s-u*-o,e};Q.rotateX=function(e,t,r,i){var n=[],a=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],a[0]=n[0],a[1]=n[1]*Math.cos(i)-n[2]*Math.sin(i),a[2]=n[1]*Math.sin(i)+n[2]*Math.cos(i),e[0]=a[0]+r[0],e[1]=a[1]+r[1],e[2]=a[2]+r[2],e};Q.rotateY=function(e,t,r,i){var n=[],a=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],a[0]=n[2]*Math.sin(i)+n[0]*Math.cos(i),a[1]=n[1],a[2]=n[2]*Math.cos(i)-n[0]*Math.sin(i),e[0]=a[0]+r[0],e[1]=a[1]+r[1],e[2]=a[2]+r[2],e};Q.rotateZ=function(e,t,r,i){var n=[],a=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],a[0]=n[0]*Math.cos(i)-n[1]*Math.sin(i),a[1]=n[0]*Math.sin(i)+n[1]*Math.cos(i),a[2]=n[2],e[0]=a[0]+r[0],e[1]=a[1]+r[1],e[2]=a[2]+r[2],e};Q.forEach=(function(){var e=Q.create();return function(t,r,i,n,a,o){var s,l;for(r||(r=3),i||(i=0),n?l=Math.min(n*r+i,t.length):l=t.length,s=i;s<l;s+=r)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}})();Q.angle=function(e,t){var r=Q.fromValues(e[0],e[1],e[2]),i=Q.fromValues(t[0],t[1],t[2]);Q.normalize(r,r),Q.normalize(i,i);var n=Q.dot(r,i);return n>1?0:Math.acos(n)};var w=Q;F.import(ln);var Pe=O.create,Ls={};function Ds(e){return e.material}function fc(e,t,r){return t.uniforms[r].value}function hc(e,t,r,i){return r!==i}function uc(e){return!0}function Cs(){}var Ms={float:D.FLOAT,byte:D.BYTE,ubyte:D.UNSIGNED_BYTE,short:D.SHORT,ushort:D.UNSIGNED_SHORT};function cc(e,t,r){this.availableAttributes=e,this.availableAttributeSymbols=t,this.indicesBuffer=r,this.vao=null}function dc(e){var t,r;this.bind=function(i){t||(t=me.createCanvas(),t.width=t.height=1,t.getContext("2d"));var n=i.gl,a=!r;a&&(r=n.createTexture()),n.bindTexture(n.TEXTURE_2D,r),a&&n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t)},this.unbind=function(i){i.gl.bindTexture(i.gl.TEXTURE_2D,null)},this.isRenderable=function(){return!0}}var dr=xe.extend(function(){return{canvas:null,_width:100,_height:100,devicePixelRatio:typeof window<"u"&&window.devicePixelRatio||1,clearColor:[0,0,0,0],clearBit:17664,alpha:!0,depth:!0,stencil:!1,antialias:!0,premultipliedAlpha:!0,preserveDrawingBuffer:!1,throwError:!0,gl:null,viewport:{},maxJointNumber:20,__currentFrameBuffer:null,_viewportStack:[],_clearStack:[],_sceneRendering:null}},function(){this.canvas||(this.canvas=me.createCanvas());var e=this.canvas;try{var t={alpha:this.alpha,depth:this.depth,stencil:this.stencil,antialias:this.antialias,premultipliedAlpha:this.premultipliedAlpha,preserveDrawingBuffer:this.preserveDrawingBuffer};if(this.gl=e.getContext("webgl",t)||e.getContext("experimental-webgl",t),!this.gl)throw new Error;this._glinfo=new is(this.gl),this.gl.targetRenderer&&console.error("Already created a renderer"),this.gl.targetRenderer=this,this.resize()}catch(r){throw"Error creating WebGL Context "+r}this._programMgr=new _s(this),this._placeholderTexture=new dc(this)},{resize:function(e,t){var r=this.canvas,i=this.devicePixelRatio;e!=null?(r.style&&(r.style.width=e+"px",r.style.height=t+"px"),r.width=e*i,r.height=t*i,this._width=e,this._height=t):(this._width=r.width/i,this._height=r.height/i),this.setViewport(0,0,this._width,this._height)},getWidth:function(){return this._width},getHeight:function(){return this._height},getViewportAspect:function(){var e=this.viewport;return e.width/e.height},setDevicePixelRatio:function(e){this.devicePixelRatio=e,this.resize(this._width,this._height)},getDevicePixelRatio:function(){return this.devicePixelRatio},getGLExtension:function(e){return this._glinfo.getExtension(e)},getGLParameter:function(e){return this._glinfo.getParameter(e)},setViewport:function(e,t,r,i,n){if(typeof e=="object"){var a=e;e=a.x,t=a.y,r=a.width,i=a.height,n=a.devicePixelRatio}n=n||this.devicePixelRatio,this.gl.viewport(e*n,t*n,r*n,i*n),this.viewport={x:e,y:t,width:r,height:i,devicePixelRatio:n}},saveViewport:function(){this._viewportStack.push(this.viewport)},restoreViewport:function(){this._viewportStack.length>0&&this.setViewport(this._viewportStack.pop())},saveClear:function(){this._clearStack.push({clearBit:this.clearBit,clearColor:this.clearColor})},restoreClear:function(){if(this._clearStack.length>0){var e=this._clearStack.pop();this.clearColor=e.clearColor,this.clearBit=e.clearBit}},bindSceneRendering:function(e){this._sceneRendering=e},render:function(e,t,r,i){var n=this.gl,a=this.clearColor;if(this.clearBit){n.colorMask(!0,!0,!0,!0),n.depthMask(!0);var o=this.viewport,s=!1,l=o.devicePixelRatio;(o.width!==this._width||o.height!==this._height||l&&l!==this.devicePixelRatio||o.x||o.y)&&(s=!0,n.enable(n.SCISSOR_TEST),n.scissor(o.x*l,o.y*l,o.width*l,o.height*l)),n.clearColor(a[0],a[1],a[2],a[3]),n.clear(this.clearBit),s&&n.disable(n.SCISSOR_TEST)}if(r||e.update(!1),e.updateLights(),t=t||e.getMainCamera(),!t){console.error("Can't find camera in the scene.");return}t.update();var f=e.updateRenderList(t,!0);this._sceneRendering=e;var h=f.opaque,u=f.transparent,d=e.material;e.trigger("beforerender",this,e,t,f),i?(this.renderPreZ(h,e,t),n.depthFunc(n.LEQUAL)):n.depthFunc(n.LESS);for(var c=Pe(),m=w.create(),p=0;p<u.length;p++){var v=u[p];O.multiplyAffine(c,t.viewMatrix.array,v.worldTransform.array),w.transformMat4(m,v.position.array,c),v.__depth=m[2]}this.renderPass(h,t,{getMaterial:function(g){return d||g.material},sortCompare:this.opaqueSortCompare}),this.renderPass(u,t,{getMaterial:function(g){return d||g.material},sortCompare:this.transparentSortCompare}),e.trigger("afterrender",this,e,t,f),this._sceneRendering=null},getProgram:function(e,t,r){return t=t||e.material,this._programMgr.getProgram(e,t,r)},validateProgram:function(e){if(e.__error){var t=e.__error;if(Ls[e.__uid__])return;if(Ls[e.__uid__]=!0,this.throwError)throw new Error(t);this.trigger("error",t)}},updatePrograms:function(e,t,r){var i=r&&r.getMaterial||Ds;t=t||null;for(var n=0;n<e.length;n++){var a=e[n],o=i.call(this,a);if(n>0){var s=e[n-1],l=s.joints?s.joints.length:0,f=a.joints?a.joints.length:0;if(f===l&&a.material===s.material&&a.lightGroup===s.lightGroup){a.__program=s.__program;continue}}var h=this._programMgr.getProgram(a,o,t);this.validateProgram(h),a.__program=h}},renderPass:function(e,t,r){this.trigger("beforerenderpass",this,e,t,r),r=r||{},r.getMaterial=r.getMaterial||Ds,r.getUniform=r.getUniform||fc,r.isMaterialChanged=r.isMaterialChanged||hc,r.beforeRender=r.beforeRender||Cs,r.afterRender=r.afterRender||Cs;var i=r.ifRender||uc;this.updatePrograms(e,this._sceneRendering,r),r.sortCompare&&e.sort(r.sortCompare);var n=this.viewport,a=n.devicePixelRatio,o=[n.x*a,n.y*a,n.width*a,n.height*a],s=this.devicePixelRatio,l=this.__currentFrameBuffer?[this.__currentFrameBuffer.getTextureWidth(),this.__currentFrameBuffer.getTextureHeight()]:[this._width*s,this._height*s],f=[o[2],o[3]],h=Date.now();t?(O.copy(Me.VIEW,t.viewMatrix.array),O.copy(Me.PROJECTION,t.projectionMatrix.array),O.copy(Me.VIEWINVERSE,t.worldTransform.array)):(O.identity(Me.VIEW),O.identity(Me.PROJECTION),O.identity(Me.VIEWINVERSE)),O.multiply(Me.VIEWPROJECTION,Me.PROJECTION,Me.VIEW),O.invert(Me.PROJECTIONINVERSE,Me.PROJECTION),O.invert(Me.VIEWPROJECTIONINVERSE,Me.VIEWPROJECTION);for(var u=this.gl,d=this._sceneRendering,c,m,p,v,g,y,x,_,S,E,b,A,L=null,P=0;P<e.length;P++){var C=e[P],I=C.worldTransform!=null,B;if(i(C)){I&&(B=C.isSkinnedMesh&&C.isSkinnedMesh()?C.offsetMatrix?C.offsetMatrix.array:Me.IDENTITY:C.worldTransform.array);var M=C.geometry,G=r.getMaterial.call(this,C),k=C.__program,Y=G.shader,U=M.__uid__+"-"+k.__uid__,ue=U!==E;E=U,ue&&L&&L.bindVertexArrayOES(null),I&&(O.copy(Me.WORLD,B),O.multiply(Me.WORLDVIEWPROJECTION,Me.VIEWPROJECTION,B),O.multiplyAffine(Me.WORLDVIEW,Me.VIEW,B),(Y.matrixSemantics.WORLDINVERSE||Y.matrixSemantics.WORLDINVERSETRANSPOSE)&&O.invert(Me.WORLDINVERSE,B),(Y.matrixSemantics.WORLDVIEWINVERSE||Y.matrixSemantics.WORLDVIEWINVERSETRANSPOSE)&&O.invert(Me.WORLDVIEWINVERSE,Me.WORLDVIEW),(Y.matrixSemantics.WORLDVIEWPROJECTIONINVERSE||Y.matrixSemantics.WORLDVIEWPROJECTIONINVERSETRANSPOSE)&&O.invert(Me.WORLDVIEWPROJECTIONINVERSE,Me.WORLDVIEWPROJECTION)),C.beforeRender&&C.beforeRender(this),r.beforeRender.call(this,C,G,c);var X=k!==m;X?(k.bind(this),k.setUniformOfSemantic(u,"VIEWPORT",o),k.setUniformOfSemantic(u,"WINDOW_SIZE",l),t&&(k.setUniformOfSemantic(u,"NEAR",t.near),k.setUniformOfSemantic(u,"FAR",t.far)),k.setUniformOfSemantic(u,"DEVICEPIXELRATIO",a),k.setUniformOfSemantic(u,"TIME",h),k.setUniformOfSemantic(u,"VIEWPORT_SIZE",f),d&&d.setLightUniforms(k,C.lightGroup,this)):k=m,(X||r.isMaterialChanged(C,p,G,c))&&(G.depthTest!==v&&(G.depthTest?u.enable(u.DEPTH_TEST):u.disable(u.DEPTH_TEST),v=G.depthTest),G.depthMask!==g&&(u.depthMask(G.depthMask),g=G.depthMask),G.transparent!==S&&(G.transparent?u.enable(u.BLEND):u.disable(u.BLEND),S=G.transparent),G.transparent&&(G.blend?G.blend(u):(u.blendEquationSeparate(u.FUNC_ADD,u.FUNC_ADD),u.blendFuncSeparate(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA,u.ONE,u.ONE_MINUS_SRC_ALPHA))),A=this._bindMaterial(C,G,k,p||null,c||null,m||null,r.getUniform),c=G);var _e=Y.matrixSemanticKeys;if(I)for(var ce=0;ce<_e.length;ce++){var be=_e[ce],Le=Y.matrixSemantics[be],oe=Me[be];if(Le.isTranspose){var je=Me[Le.semanticNoTranspose];O.transpose(oe,je)}k.setUniform(u,Le.type,Le.symbol,oe)}C.cullFace!==x&&(x=C.cullFace,u.cullFace(x)),C.frontFace!==_&&(_=C.frontFace,u.frontFace(_)),C.culling!==y&&(y=C.culling,y?u.enable(u.CULL_FACE):u.disable(u.CULL_FACE)),this._updateSkeleton(C,k,A),ue&&(b=this._bindVAO(L,Y,M,k)),this._renderObject(C,b,k),r.afterRender(this,C),C.afterRender&&C.afterRender(this),m=k,p=C}}L&&L.bindVertexArrayOES(null),this.trigger("afterrenderpass",this,e,t,r)},getMaxJointNumber:function(){return this.maxJointNumber},_updateSkeleton:function(e,t,r){var i=this.gl,n=e.skeleton;if(n)if(n.update(),e.joints.length>this.getMaxJointNumber()){var a=n.getSubSkinMatricesTexture(e.__uid__,e.joints);t.useTextureSlot(this,a,r),t.setUniform(i,"1i","skinMatricesTexture",r),t.setUniform(i,"1f","skinMatricesTextureSize",a.width)}else{var o=n.getSubSkinMatrices(e.__uid__,e.joints);t.setUniformOfSemantic(i,"SKIN_MATRIX",o)}},_renderObject:function(e,t,r){var i=this.gl,n=e.geometry,a=e.mode;a==null&&(a=4);var o=null,s=e.isInstancedMesh&&e.isInstancedMesh();if(s&&(o=this.getGLExtension("ANGLE_instanced_arrays"),!o)){console.warn("Device not support ANGLE_instanced_arrays extension");return}var l;if(s&&(l=this._bindInstancedAttributes(e,r,o)),t.indicesBuffer){var f=this.getGLExtension("OES_element_index_uint"),h=f&&n.indices instanceof Uint32Array,u=h?i.UNSIGNED_INT:i.UNSIGNED_SHORT;s?o.drawElementsInstancedANGLE(a,t.indicesBuffer.count,u,0,e.getInstanceCount()):i.drawElements(a,t.indicesBuffer.count,u,0)}else s?o.drawArraysInstancedANGLE(a,0,n.vertexCount,e.getInstanceCount()):i.drawArrays(a,0,n.vertexCount);if(s)for(var d=0;d<l.length;d++)i.disableVertexAttribArray(l[d])},_bindInstancedAttributes:function(e,t,r){for(var i=this.gl,n=e.getInstancedAttributesBuffers(this),a=[],o=0;o<n.length;o++){var s=n[o],l=t.getAttribLocation(i,s.symbol);if(!(l<0)){var f=Ms[s.type]||i.FLOAT;i.enableVertexAttribArray(l),i.bindBuffer(i.ARRAY_BUFFER,s.buffer),i.vertexAttribPointer(l,s.size,f,!1,0,0),r.vertexAttribDivisorANGLE(l,s.divisor),a.push(l)}}return a},_bindMaterial:function(e,t,r,i,n,a,o){for(var s=this.gl,l=a===r,f=r.currentTextureSlot(),h=t.getEnabledUniforms(),u=t.getTextureUniforms(),d=this._placeholderTexture,c=0;c<u.length;c++){var m=u[c],p=o(e,t,m),v=t.uniforms[m].type;if(v==="t"&&p)p.__slot=-1;else if(v==="tv")for(var g=0;g<p.length;g++)p[g]&&(p[g].__slot=-1)}d.__slot=-1;for(var c=0;c<h.length;c++){var m=h[c],y=t.uniforms[m],p=o(e,t,m),v=y.type,x=v==="t";if(x&&(!p||!p.isRenderable())&&(p=d),n&&l){var _=o(i,n,m);if(x&&(!_||!_.isRenderable())&&(_=d),_===p){if(x)r.takeCurrentTextureSlot(this,null);else if(v==="tv"&&p)for(var g=0;g<p.length;g++)r.takeCurrentTextureSlot(this,null);continue}}if(p!=null)if(x)if(p.__slot<0){var S=r.currentTextureSlot(),E=r.setUniform(s,"1i",m,S);E&&(r.takeCurrentTextureSlot(this,p),p.__slot=S)}else r.setUniform(s,"1i",m,p.__slot);else if(Array.isArray(p)){if(p.length===0)continue;if(v==="tv"){if(!r.hasUniform(m))continue;for(var b=[],g=0;g<p.length;g++){var A=p[g];if(A.__slot<0){var S=r.currentTextureSlot();b.push(S),r.takeCurrentTextureSlot(this,A),A.__slot=S}else b.push(A.__slot)}r.setUniform(s,"1iv",m,b)}else r.setUniform(s,y.type,m,p)}else r.setUniform(s,y.type,m,p)}var L=r.currentTextureSlot();return r.resetTextureSlot(f),L},_bindVAO:function(e,t,r,i){var n=!r.dynamic,a=this.gl,o=this.__uid__+"-"+i.__uid__,s=r.__vaoCache[o];if(!s){var l=r.getBufferChunks(this);if(!l||!l.length)return;for(var f=l[0],h=f.attributeBuffers,_=f.indicesBuffer,x=[],u=[],d=0;d<h.length;d++){var c=h[d],m=c.name,p=c.semantic,v;if(p){var g=t.attributeSemantics[p];v=g&&g.symbol}else v=m;v&&i.attributes[v]&&(x.push(c),u.push(v))}s=new cc(x,u,_),n&&(r.__vaoCache[o]=s)}var y=!0;e&&n&&(s.vao==null?s.vao=e.createVertexArrayOES():y=!1,e.bindVertexArrayOES(s.vao));var x=s.availableAttributes,_=s.indicesBuffer;if(y){for(var S=i.enableAttributes(this,s.availableAttributeSymbols,e&&n&&s),d=0;d<x.length;d++){var E=S[d];if(E!==-1){var c=x[d],b=c.buffer,A=c.size,L=Ms[c.type]||a.FLOAT;a.bindBuffer(a.ARRAY_BUFFER,b),a.vertexAttribPointer(E,A,L,!1,0,0)}}r.isUseIndices()&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,_.buffer)}return s},renderPreZ:function(e,t,r){var i=this.gl,n=this._prezMaterial||new Ye({shader:new F(F.source("clay.prez.vertex"),F.source("clay.prez.fragment"))});this._prezMaterial=n,i.colorMask(!1,!1,!1,!1),i.depthMask(!0),this.renderPass(e,r,{ifRender:function(a){return!a.ignorePreZ},isMaterialChanged:function(a,o){var s=a.material,l=o.material;return s.get("diffuseMap")!==l.get("diffuseMap")||(s.get("alphaCutoff")||0)!==(l.get("alphaCutoff")||0)},getUniform:function(a,o,s){if(s==="alphaMap")return a.material.get("diffuseMap");if(s==="alphaCutoff"){if(a.material.isDefined("fragment","ALPHA_TEST")&&a.material.get("diffuseMap")){var l=a.material.get("alphaCutoff");return l||0}return 0}else return s==="uvRepeat"?a.material.get("uvRepeat"):s==="uvOffset"?a.material.get("uvOffset"):o.get(s)},getMaterial:function(){return n},sort:this.opaqueSortCompare}),i.colorMask(!0,!0,!0,!0),i.depthMask(!0)},disposeScene:function(e){this.disposeNode(e,!0,!0),e.dispose()},disposeNode:function(e,t,r){e.getParent()&&e.getParent().remove(e);var i={};e.traverse(function(n){var a=n.material;if(n.geometry&&t&&n.geometry.dispose(this),r&&a&&!i[a.__uid__]){for(var o=a.getTextureUniforms(),s=0;s<o.length;s++){var l=o[s],f=a.uniforms[l].value,h=a.uniforms[l].type;if(f){if(h==="t")f.dispose&&f.dispose(this);else if(h==="tv")for(var u=0;u<f.length;u++)f[u]&&f[u].dispose&&f[u].dispose(this)}}i[a.__uid__]=!0}n.dispose&&n.dispose(this)},this)},disposeGeometry:function(e){e.dispose(this)},disposeTexture:function(e){e.dispose(this)},disposeFrameBuffer:function(e){e.dispose(this)},dispose:function(){},screenToNDC:function(e,t,r){r||(r=new nt),t=this._height-t;var i=this.viewport,n=r.array;return n[0]=(e-i.x)/i.width,n[0]=n[0]*2-1,n[1]=(t-i.y)/i.height,n[1]=n[1]*2-1,r}});dr.opaqueSortCompare=dr.prototype.opaqueSortCompare=function(e,t){return e.renderOrder===t.renderOrder?e.__program===t.__program?e.material===t.material?e.geometry.__uid__-t.geometry.__uid__:e.material.__uid__-t.material.__uid__:e.__program&&t.__program?e.__program.__uid__-t.__program.__uid__:0:e.renderOrder-t.renderOrder};dr.transparentSortCompare=dr.prototype.transparentSortCompare=function(e,t){return e.renderOrder===t.renderOrder?e.__depth===t.__depth?e.__program===t.__program?e.material===t.material?e.geometry.__uid__-t.geometry.__uid__:e.material.__uid__-t.material.__uid__:e.__program&&t.__program?e.__program.__uid__-t.__program.__uid__:0:e.__depth-t.__depth:e.renderOrder-t.renderOrder};var Me={IDENTITY:Pe(),WORLD:Pe(),VIEW:Pe(),PROJECTION:Pe(),WORLDVIEW:Pe(),VIEWPROJECTION:Pe(),WORLDVIEWPROJECTION:Pe(),WORLDINVERSE:Pe(),VIEWINVERSE:Pe(),PROJECTIONINVERSE:Pe(),WORLDVIEWINVERSE:Pe(),VIEWPROJECTIONINVERSE:Pe(),WORLDVIEWPROJECTIONINVERSE:Pe(),WORLDTRANSPOSE:Pe(),VIEWTRANSPOSE:Pe(),PROJECTIONTRANSPOSE:Pe(),WORLDVIEWTRANSPOSE:Pe(),VIEWPROJECTIONTRANSPOSE:Pe(),WORLDVIEWPROJECTIONTRANSPOSE:Pe(),WORLDINVERSETRANSPOSE:Pe(),VIEWINVERSETRANSPOSE:Pe(),PROJECTIONINVERSETRANSPOSE:Pe(),WORLDVIEWINVERSETRANSPOSE:Pe(),VIEWPROJECTIONINVERSETRANSPOSE:Pe(),WORLDVIEWPROJECTIONINVERSETRANSPOSE:Pe()};dr.COLOR_BUFFER_BIT=D.COLOR_BUFFER_BIT;dr.DEPTH_BUFFER_BIT=D.DEPTH_BUFFER_BIT;dr.STENCIL_BUFFER_BIT=D.STENCIL_BUFFER_BIT;var mr=dr;var J=function(e,t,r){e=e||0,t=t||0,r=r||0,this.array=w.fromValues(e,t,r),this._dirty=!0};J.prototype={constructor:J,add:function(e){return w.add(this.array,this.array,e.array),this._dirty=!0,this},set:function(e,t,r){return this.array[0]=e,this.array[1]=t,this.array[2]=r,this._dirty=!0,this},setArray:function(e){return this.array[0]=e[0],this.array[1]=e[1],this.array[2]=e[2],this._dirty=!0,this},clone:function(){return new J(this.x,this.y,this.z)},copy:function(e){return w.copy(this.array,e.array),this._dirty=!0,this},cross:function(e,t){return w.cross(this.array,e.array,t.array),this._dirty=!0,this},dist:function(e){return w.dist(this.array,e.array)},distance:function(e){return w.distance(this.array,e.array)},div:function(e){return w.div(this.array,this.array,e.array),this._dirty=!0,this},divide:function(e){return w.divide(this.array,this.array,e.array),this._dirty=!0,this},dot:function(e){return w.dot(this.array,e.array)},len:function(){return w.len(this.array)},length:function(){return w.length(this.array)},lerp:function(e,t,r){return w.lerp(this.array,e.array,t.array,r),this._dirty=!0,this},min:function(e){return w.min(this.array,this.array,e.array),this._dirty=!0,this},max:function(e){return w.max(this.array,this.array,e.array),this._dirty=!0,this},mul:function(e){return w.mul(this.array,this.array,e.array),this._dirty=!0,this},multiply:function(e){return w.multiply(this.array,this.array,e.array),this._dirty=!0,this},negate:function(){return w.negate(this.array,this.array),this._dirty=!0,this},normalize:function(){return w.normalize(this.array,this.array),this._dirty=!0,this},random:function(e){return w.random(this.array,e),this._dirty=!0,this},scale:function(e){return w.scale(this.array,this.array,e),this._dirty=!0,this},scaleAndAdd:function(e,t){return w.scaleAndAdd(this.array,this.array,e.array,t),this._dirty=!0,this},sqrDist:function(e){return w.sqrDist(this.array,e.array)},squaredDistance:function(e){return w.squaredDistance(this.array,e.array)},sqrLen:function(){return w.sqrLen(this.array)},squaredLength:function(){return w.squaredLength(this.array)},sub:function(e){return w.sub(this.array,this.array,e.array),this._dirty=!0,this},subtract:function(e){return w.subtract(this.array,this.array,e.array),this._dirty=!0,this},transformMat3:function(e){return w.transformMat3(this.array,this.array,e.array),this._dirty=!0,this},transformMat4:function(e){return w.transformMat4(this.array,this.array,e.array),this._dirty=!0,this},transformQuat:function(e){return w.transformQuat(this.array,this.array,e.array),this._dirty=!0,this},applyProjection:function(e){var t=this.array;if(e=e.array,e[15]===0){var r=-1/t[2];t[0]=e[0]*t[0]*r,t[1]=e[5]*t[1]*r,t[2]=(e[10]*t[2]+e[14])*r}else t[0]=e[0]*t[0]+e[12],t[1]=e[5]*t[1]+e[13],t[2]=e[10]*t[2]+e[14];return this._dirty=!0,this},eulerFromQuat:function(e,t){J.eulerFromQuat(this,e,t)},eulerFromMat3:function(e,t){J.eulerFromMat3(this,e,t)},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};var fn=Object.defineProperty;fn&&(hn=J.prototype,fn(hn,"x",{get:function(){return this.array[0]},set:function(e){this.array[0]=e,this._dirty=!0}}),fn(hn,"y",{get:function(){return this.array[1]},set:function(e){this.array[1]=e,this._dirty=!0}}),fn(hn,"z",{get:function(){return this.array[2]},set:function(e){this.array[2]=e,this._dirty=!0}}));var hn;J.add=function(e,t,r){return w.add(e.array,t.array,r.array),e._dirty=!0,e};J.set=function(e,t,r,i){w.set(e.array,t,r,i),e._dirty=!0};J.copy=function(e,t){return w.copy(e.array,t.array),e._dirty=!0,e};J.cross=function(e,t,r){return w.cross(e.array,t.array,r.array),e._dirty=!0,e};J.dist=function(e,t){return w.distance(e.array,t.array)};J.distance=J.dist;J.div=function(e,t,r){return w.divide(e.array,t.array,r.array),e._dirty=!0,e};J.divide=J.div;J.dot=function(e,t){return w.dot(e.array,t.array)};J.len=function(e){return w.length(e.array)};J.lerp=function(e,t,r,i){return w.lerp(e.array,t.array,r.array,i),e._dirty=!0,e};J.min=function(e,t,r){return w.min(e.array,t.array,r.array),e._dirty=!0,e};J.max=function(e,t,r){return w.max(e.array,t.array,r.array),e._dirty=!0,e};J.mul=function(e,t,r){return w.multiply(e.array,t.array,r.array),e._dirty=!0,e};J.multiply=J.mul;J.negate=function(e,t){return w.negate(e.array,t.array),e._dirty=!0,e};J.normalize=function(e,t){return w.normalize(e.array,t.array),e._dirty=!0,e};J.random=function(e,t){return w.random(e.array,t),e._dirty=!0,e};J.scale=function(e,t,r){return w.scale(e.array,t.array,r),e._dirty=!0,e};J.scaleAndAdd=function(e,t,r,i){return w.scaleAndAdd(e.array,t.array,r.array,i),e._dirty=!0,e};J.sqrDist=function(e,t){return w.sqrDist(e.array,t.array)};J.squaredDistance=J.sqrDist;J.sqrLen=function(e){return w.sqrLen(e.array)};J.squaredLength=J.sqrLen;J.sub=function(e,t,r){return w.subtract(e.array,t.array,r.array),e._dirty=!0,e};J.subtract=J.sub;J.transformMat3=function(e,t,r){return w.transformMat3(e.array,t.array,r.array),e._dirty=!0,e};J.transformMat4=function(e,t,r){return w.transformMat4(e.array,t.array,r.array),e._dirty=!0,e};J.transformQuat=function(e,t,r){return w.transformQuat(e.array,t.array,r.array),e._dirty=!0,e};function Mt(e,t,r){return e<t?t:e>r?r:e}var ye=Math.atan2,Pt=Math.asin,ri=Math.abs;J.eulerFromQuat=function(e,t,d){e._dirty=!0,t=t.array;var i=e.array,n=t[0],a=t[1],o=t[2],s=t[3],l=n*n,f=a*a,h=o*o,u=s*s,d=(d||"XYZ").toUpperCase();switch(d){case"XYZ":i[0]=ye(2*(n*s-a*o),u-l-f+h),i[1]=Pt(Mt(2*(n*o+a*s),-1,1)),i[2]=ye(2*(o*s-n*a),u+l-f-h);break;case"YXZ":i[0]=Pt(Mt(2*(n*s-a*o),-1,1)),i[1]=ye(2*(n*o+a*s),u-l-f+h),i[2]=ye(2*(n*a+o*s),u-l+f-h);break;case"ZXY":i[0]=Pt(Mt(2*(n*s+a*o),-1,1)),i[1]=ye(2*(a*s-o*n),u-l-f+h),i[2]=ye(2*(o*s-n*a),u-l+f-h);break;case"ZYX":i[0]=ye(2*(n*s+o*a),u-l-f+h),i[1]=Pt(Mt(2*(a*s-n*o),-1,1)),i[2]=ye(2*(n*a+o*s),u+l-f-h);break;case"YZX":i[0]=ye(2*(n*s-o*a),u-l+f-h),i[1]=ye(2*(a*s-n*o),u+l-f-h),i[2]=Pt(Mt(2*(n*a+o*s),-1,1));break;case"XZY":i[0]=ye(2*(n*s+a*o),u-l+f-h),i[1]=ye(2*(n*o+a*s),u+l-f-h),i[2]=Pt(Mt(2*(o*s-n*a),-1,1));break;default:console.warn("Unkown order: "+d)}return e};J.eulerFromMat3=function(e,t,m){var i=t.array,n=i[0],a=i[3],o=i[6],s=i[1],l=i[4],f=i[7],h=i[2],u=i[5],d=i[8],c=e.array,m=(m||"XYZ").toUpperCase();switch(m){case"XYZ":c[1]=Pt(Mt(o,-1,1)),ri(o)<.99999?(c[0]=ye(-f,d),c[2]=ye(-a,n)):(c[0]=ye(u,l),c[2]=0);break;case"YXZ":c[0]=Pt(-Mt(f,-1,1)),ri(f)<.99999?(c[1]=ye(o,d),c[2]=ye(s,l)):(c[1]=ye(-h,n),c[2]=0);break;case"ZXY":c[0]=Pt(Mt(u,-1,1)),ri(u)<.99999?(c[1]=ye(-h,d),c[2]=ye(-a,l)):(c[1]=0,c[2]=ye(s,n));break;case"ZYX":c[1]=Pt(-Mt(h,-1,1)),ri(h)<.99999?(c[0]=ye(u,d),c[2]=ye(s,n)):(c[0]=0,c[2]=ye(-a,l));break;case"YZX":c[2]=Pt(Mt(s,-1,1)),ri(s)<.99999?(c[0]=ye(-f,l),c[1]=ye(-h,n)):(c[0]=0,c[1]=ye(o,d));break;case"XZY":c[2]=Pt(-Mt(a,-1,1)),ri(a)<.99999?(c[0]=ye(u,l),c[1]=ye(o,n)):(c[0]=ye(-f,d),c[1]=0);break;default:console.warn("Unkown order: "+m)}return e._dirty=!0,e};Object.defineProperties(J,{POSITIVE_X:{get:function(){return new J(1,0,0)}},NEGATIVE_X:{get:function(){return new J(-1,0,0)}},POSITIVE_Y:{get:function(){return new J(0,1,0)}},NEGATIVE_Y:{get:function(){return new J(0,-1,0)}},POSITIVE_Z:{get:function(){return new J(0,0,1)}},NEGATIVE_Z:{get:function(){return new J(0,0,-1)}},UP:{get:function(){return new J(0,1,0)}},ZERO:{get:function(){return new J}}});var R=J;var ba=1e-5,un=function(e,t){this.origin=e||new R,this.direction=t||new R};un.prototype={constructor:un,intersectPlane:function(e,t){var r=e.normal.array,i=e.distance,n=this.origin.array,a=this.direction.array,o=w.dot(r,a);if(o===0)return null;t||(t=new R);var s=(w.dot(r,n)-i)/o;return w.scaleAndAdd(t.array,n,a,-s),t._dirty=!0,t},mirrorAgainstPlane:function(e){var t=w.dot(e.normal.array,this.direction.array);w.scaleAndAdd(this.direction.array,this.direction.array,e.normal.array,-t*2),this.direction._dirty=!0},distanceToPoint:(function(){var e=w.create();return function(t){w.sub(e,t,this.origin.array);var r=w.dot(e,this.direction.array);if(r<0)return w.distance(this.origin.array,t);var i=w.lenSquared(e);return Math.sqrt(i-r*r)}})(),intersectSphere:(function(){var e=w.create();return function(t,r,i){var n=this.origin.array,a=this.direction.array;t=t.array,w.sub(e,t,n);var o=w.dot(e,a),s=w.squaredLength(e),l=s-o*o,f=r*r;if(!(l>f)){var h=Math.sqrt(f-l),u=o-h,d=o+h;return i||(i=new R),u<0?d<0?null:(w.scaleAndAdd(i.array,n,a,d),i):(w.scaleAndAdd(i.array,n,a,u),i)}}})(),intersectBoundingBox:function(e,t){var r=this.direction.array,i=this.origin.array,n=e.min.array,a=e.max.array,o=1/r[0],s=1/r[1],l=1/r[2],f,h,u,d,c,m;if(o>=0?(f=(n[0]-i[0])*o,h=(a[0]-i[0])*o):(h=(n[0]-i[0])*o,f=(a[0]-i[0])*o),s>=0?(u=(n[1]-i[1])*s,d=(a[1]-i[1])*s):(d=(n[1]-i[1])*s,u=(a[1]-i[1])*s),f>d||u>h||((u>f||f!==f)&&(f=u),(d<h||h!==h)&&(h=d),l>=0?(c=(n[2]-i[2])*l,m=(a[2]-i[2])*l):(m=(n[2]-i[2])*l,c=(a[2]-i[2])*l),f>m||c>h)||((c>f||f!==f)&&(f=c),(m<h||h!==h)&&(h=m),h<0))return null;var p=f>=0?f:h;return t||(t=new R),w.scaleAndAdd(t.array,i,r,p),t},intersectTriangle:(function(){var e=w.create(),t=w.create(),r=w.create(),i=w.create();return function(n,a,o,s,l,f){var h=this.direction.array,u=this.origin.array;n=n.array,a=a.array,o=o.array,w.sub(e,a,n),w.sub(t,o,n),w.cross(i,t,h);var d=w.dot(e,i);if(s){if(d>-ba)return null}else if(d>-ba&&d<ba)return null;w.sub(r,u,n);var c=w.dot(i,r)/d;if(c<0||c>1)return null;w.cross(i,e,r);var m=w.dot(h,i)/d;if(m<0||m>1||c+m>1)return null;w.cross(i,e,t);var p=-w.dot(r,i)/d;return p<0?null:(l||(l=new R),f&&R.set(f,1-c-m,c,m),w.scaleAndAdd(l.array,u,h,p),l)}})(),applyTransform:function(e){R.add(this.direction,this.direction,this.origin),R.transformMat4(this.origin,this.origin,e),R.transformMat4(this.direction,this.direction,e),R.sub(this.direction,this.direction,this.origin),R.normalize(this.direction,this.direction)},copy:function(e){R.copy(this.origin,e.origin),R.copy(this.direction,e.direction)},clone:function(){var e=new un;return e.copy(this),e}};var Or=un;var re={};re.create=function(){var e=new Ce(4);return e[0]=0,e[1]=0,e[2]=0,e[3]=0,e};re.clone=function(e){var t=new Ce(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t};re.fromValues=function(e,t,r,i){var n=new Ce(4);return n[0]=e,n[1]=t,n[2]=r,n[3]=i,n};re.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e};re.set=function(e,t,r,i,n){return e[0]=t,e[1]=r,e[2]=i,e[3]=n,e};re.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e};re.subtract=function(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e};re.sub=re.subtract;re.multiply=function(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e[3]=t[3]*r[3],e};re.mul=re.multiply;re.divide=function(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e[2]=t[2]/r[2],e[3]=t[3]/r[3],e};re.div=re.divide;re.min=function(e,t,r){return e[0]=Math.min(t[0],r[0]),e[1]=Math.min(t[1],r[1]),e[2]=Math.min(t[2],r[2]),e[3]=Math.min(t[3],r[3]),e};re.max=function(e,t,r){return e[0]=Math.max(t[0],r[0]),e[1]=Math.max(t[1],r[1]),e[2]=Math.max(t[2],r[2]),e[3]=Math.max(t[3],r[3]),e};re.scale=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e};re.scaleAndAdd=function(e,t,r,i){return e[0]=t[0]+r[0]*i,e[1]=t[1]+r[1]*i,e[2]=t[2]+r[2]*i,e[3]=t[3]+r[3]*i,e};re.distance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1],n=t[2]-e[2],a=t[3]-e[3];return Math.sqrt(r*r+i*i+n*n+a*a)};re.dist=re.distance;re.squaredDistance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1],n=t[2]-e[2],a=t[3]-e[3];return r*r+i*i+n*n+a*a};re.sqrDist=re.squaredDistance;re.length=function(e){var t=e[0],r=e[1],i=e[2],n=e[3];return Math.sqrt(t*t+r*r+i*i+n*n)};re.len=re.length;re.squaredLength=function(e){var t=e[0],r=e[1],i=e[2],n=e[3];return t*t+r*r+i*i+n*n};re.sqrLen=re.squaredLength;re.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e};re.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e[3]=1/t[3],e};re.normalize=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r*r+i*i+n*n+a*a;return o>0&&(o=1/Math.sqrt(o),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e[3]=t[3]*o),e};re.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]};re.lerp=function(e,t,r,i){var n=t[0],a=t[1],o=t[2],s=t[3];return e[0]=n+i*(r[0]-n),e[1]=a+i*(r[1]-a),e[2]=o+i*(r[2]-o),e[3]=s+i*(r[3]-s),e};re.random=function(e,t){return t=t||1,e[0]=cr(),e[1]=cr(),e[2]=cr(),e[3]=cr(),re.normalize(e,e),re.scale(e,e,t),e};re.transformMat4=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3];return e[0]=r[0]*i+r[4]*n+r[8]*a+r[12]*o,e[1]=r[1]*i+r[5]*n+r[9]*a+r[13]*o,e[2]=r[2]*i+r[6]*n+r[10]*a+r[14]*o,e[3]=r[3]*i+r[7]*n+r[11]*a+r[15]*o,e};re.transformQuat=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=r[0],s=r[1],l=r[2],f=r[3],h=f*i+s*a-l*n,u=f*n+l*i-o*a,d=f*a+o*n-s*i,c=-o*i-s*n-l*a;return e[0]=h*f+c*-o+u*-l-d*-s,e[1]=u*f+c*-s+d*-o-h*-l,e[2]=d*f+c*-l+h*-s-u*-o,e};re.forEach=(function(){var e=re.create();return function(t,r,i,n,a,o){var s,l;for(r||(r=4),i||(i=0),n?l=Math.min(n*r+i,t.length):l=t.length,s=i;s<l;s+=r)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}})();var z=re;var Ke={};Ke.create=function(){var e=new Ce(9);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e};Ke.fromMat4=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e};Ke.clone=function(e){var t=new Ce(9);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t};Ke.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e};Ke.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e};Ke.transpose=function(e,t){if(e===t){var r=t[1],i=t[2],n=t[5];e[1]=t[3],e[2]=t[6],e[3]=r,e[5]=t[7],e[6]=i,e[7]=n}else e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8];return e};Ke.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],f=t[7],h=t[8],u=h*o-s*f,d=-h*a+s*l,c=f*a-o*l,m=r*u+i*d+n*c;return m?(m=1/m,e[0]=u*m,e[1]=(-h*i+n*f)*m,e[2]=(s*i-n*o)*m,e[3]=d*m,e[4]=(h*r-n*l)*m,e[5]=(-s*r+n*a)*m,e[6]=c*m,e[7]=(-f*r+i*l)*m,e[8]=(o*r-i*a)*m,e):null};Ke.adjoint=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],f=t[7],h=t[8];return e[0]=o*h-s*f,e[1]=n*f-i*h,e[2]=i*s-n*o,e[3]=s*l-a*h,e[4]=r*h-n*l,e[5]=n*a-r*s,e[6]=a*f-o*l,e[7]=i*l-r*f,e[8]=r*o-i*a,e};Ke.determinant=function(e){var t=e[0],r=e[1],i=e[2],n=e[3],a=e[4],o=e[5],s=e[6],l=e[7],f=e[8];return t*(f*a-o*l)+r*(-f*n+o*s)+i*(l*n-a*s)};Ke.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],f=t[6],h=t[7],u=t[8],d=r[0],c=r[1],m=r[2],p=r[3],v=r[4],g=r[5],y=r[6],x=r[7],_=r[8];return e[0]=d*i+c*o+m*f,e[1]=d*n+c*s+m*h,e[2]=d*a+c*l+m*u,e[3]=p*i+v*o+g*f,e[4]=p*n+v*s+g*h,e[5]=p*a+v*l+g*u,e[6]=y*i+x*o+_*f,e[7]=y*n+x*s+_*h,e[8]=y*a+x*l+_*u,e};Ke.mul=Ke.multiply;Ke.translate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],f=t[6],h=t[7],u=t[8],d=r[0],c=r[1];return e[0]=i,e[1]=n,e[2]=a,e[3]=o,e[4]=s,e[5]=l,e[6]=d*i+c*o+f,e[7]=d*n+c*s+h,e[8]=d*a+c*l+u,e};Ke.rotate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],f=t[6],h=t[7],u=t[8],d=Math.sin(r),c=Math.cos(r);return e[0]=c*i+d*o,e[1]=c*n+d*s,e[2]=c*a+d*l,e[3]=c*o-d*i,e[4]=c*s-d*n,e[5]=c*l-d*a,e[6]=f,e[7]=h,e[8]=u,e};Ke.scale=function(e,t,r){var i=r[0],n=r[1];return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=n*t[3],e[4]=n*t[4],e[5]=n*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e};Ke.fromMat2d=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=0,e[3]=t[2],e[4]=t[3],e[5]=0,e[6]=t[4],e[7]=t[5],e[8]=1,e};Ke.fromQuat=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r+r,s=i+i,l=n+n,f=r*o,h=i*o,u=i*s,d=n*o,c=n*s,m=n*l,p=a*o,v=a*s,g=a*l;return e[0]=1-u-m,e[3]=h-g,e[6]=d+v,e[1]=h+g,e[4]=1-f-m,e[7]=c-p,e[2]=d-v,e[5]=c+p,e[8]=1-f-u,e};Ke.normalFromMat4=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],f=t[7],h=t[8],u=t[9],d=t[10],c=t[11],m=t[12],p=t[13],v=t[14],g=t[15],y=r*s-i*o,x=r*l-n*o,_=r*f-a*o,S=i*l-n*s,E=i*f-a*s,b=n*f-a*l,A=h*p-u*m,L=h*v-d*m,P=h*g-c*m,C=u*v-d*p,I=u*g-c*p,B=d*g-c*v,M=y*B-x*I+_*C+S*P-E*L+b*A;return M?(M=1/M,e[0]=(s*B-l*I+f*C)*M,e[1]=(l*P-o*B-f*L)*M,e[2]=(o*I-s*P+f*A)*M,e[3]=(n*I-i*B-a*C)*M,e[4]=(r*B-n*P+a*L)*M,e[5]=(i*P-r*I-a*A)*M,e[6]=(p*b-v*E+g*S)*M,e[7]=(v*_-m*b-g*x)*M,e[8]=(m*E-p*_+g*y)*M,e):null};Ke.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+Math.pow(e[6],2)+Math.pow(e[7],2)+Math.pow(e[8],2))};var ie=Ke;var he={};he.create=function(){var e=new Ce(4);return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e};he.rotationTo=(function(){var e=w.create(),t=w.fromValues(1,0,0),r=w.fromValues(0,1,0);return function(i,n,a){var o=w.dot(n,a);return o<-.999999?(w.cross(e,t,n),w.length(e)<1e-6&&w.cross(e,r,n),w.normalize(e,e),he.setAxisAngle(i,e,Math.PI),i):o>.999999?(i[0]=0,i[1]=0,i[2]=0,i[3]=1,i):(w.cross(e,n,a),i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=1+o,he.normalize(i,i))}})();he.setAxes=(function(){var e=ie.create();return function(t,r,i,n){return e[0]=i[0],e[3]=i[1],e[6]=i[2],e[1]=n[0],e[4]=n[1],e[7]=n[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],he.normalize(t,he.fromMat3(t,e))}})();he.clone=z.clone;he.fromValues=z.fromValues;he.copy=z.copy;he.set=z.set;he.identity=function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e};he.setAxisAngle=function(e,t,r){r=r*.5;var i=Math.sin(r);return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=Math.cos(r),e};he.add=z.add;he.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=r[0],l=r[1],f=r[2],h=r[3];return e[0]=i*h+o*s+n*f-a*l,e[1]=n*h+o*l+a*s-i*f,e[2]=a*h+o*f+i*l-n*s,e[3]=o*h-i*s-n*l-a*f,e};he.mul=he.multiply;he.scale=z.scale;he.rotateX=function(e,t,r){r*=.5;var i=t[0],n=t[1],a=t[2],o=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+o*s,e[1]=n*l+a*s,e[2]=a*l-n*s,e[3]=o*l-i*s,e};he.rotateY=function(e,t,r){r*=.5;var i=t[0],n=t[1],a=t[2],o=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l-a*s,e[1]=n*l+o*s,e[2]=a*l+i*s,e[3]=o*l-n*s,e};he.rotateZ=function(e,t,r){r*=.5;var i=t[0],n=t[1],a=t[2],o=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+n*s,e[1]=n*l-i*s,e[2]=a*l+o*s,e[3]=o*l-a*s,e};he.calculateW=function(e,t){var r=t[0],i=t[1],n=t[2];return e[0]=r,e[1]=i,e[2]=n,e[3]=Math.sqrt(Math.abs(1-r*r-i*i-n*n)),e};he.dot=z.dot;he.lerp=z.lerp;he.slerp=function(e,t,r,i){var n=t[0],a=t[1],o=t[2],s=t[3],l=r[0],f=r[1],h=r[2],u=r[3],d,c,m,p,v;return c=n*l+a*f+o*h+s*u,c<0&&(c=-c,l=-l,f=-f,h=-h,u=-u),1-c>1e-6?(d=Math.acos(c),m=Math.sin(d),p=Math.sin((1-i)*d)/m,v=Math.sin(i*d)/m):(p=1-i,v=i),e[0]=p*n+v*l,e[1]=p*a+v*f,e[2]=p*o+v*h,e[3]=p*s+v*u,e};he.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r*r+i*i+n*n+a*a,s=o?1/o:0;return e[0]=-r*s,e[1]=-i*s,e[2]=-n*s,e[3]=a*s,e};he.conjugate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e};he.length=z.length;he.len=he.length;he.squaredLength=z.squaredLength;he.sqrLen=he.squaredLength;he.normalize=z.normalize;he.fromMat3=function(e,t){var r=t[0]+t[4]+t[8],i;if(r>0)i=Math.sqrt(r+1),e[3]=.5*i,i=.5/i,e[0]=(t[5]-t[7])*i,e[1]=(t[6]-t[2])*i,e[2]=(t[1]-t[3])*i;else{var n=0;t[4]>t[0]&&(n=1),t[8]>t[n*3+n]&&(n=2);var a=(n+1)%3,o=(n+2)%3;i=Math.sqrt(t[n*3+n]-t[a*3+a]-t[o*3+o]+1),e[n]=.5*i,i=.5/i,e[3]=(t[a*3+o]-t[o*3+a])*i,e[a]=(t[a*3+n]+t[n*3+a])*i,e[o]=(t[o*3+n]+t[n*3+o])*i}return e};var K=he;var De=function(){this._axisX=new R,this._axisY=new R,this._axisZ=new R,this.array=O.create(),this._dirty=!0};De.prototype={constructor:De,setArray:function(e){for(var t=0;t<this.array.length;t++)this.array[t]=e[t];return this._dirty=!0,this},adjoint:function(){return O.adjoint(this.array,this.array),this._dirty=!0,this},clone:function(){return new De().copy(this)},copy:function(e){return O.copy(this.array,e.array),this._dirty=!0,this},determinant:function(){return O.determinant(this.array)},fromQuat:function(e){return O.fromQuat(this.array,e.array),this._dirty=!0,this},fromRotationTranslation:function(e,t){return O.fromRotationTranslation(this.array,e.array,t.array),this._dirty=!0,this},fromMat2d:function(e){return De.fromMat2d(this,e),this},frustum:function(e,t,r,i,n,a){return O.frustum(this.array,e,t,r,i,n,a),this._dirty=!0,this},identity:function(){return O.identity(this.array),this._dirty=!0,this},invert:function(){return O.invert(this.array,this.array),this._dirty=!0,this},lookAt:function(e,t,r){return O.lookAt(this.array,e.array,t.array,r.array),this._dirty=!0,this},mul:function(e){return O.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return O.mul(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return O.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return O.multiply(this.array,e.array,this.array),this._dirty=!0,this},ortho:function(e,t,r,i,n,a){return O.ortho(this.array,e,t,r,i,n,a),this._dirty=!0,this},perspective:function(e,t,r,i){return O.perspective(this.array,e,t,r,i),this._dirty=!0,this},rotate:function(e,t){return O.rotate(this.array,this.array,e,t.array),this._dirty=!0,this},rotateX:function(e){return O.rotateX(this.array,this.array,e),this._dirty=!0,this},rotateY:function(e){return O.rotateY(this.array,this.array,e),this._dirty=!0,this},rotateZ:function(e){return O.rotateZ(this.array,this.array,e),this._dirty=!0,this},scale:function(e){return O.scale(this.array,this.array,e.array),this._dirty=!0,this},translate:function(e){return O.translate(this.array,this.array,e.array),this._dirty=!0,this},transpose:function(){return O.transpose(this.array,this.array),this._dirty=!0,this},decomposeMatrix:(function(){var e=w.create(),t=w.create(),r=w.create(),i=ie.create();return function(n,a,o){var s=this.array;w.set(e,s[0],s[1],s[2]),w.set(t,s[4],s[5],s[6]),w.set(r,s[8],s[9],s[10]);var l=w.length(e),f=w.length(t),h=w.length(r),u=this.determinant();u<0&&(l=-l),n&&n.set(l,f,h),o.set(s[12],s[13],s[14]),ie.fromMat4(i,s),i[0]/=l,i[1]/=l,i[2]/=l,i[3]/=f,i[4]/=f,i[5]/=f,i[6]/=h,i[7]/=h,i[8]/=h,K.fromMat3(a.array,i),K.normalize(a.array,a.array),a._dirty=!0,o._dirty=!0}})(),toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};var cn=Object.defineProperty;cn&&(dn=De.prototype,cn(dn,"z",{get:function(){var e=this.array;return this._axisZ.set(e[8],e[9],e[10]),this._axisZ},set:function(e){var t=this.array;e=e.array,t[8]=e[0],t[9]=e[1],t[10]=e[2],this._dirty=!0}}),cn(dn,"y",{get:function(){var e=this.array;return this._axisY.set(e[4],e[5],e[6]),this._axisY},set:function(e){var t=this.array;e=e.array,t[4]=e[0],t[5]=e[1],t[6]=e[2],this._dirty=!0}}),cn(dn,"x",{get:function(){var e=this.array;return this._axisX.set(e[0],e[1],e[2]),this._axisX},set:function(e){var t=this.array;e=e.array,t[0]=e[0],t[1]=e[1],t[2]=e[2],this._dirty=!0}}));var dn;De.adjoint=function(e,t){return O.adjoint(e.array,t.array),e._dirty=!0,e};De.copy=function(e,t){return O.copy(e.array,t.array),e._dirty=!0,e};De.determinant=function(e){return O.determinant(e.array)};De.identity=function(e){return O.identity(e.array),e._dirty=!0,e};De.ortho=function(e,t,r,i,n,a,o){return O.ortho(e.array,t,r,i,n,a,o),e._dirty=!0,e};De.perspective=function(e,t,r,i,n){return O.perspective(e.array,t,r,i,n),e._dirty=!0,e};De.lookAt=function(e,t,r,i){return O.lookAt(e.array,t.array,r.array,i.array),e._dirty=!0,e};De.invert=function(e,t){return O.invert(e.array,t.array),e._dirty=!0,e};De.mul=function(e,t,r){return O.mul(e.array,t.array,r.array),e._dirty=!0,e};De.multiply=De.mul;De.fromQuat=function(e,t){return O.fromQuat(e.array,t.array),e._dirty=!0,e};De.fromRotationTranslation=function(e,t,r){return O.fromRotationTranslation(e.array,t.array,r.array),e._dirty=!0,e};De.fromMat2d=function(i,r){i._dirty=!0;var r=r.array,i=i.array;return i[0]=r[0],i[4]=r[2],i[12]=r[4],i[1]=r[1],i[5]=r[3],i[13]=r[5],i};De.rotate=function(e,t,r,i){return O.rotate(e.array,t.array,r,i.array),e._dirty=!0,e};De.rotateX=function(e,t,r){return O.rotateX(e.array,t.array,r),e._dirty=!0,e};De.rotateY=function(e,t,r){return O.rotateY(e.array,t.array,r),e._dirty=!0,e};De.rotateZ=function(e,t,r){return O.rotateZ(e.array,t.array,r),e._dirty=!0,e};De.scale=function(e,t,r){return O.scale(e.array,t.array,r.array),e._dirty=!0,e};De.transpose=function(e,t){return O.transpose(e.array,t.array),e._dirty=!0,e};De.translate=function(e,t,r){return O.translate(e.array,t.array,r.array),e._dirty=!0,e};var H=De;var pe=function(e,t,r,i){e=e||0,t=t||0,r=r||0,i=i===void 0?1:i,this.array=K.fromValues(e,t,r,i),this._dirty=!0};pe.prototype={constructor:pe,add:function(e){return K.add(this.array,this.array,e.array),this._dirty=!0,this},calculateW:function(){return K.calculateW(this.array,this.array),this._dirty=!0,this},set:function(e,t,r,i){return this.array[0]=e,this.array[1]=t,this.array[2]=r,this.array[3]=i,this._dirty=!0,this},setArray:function(e){return this.array[0]=e[0],this.array[1]=e[1],this.array[2]=e[2],this.array[3]=e[3],this._dirty=!0,this},clone:function(){return new pe(this.x,this.y,this.z,this.w)},conjugate:function(){return K.conjugate(this.array,this.array),this._dirty=!0,this},copy:function(e){return K.copy(this.array,e.array),this._dirty=!0,this},dot:function(e){return K.dot(this.array,e.array)},fromMat3:function(e){return K.fromMat3(this.array,e.array),this._dirty=!0,this},fromMat4:(function(){var e=ie.create();return function(t){return ie.fromMat4(e,t.array),ie.transpose(e,e),K.fromMat3(this.array,e),this._dirty=!0,this}})(),identity:function(){return K.identity(this.array),this._dirty=!0,this},invert:function(){return K.invert(this.array,this.array),this._dirty=!0,this},len:function(){return K.len(this.array)},length:function(){return K.length(this.array)},lerp:function(e,t,r){return K.lerp(this.array,e.array,t.array,r),this._dirty=!0,this},mul:function(e){return K.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return K.multiply(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return K.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return K.multiply(this.array,e.array,this.array),this._dirty=!0,this},normalize:function(){return K.normalize(this.array,this.array),this._dirty=!0,this},rotateX:function(e){return K.rotateX(this.array,this.array,e),this._dirty=!0,this},rotateY:function(e){return K.rotateY(this.array,this.array,e),this._dirty=!0,this},rotateZ:function(e){return K.rotateZ(this.array,this.array,e),this._dirty=!0,this},rotationTo:function(e,t){return K.rotationTo(this.array,e.array,t.array),this._dirty=!0,this},setAxes:function(e,t,r){return K.setAxes(this.array,e.array,t.array,r.array),this._dirty=!0,this},setAxisAngle:function(e,t){return K.setAxisAngle(this.array,e.array,t),this._dirty=!0,this},slerp:function(e,t,r){return K.slerp(this.array,e.array,t.array,r),this._dirty=!0,this},sqrLen:function(){return K.sqrLen(this.array)},squaredLength:function(){return K.squaredLength(this.array)},fromEuler:function(e,t){return pe.fromEuler(this,e,t)},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};var Mi=Object.defineProperty;Mi&&(Pi=pe.prototype,Mi(Pi,"x",{get:function(){return this.array[0]},set:function(e){this.array[0]=e,this._dirty=!0}}),Mi(Pi,"y",{get:function(){return this.array[1]},set:function(e){this.array[1]=e,this._dirty=!0}}),Mi(Pi,"z",{get:function(){return this.array[2]},set:function(e){this.array[2]=e,this._dirty=!0}}),Mi(Pi,"w",{get:function(){return this.array[3]},set:function(e){this.array[3]=e,this._dirty=!0}}));var Pi;pe.add=function(e,t,r){return K.add(e.array,t.array,r.array),e._dirty=!0,e};pe.set=function(e,t,r,i,n){K.set(e.array,t,r,i,n),e._dirty=!0};pe.copy=function(e,t){return K.copy(e.array,t.array),e._dirty=!0,e};pe.calculateW=function(e,t){return K.calculateW(e.array,t.array),e._dirty=!0,e};pe.conjugate=function(e,t){return K.conjugate(e.array,t.array),e._dirty=!0,e};pe.identity=function(e){return K.identity(e.array),e._dirty=!0,e};pe.invert=function(e,t){return K.invert(e.array,t.array),e._dirty=!0,e};pe.dot=function(e,t){return K.dot(e.array,t.array)};pe.len=function(e){return K.length(e.array)};pe.lerp=function(e,t,r,i){return K.lerp(e.array,t.array,r.array,i),e._dirty=!0,e};pe.slerp=function(e,t,r,i){return K.slerp(e.array,t.array,r.array,i),e._dirty=!0,e};pe.mul=function(e,t,r){return K.multiply(e.array,t.array,r.array),e._dirty=!0,e};pe.multiply=pe.mul;pe.rotateX=function(e,t,r){return K.rotateX(e.array,t.array,r),e._dirty=!0,e};pe.rotateY=function(e,t,r){return K.rotateY(e.array,t.array,r),e._dirty=!0,e};pe.rotateZ=function(e,t,r){return K.rotateZ(e.array,t.array,r),e._dirty=!0,e};pe.setAxisAngle=function(e,t,r){return K.setAxisAngle(e.array,t.array,r),e._dirty=!0,e};pe.normalize=function(e,t){return K.normalize(e.array,t.array),e._dirty=!0,e};pe.sqrLen=function(e){return K.sqrLen(e.array)};pe.squaredLength=pe.sqrLen;pe.fromMat3=function(e,t){return K.fromMat3(e.array,t.array),e._dirty=!0,e};pe.setAxes=function(e,t,r,i){return K.setAxes(e.array,t.array,r.array,i.array),e._dirty=!0,e};pe.rotationTo=function(e,t,r){return K.rotationTo(e.array,t.array,r.array),e._dirty=!0,e};pe.fromEuler=function(e,t,h){e._dirty=!0,t=t.array;var i=e.array,n=Math.cos(t[0]/2),a=Math.cos(t[1]/2),o=Math.cos(t[2]/2),s=Math.sin(t[0]/2),l=Math.sin(t[1]/2),f=Math.sin(t[2]/2),h=(h||"XYZ").toUpperCase();switch(h){case"XYZ":i[0]=s*a*o+n*l*f,i[1]=n*l*o-s*a*f,i[2]=n*a*f+s*l*o,i[3]=n*a*o-s*l*f;break;case"YXZ":i[0]=s*a*o+n*l*f,i[1]=n*l*o-s*a*f,i[2]=n*a*f-s*l*o,i[3]=n*a*o+s*l*f;break;case"ZXY":i[0]=s*a*o-n*l*f,i[1]=n*l*o+s*a*f,i[2]=n*a*f+s*l*o,i[3]=n*a*o-s*l*f;break;case"ZYX":i[0]=s*a*o-n*l*f,i[1]=n*l*o+s*a*f,i[2]=n*a*f-s*l*o,i[3]=n*a*o+s*l*f;break;case"YZX":i[0]=s*a*o+n*l*f,i[1]=n*l*o+s*a*f,i[2]=n*a*f-s*l*o,i[3]=n*a*o-s*l*f;break;case"XZY":i[0]=s*a*o-n*l*f,i[1]=n*l*o-s*a*f,i[2]=n*a*f+s*l*o,i[3]=n*a*o+s*l*f;break}};var mn=pe;var pr=w.set,pn=w.copy,vn=function(e,t){this.min=e||new R(1/0,1/0,1/0),this.max=t||new R(-1/0,-1/0,-1/0),this.vertices=null};vn.prototype={constructor:vn,updateFromVertices:function(e){if(e.length>0){var t=this.min,r=this.max,i=t.array,n=r.array;pn(i,e[0]),pn(n,e[0]);for(var a=1;a<e.length;a++){var o=e[a];o[0]<i[0]&&(i[0]=o[0]),o[1]<i[1]&&(i[1]=o[1]),o[2]<i[2]&&(i[2]=o[2]),o[0]>n[0]&&(n[0]=o[0]),o[1]>n[1]&&(n[1]=o[1]),o[2]>n[2]&&(n[2]=o[2])}t._dirty=!0,r._dirty=!0}},union:function(e){var t=this.min,r=this.max;return w.min(t.array,t.array,e.min.array),w.max(r.array,r.array,e.max.array),t._dirty=!0,r._dirty=!0,this},intersection:function(e){var t=this.min,r=this.max;return w.max(t.array,t.array,e.min.array),w.min(r.array,r.array,e.max.array),t._dirty=!0,r._dirty=!0,this},intersectBoundingBox:function(e){var t=this.min.array,r=this.max.array,i=e.min.array,n=e.max.array;return!(t[0]>n[0]||t[1]>n[1]||t[2]>n[2]||r[0]<i[0]||r[1]<i[1]||r[2]<i[2])},containBoundingBox:function(e){var t=this.min.array,r=this.max.array,i=e.min.array,n=e.max.array;return t[0]<=i[0]&&t[1]<=i[1]&&t[2]<=i[2]&&r[0]>=n[0]&&r[1]>=n[1]&&r[2]>=n[2]},containPoint:function(e){var t=this.min.array,r=this.max.array,i=e.array;return t[0]<=i[0]&&t[1]<=i[1]&&t[2]<=i[2]&&r[0]>=i[0]&&r[1]>=i[1]&&r[2]>=i[2]},isFinite:function(){var e=this.min.array,t=this.max.array;return isFinite(e[0])&&isFinite(e[1])&&isFinite(e[2])&&isFinite(t[0])&&isFinite(t[1])&&isFinite(t[2])},applyTransform:function(e){this.transformFrom(this,e)},transformFrom:(function(){var e=w.create(),t=w.create(),r=w.create(),i=w.create(),n=w.create(),a=w.create();return function(o,s){var l=o.min.array,f=o.max.array,h=s.array;return e[0]=h[0]*l[0],e[1]=h[1]*l[0],e[2]=h[2]*l[0],t[0]=h[0]*f[0],t[1]=h[1]*f[0],t[2]=h[2]*f[0],r[0]=h[4]*l[1],r[1]=h[5]*l[1],r[2]=h[6]*l[1],i[0]=h[4]*f[1],i[1]=h[5]*f[1],i[2]=h[6]*f[1],n[0]=h[8]*l[2],n[1]=h[9]*l[2],n[2]=h[10]*l[2],a[0]=h[8]*f[2],a[1]=h[9]*f[2],a[2]=h[10]*f[2],l=this.min.array,f=this.max.array,l[0]=Math.min(e[0],t[0])+Math.min(r[0],i[0])+Math.min(n[0],a[0])+h[12],l[1]=Math.min(e[1],t[1])+Math.min(r[1],i[1])+Math.min(n[1],a[1])+h[13],l[2]=Math.min(e[2],t[2])+Math.min(r[2],i[2])+Math.min(n[2],a[2])+h[14],f[0]=Math.max(e[0],t[0])+Math.max(r[0],i[0])+Math.max(n[0],a[0])+h[12],f[1]=Math.max(e[1],t[1])+Math.max(r[1],i[1])+Math.max(n[1],a[1])+h[13],f[2]=Math.max(e[2],t[2])+Math.max(r[2],i[2])+Math.max(n[2],a[2])+h[14],this.min._dirty=!0,this.max._dirty=!0,this}})(),applyProjection:function(e){var t=this.min.array,r=this.max.array,i=e.array,n=t[0],a=t[1],o=t[2],s=r[0],l=r[1],f=t[2],h=r[0],u=r[1],d=r[2];if(i[15]===1)t[0]=i[0]*n+i[12],t[1]=i[5]*a+i[13],r[2]=i[10]*o+i[14],r[0]=i[0]*h+i[12],r[1]=i[5]*u+i[13],t[2]=i[10]*d+i[14];else{var c=-1/o;t[0]=i[0]*n*c,t[1]=i[5]*a*c,r[2]=(i[10]*o+i[14])*c,c=-1/f,r[0]=i[0]*s*c,r[1]=i[5]*l*c,c=-1/d,t[2]=(i[10]*d+i[14])*c}return this.min._dirty=!0,this.max._dirty=!0,this},updateVertices:function(){var e=this.vertices;if(!e){e=[];for(var t=0;t<8;t++)e[t]=w.fromValues(0,0,0);this.vertices=e}var r=this.min.array,i=this.max.array;return pr(e[0],r[0],r[1],r[2]),pr(e[1],r[0],i[1],r[2]),pr(e[2],i[0],r[1],r[2]),pr(e[3],i[0],i[1],r[2]),pr(e[4],r[0],r[1],i[2]),pr(e[5],r[0],i[1],i[2]),pr(e[6],i[0],r[1],i[2]),pr(e[7],i[0],i[1],i[2]),this},copy:function(e){var t=this.min,r=this.max;return pn(t.array,e.min.array),pn(r.array,e.max.array),t._dirty=!0,r._dirty=!0,this},clone:function(){var e=new vn;return e.copy(this),e}};var Fe=vn;var mc=0,pc=xe.extend({name:"",position:null,rotation:null,scale:null,worldTransform:null,localTransform:null,autoUpdateLocalTransform:!0,_parent:null,_scene:null,_needsUpdateWorldTransform:!0,_inIterating:!1,__depth:0},function(){this.name||(this.name=(this.type||"NODE")+"_"+mc++),this.position||(this.position=new R),this.rotation||(this.rotation=new mn),this.scale||(this.scale=new R(1,1,1)),this.worldTransform=new H,this.localTransform=new H,this._children=[]},{target:null,invisible:!1,isSkinnedMesh:function(){return!1},isRenderable:function(){return!1},setName:function(e){var t=this._scene;if(t){var r=t._nodeRepository;delete r[this.name],r[e]=this}this.name=e},add:function(e){var t=e._parent;if(t!==this){t&&t.remove(e),e._parent=this,this._children.push(e);var r=this._scene;r&&r!==e.scene&&e.traverse(this._addSelfToScene,this),e._needsUpdateWorldTransform=!0}},remove:function(e){var t=this._children,r=t.indexOf(e);r<0||(t.splice(r,1),e._parent=null,this._scene&&e.traverse(this._removeSelfFromScene,this))},removeAll:function(){for(var e=this._children,t=0;t<e.length;t++)e[t]._parent=null,this._scene&&e[t].traverse(this._removeSelfFromScene,this);this._children=[]},getScene:function(){return this._scene},getParent:function(){return this._parent},_removeSelfFromScene:function(e){e._scene.removeFromScene(e),e._scene=null},_addSelfToScene:function(e){this._scene.addToScene(e),e._scene=this._scene},isAncestor:function(e){for(var t=e._parent;t;){if(t===this)return!0;t=t._parent}return!1},children:function(){return this._children.slice()},childAt:function(e){return this._children[e]},getChildByName:function(e){for(var t=this._children,r=0;r<t.length;r++)if(t[r].name===e)return t[r]},getDescendantByName:function(e){for(var t=this._children,r=0;r<t.length;r++){var i=t[r];if(i.name===e)return i;var n=i.getDescendantByName(e);if(n)return n}},queryNode:function(e){if(e){for(var t=e.split("/"),r=this,i=0;i<t.length;i++){var n=t[i];if(n){for(var a=!1,o=r._children,s=0;s<o.length;s++){var l=o[s];if(l.name===n){r=l,a=!0;break}}if(!a)return}}return r}},getPath:function(e){if(!this._parent)return"/";for(var t=this._parent,r=this.name;t._parent&&(r=t.name+"/"+r,t._parent!=e);)t=t._parent;return!t._parent&&e?null:r},traverse:function(e,t){e.call(t,this);for(var r=this._children,i=0,n=r.length;i<n;i++)r[i].traverse(e,t)},eachChild:function(e,t){for(var r=this._children,i=0,n=r.length;i<n;i++){var a=r[i];e.call(t,a,i)}},setLocalTransform:function(e){O.copy(this.localTransform.array,e.array),this.decomposeLocalTransform()},decomposeLocalTransform:function(e){var t=e?null:this.scale;this.localTransform.decomposeMatrix(t,this.rotation,this.position)},setWorldTransform:function(e){O.copy(this.worldTransform.array,e.array),this.decomposeWorldTransform()},decomposeWorldTransform:(function(){var e=O.create();return function(t){var r=this.localTransform,i=this.worldTransform;this._parent?(O.invert(e,this._parent.worldTransform.array),O.multiply(r.array,e,i.array)):O.copy(r.array,i.array);var n=t?null:this.scale;r.decomposeMatrix(n,this.rotation,this.position)}})(),transformNeedsUpdate:function(){return this.position._dirty||this.rotation._dirty||this.scale._dirty},updateLocalTransform:function(){var e=this.position,t=this.rotation,r=this.scale;if(this.transformNeedsUpdate()){var i=this.localTransform.array;O.fromRotationTranslation(i,t.array,e.array),O.scale(i,i,r.array),t._dirty=!1,r._dirty=!1,e._dirty=!1,this._needsUpdateWorldTransform=!0}},_updateWorldTransformTopDown:function(){var e=this.localTransform.array,t=this.worldTransform.array;this._parent?O.multiplyAffine(t,this._parent.worldTransform.array,e):O.copy(t,e)},updateWorldTransform:function(){for(var e=this;e&&e.getParent()&&e.getParent().transformNeedsUpdate();)e=e.getParent();e.update()},update:function(e){this.autoUpdateLocalTransform?this.updateLocalTransform():e=!0,(e||this._needsUpdateWorldTransform)&&(this._updateWorldTransformTopDown(),e=!0,this._needsUpdateWorldTransform=!1);for(var t=this._children,r=0,i=t.length;r<i;r++)t[r].update(e)},getBoundingBox:(function(){function e(n){return!n.invisible&&n.geometry}var t=new Fe,r=new H,i=new H;return function(n,a){return a=a||new Fe,n=n||e,this._parent?H.invert(i,this._parent.worldTransform):H.identity(i),this.traverse(function(o){o.geometry&&o.geometry.boundingBox&&(t.copy(o.geometry.boundingBox),H.multiply(r,i,o.worldTransform),t.applyTransform(r),a.union(t))},this,e),a}})(),getWorldPosition:function(e){this.transformNeedsUpdate()&&this.updateWorldTransform();var t=this.worldTransform.array;if(e){var r=e.array;return r[0]=t[12],r[1]=t[13],r[2]=t[14],e}else return new R(t[12],t[13],t[14])},clone:function(){var e=new this.constructor,t=this._children;e.setName(this.name),e.position.copy(this.position),e.rotation.copy(this.rotation),e.scale.copy(this.scale);for(var r=0;r<t.length;r++)e.add(t[r].clone());return e},rotateAround:(function(){var e=new R,t=new H;return function(r,i,n){e.copy(this.position).subtract(r);var a=this.localTransform;a.identity(),a.translate(r),a.rotate(n,i),t.fromRotationTranslation(this.rotation,e),a.multiply(t),a.scale(this.scale),this.decomposeLocalTransform(),this._needsUpdateWorldTransform=!0}})(),lookAt:(function(){var e=new H;return function(t,r){e.lookAt(this.position,t,r||this.localTransform.y).invert(),this.setLocalTransform(e),this.target=t}})()}),mt=pc;var At=mt.extend({material:null,geometry:null,mode:D.TRIANGLES,_renderInfo:null},{__program:null,lightGroup:0,renderOrder:0,culling:!0,cullFace:D.BACK,frontFace:D.CCW,frustumCulling:!0,receiveShadow:!0,castShadow:!0,ignorePicking:!1,ignorePreZ:!1,ignoreGBuffer:!1,isRenderable:function(){return this.geometry&&this.material&&this.material.shader&&!this.invisible&&this.geometry.vertexCount>0},beforeRender:function(e){},afterRender:function(e,t){},getBoundingBox:function(e,t){return t=mt.prototype.getBoundingBox.call(this,e,t),this.geometry&&this.geometry.boundingBox&&t.union(this.geometry.boundingBox),t},clone:(function(){var e=["castShadow","receiveShadow","mode","culling","cullFace","frontFace","frustumCulling","renderOrder","lineWidth","ignorePicking","ignorePreZ","ignoreGBuffer"];return function(){var t=mt.prototype.clone.call(this);t.geometry=this.geometry,t.material=this.material;for(var r=0;r<e.length;r++){var i=e[r];t[i]!==this[i]&&(t[i]=this[i])}return t}})()});At.POINTS=D.POINTS;At.LINES=D.LINES;At.LINE_LOOP=D.LINE_LOOP;At.LINE_STRIP=D.LINE_STRIP;At.TRIANGLES=D.TRIANGLES;At.TRIANGLE_STRIP=D.TRIANGLE_STRIP;At.TRIANGLE_FAN=D.TRIANGLE_FAN;At.BACK=D.BACK;At.FRONT=D.FRONT;At.FRONT_AND_BACK=D.FRONT_AND_BACK;At.CW=D.CW;At.CCW=D.CCW;var Ni=At;var La=xe.extend({scene:null,camera:null,renderer:null},function(){this._ray=new Or,this._ndc=new nt},{pick:function(e,t,r){var i=this.pickAll(e,t,[],r);return i[0]||null},pickAll:function(e,t,r,i){return this.renderer.screenToNDC(e,t,this._ndc),this.camera.castRay(this._ndc,this._ray),r=r||[],this._intersectNode(this.scene,r,i||!1),r.sort(this._intersectionCompareFunc),r},_intersectNode:function(e,t,r){e instanceof Ni&&e.isRenderable()&&(!e.ignorePicking||r)&&(e.mode===D.TRIANGLES&&e.geometry.isUseIndices()||e.geometry.pickByRay||e.geometry.pick)&&this._intersectRenderable(e,t);for(var i=0;i<e._children.length;i++)this._intersectNode(e._children[i],t,r)},_intersectRenderable:(function(){var e=new R,t=new R,r=new R,i=new Or,n=new H;return function(a,o){var s=a.isSkinnedMesh();i.copy(this._ray),H.invert(n,a.worldTransform),s||i.applyTransform(n);var l=a.geometry,f=s?a.skeleton.boundingBox:l.boundingBox;if(!(f&&!i.intersectBoundingBox(f))){if(l.pick){l.pick(this._ndc.x,this._ndc.y,this.renderer,this.camera,a,o);return}else if(l.pickByRay){l.pickByRay(i,a,o);return}var h=a.cullFace===D.BACK&&a.frontFace===D.CCW||a.cullFace===D.FRONT&&a.frontFace===D.CW,u,d=l.indices,c=l.attributes.position,m=l.attributes.weight,p=l.attributes.joint,v,g=[];if(!(!c||!c.value||!d)){if(s){v=a.skeleton.getSubSkinMatrices(a.__uid__,a.joints);for(var y=0;y<a.joints.length;y++){g[y]=g[y]||[];for(var x=0;x<16;x++)g[y][x]=v[y*16+x]}var _=[],S=[],E=[],b=[],A=[],L=l.attributes.skinnedPosition;(!L||!L.value)&&(l.createAttribute("skinnedPosition","f",3),L=l.attributes.skinnedPosition,L.init(l.vertexCount));for(var y=0;y<l.vertexCount;y++){c.get(y,_),m.get(y,S),p.get(y,E),S[3]=1-S[0]-S[1]-S[2],w.set(b,0,0,0);for(var x=0;x<4;x++)E[x]>=0&&S[x]>1e-4&&(w.transformMat4(A,_,g[E[x]]),w.scaleAndAdd(b,b,A,S[x]));L.set(y,b)}}for(var y=0;y<d.length;y+=3){var P=d[y],C=d[y+1],I=d[y+2],B=s?l.attributes.skinnedPosition:c;if(B.get(P,e.array),B.get(C,t.array),B.get(I,r.array),h?u=i.intersectTriangle(e,t,r,a.culling):u=i.intersectTriangle(e,r,t,a.culling),u){var M=new R;s?R.copy(M,u):R.transformMat4(M,u,a.worldTransform),o.push(new La.Intersection(u,M,a,[P,C,I],y/3,R.dist(M,this._ray.origin)))}}}}}})(),_intersectionCompareFunc:function(e,t){return e.distance-t.distance}});La.Intersection=function(e,t,r,i,n,a){this.point=e,this.pointWorld=t,this.target=r,this.triangle=i,this.triangleIndex=n,this.distance=a};var Ps=La;var Ri="__dt__",gn=function(){this._contextId=0,this._caches=[],this._context={}};gn.prototype={use:function(e,t){var r=this._caches;r[e]||(r[e]={},t&&(r[e]=t())),this._contextId=e,this._context=r[e]},put:function(e,t){this._context[e]=t},get:function(e){return this._context[e]},dirty:function(e){e=e||"";var t=Ri+e;this.put(t,!0)},dirtyAll:function(e){e=e||"";for(var t=Ri+e,r=this._caches,i=0;i<r.length;i++)r[i]&&(r[i][t]=!0)},fresh:function(e){e=e||"";var t=Ri+e;this.put(t,!1)},freshAll:function(e){e=e||"";for(var t=Ri+e,r=this._caches,i=0;i<r.length;i++)r[i]&&(r[i][t]=!1)},isDirty:function(e){e=e||"";var t=Ri+e,r=this._context;return!r.hasOwnProperty(t)||r[t]===!0},deleteContext:function(e){delete this._caches[e],this._context={}},delete:function(e){delete this._context[e]},clearAll:function(){this._caches={}},getContext:function(){return this._context},eachContext:function(e,t){var r=Object.keys(this._caches);r.forEach(function(i){e&&e.call(t,i)})},miss:function(e){return!this._context.hasOwnProperty(e)}};gn.prototype.constructor=gn;var ii=gn;var le=xe.extend({width:512,height:512,type:D.UNSIGNED_BYTE,format:D.RGBA,wrapS:D.REPEAT,wrapT:D.REPEAT,minFilter:D.LINEAR_MIPMAP_LINEAR,magFilter:D.LINEAR,useMipmap:!0,anisotropic:1,flipY:!0,sRGB:!0,unpackAlignment:4,premultiplyAlpha:!1,dynamic:!1,NPOT:!1,__used:0},function(){this._cache=new ii},{getWebGLTexture:function(e){var t=e.gl,r=this._cache;return r.use(e.__uid__),r.miss("webgl_texture")&&r.put("webgl_texture",t.createTexture()),this.dynamic?this.update(e):r.isDirty()&&(this.update(e),r.fresh()),r.get("webgl_texture")},bind:function(){},unbind:function(){},dirty:function(){this._cache&&this._cache.dirtyAll()},update:function(e){},updateCommon:function(e){var t=e.gl;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,this.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,this.unpackAlignment),this.format===D.DEPTH_COMPONENT&&(this.useMipmap=!1);var r=e.getGLExtension("EXT_sRGB");this.format===le.SRGB&&!r&&(this.format=le.RGB),this.format===le.SRGB_ALPHA&&!r&&(this.format=le.RGBA),this.NPOT=!this.isPowerOfTwo()},getAvailableWrapS:function(){return this.NPOT?D.CLAMP_TO_EDGE:this.wrapS},getAvailableWrapT:function(){return this.NPOT?D.CLAMP_TO_EDGE:this.wrapT},getAvailableMinFilter:function(){var e=this.minFilter;return this.NPOT||!this.useMipmap?e===D.NEAREST_MIPMAP_NEAREST||e===D.NEAREST_MIPMAP_LINEAR?D.NEAREST:e===D.LINEAR_MIPMAP_LINEAR||e===D.LINEAR_MIPMAP_NEAREST?D.LINEAR:e:e},getAvailableMagFilter:function(){return this.magFilter},nextHighestPowerOfTwo:function(e){--e;for(var t=1;t<32;t<<=1)e=e|e>>t;return e+1},dispose:function(e){var t=this._cache;t.use(e.__uid__);var r=t.get("webgl_texture");r&&e.gl.deleteTexture(r),t.deleteContext(e.__uid__)},isRenderable:function(){},isPowerOfTwo:function(){}});Object.defineProperty(le.prototype,"width",{get:function(){return this._width},set:function(e){this._width=e}});Object.defineProperty(le.prototype,"height",{get:function(){return this._height},set:function(e){this._height=e}});le.BYTE=D.BYTE;le.UNSIGNED_BYTE=D.UNSIGNED_BYTE;le.SHORT=D.SHORT;le.UNSIGNED_SHORT=D.UNSIGNED_SHORT;le.INT=D.INT;le.UNSIGNED_INT=D.UNSIGNED_INT;le.FLOAT=D.FLOAT;le.HALF_FLOAT=36193;le.UNSIGNED_INT_24_8_WEBGL=34042;le.DEPTH_COMPONENT=D.DEPTH_COMPONENT;le.DEPTH_STENCIL=D.DEPTH_STENCIL;le.ALPHA=D.ALPHA;le.RGB=D.RGB;le.RGBA=D.RGBA;le.LUMINANCE=D.LUMINANCE;le.LUMINANCE_ALPHA=D.LUMINANCE_ALPHA;le.SRGB=35904;le.SRGB_ALPHA=35906;le.COMPRESSED_RGB_S3TC_DXT1_EXT=33776;le.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777;le.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778;le.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779;le.NEAREST=D.NEAREST;le.LINEAR=D.LINEAR;le.NEAREST_MIPMAP_NEAREST=D.NEAREST_MIPMAP_NEAREST;le.LINEAR_MIPMAP_NEAREST=D.LINEAR_MIPMAP_NEAREST;le.NEAREST_MIPMAP_LINEAR=D.NEAREST_MIPMAP_LINEAR;le.LINEAR_MIPMAP_LINEAR=D.LINEAR_MIPMAP_LINEAR;le.REPEAT=D.REPEAT;le.CLAMP_TO_EDGE=D.CLAMP_TO_EDGE;le.MIRRORED_REPEAT=D.MIRRORED_REPEAT;var V=le;var bt=Ni.extend({skeleton:null,joints:null},function(){this.joints||(this.joints=[])},{offsetMatrix:null,isInstancedMesh:function(){return!1},isSkinnedMesh:function(){return!!(this.skeleton&&this.joints&&this.joints.length>0)},clone:function(){var e=Ni.prototype.clone.call(this);return e.skeleton=this.skeleton,this.joints&&(e.joints=this.joints.slice()),e}});bt.POINTS=D.POINTS;bt.LINES=D.LINES;bt.LINE_LOOP=D.LINE_LOOP;bt.LINE_STRIP=D.LINE_STRIP;bt.TRIANGLES=D.TRIANGLES;bt.TRIANGLE_STRIP=D.TRIANGLE_STRIP;bt.TRIANGLE_FAN=D.TRIANGLE_FAN;bt.BACK=D.BACK;bt.FRONT=D.FRONT;bt.FRONT_AND_BACK=D.FRONT_AND_BACK;bt.CW=D.CW;bt.CCW=D.CCW;var Vt=bt;var _n={};_n.isPowerOfTwo=function(e){return(e&e-1)===0};_n.nextPowerOfTwo=function(e){return e--,e|=e>>1,e|=e>>2,e|=e>>4,e|=e>>8,e|=e>>16,e++,e};_n.nearestPowerOfTwo=function(e){return Math.pow(2,Math.round(Math.log(e)/Math.LN2))};var xn=_n;var Ns=xn.isPowerOfTwo;function Rs(e){return Math.pow(2,Math.round(Math.log(e)/Math.LN2))}function vc(e,t){var r=Rs(e.width),i=Rs(e.height);t=t||document.createElement("canvas"),t.width=r,t.height=i;var n=t.getContext("2d");return n.drawImage(e.image,0,0,r,i),t}var Da=V.extend(function(){return{image:null,pixels:null,mipmaps:[],convertToPOT:!1}},{textureType:"texture2D",update:function(e){var t=e.gl;t.bindTexture(t.TEXTURE_2D,this._cache.get("webgl_texture")),this.updateCommon(e);var r=this.format,i=this.type,n=!!(this.convertToPOT&&!this.mipmaps.length&&this.image&&(this.wrapS===V.REPEAT||this.wrapT===V.REPEAT)&&this.NPOT);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,n?this.wrapS:this.getAvailableWrapS()),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,n?this.wrapT:this.getAvailableWrapT()),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n?this.magFilter:this.getAvailableMagFilter()),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n?this.minFilter:this.getAvailableMinFilter());var a=e.getGLExtension("EXT_texture_filter_anisotropic");if(a&&this.anisotropic>1&&t.texParameterf(t.TEXTURE_2D,a.TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropic),i===36193){var o=e.getGLExtension("OES_texture_half_float");o||(i=D.FLOAT)}if(this.mipmaps.length)for(var s=this.width,l=this.height,f=0;f<this.mipmaps.length;f++){var h=this.mipmaps[f];this._updateTextureData(t,h,f,s,l,r,i,!1),s/=2,l/=2}else this._updateTextureData(t,this,0,this.width,this.height,r,i,n),this.useMipmap&&(!this.NPOT||n)&&t.generateMipmap(t.TEXTURE_2D);t.bindTexture(t.TEXTURE_2D,null)},_updateTextureData:function(e,t,r,i,n,a,o,s){if(t.image){var l=t.image;s&&(this._potCanvas=vc(this,this._potCanvas),l=this._potCanvas),e.texImage2D(e.TEXTURE_2D,r,a,a,o,l)}else a<=V.COMPRESSED_RGBA_S3TC_DXT5_EXT&&a>=V.COMPRESSED_RGB_S3TC_DXT1_EXT?e.compressedTexImage2D(e.TEXTURE_2D,r,a,i,n,0,t.pixels):e.texImage2D(e.TEXTURE_2D,r,a,i,n,0,a,o,t.pixels)},generateMipmap:function(e){var t=e.gl;this.useMipmap&&!this.NPOT&&(t.bindTexture(t.TEXTURE_2D,this._cache.get("webgl_texture")),t.generateMipmap(t.TEXTURE_2D))},isPowerOfTwo:function(){return Ns(this.width)&&Ns(this.height)},isRenderable:function(){return this.image?this.image.width>0&&this.image.height>0:!!(this.width&&this.height)},bind:function(e){e.gl.bindTexture(e.gl.TEXTURE_2D,this.getWebGLTexture(e))},unbind:function(e){e.gl.bindTexture(e.gl.TEXTURE_2D,null)},load:function(e,t){var r=me.createImage();t&&(r.crossOrigin=t);var i=this;return r.onload=function(){i.dirty(),i.trigger("success",i)},r.onerror=function(){i.trigger("error",i)},r.src=e,this.image=r,this}});Object.defineProperty(Da.prototype,"width",{get:function(){return this.image?this.image.width:this._width},set:function(e){this.image?console.warn("Texture from image can't set width"):(this._width!==e&&this.dirty(),this._width=e)}});Object.defineProperty(Da.prototype,"height",{get:function(){return this.image?this.image.height:this._height},set:function(e){this.image?console.warn("Texture from image can't set height"):(this._height!==e&&this.dirty(),this._height=e)}});var j=Da;function Is(e){return{byte:me.Int8Array,ubyte:me.Uint8Array,short:me.Int16Array,ushort:me.Uint16Array}[e]||me.Float32Array}function Ca(e){return"attr_"+e}function ni(e,t,r,i){switch(this.name=e,this.type=t,this.size=r,this.semantic=i||"",this.value=null,r){case 1:this.get=function(n){return this.value[n]},this.set=function(n,a){this.value[n]=a},this.copy=function(n,a){this.value[n]=this.value[n]};break;case 2:this.get=function(n,a){var o=this.value;return a[0]=o[n*2],a[1]=o[n*2+1],a},this.set=function(n,a){var o=this.value;o[n*2]=a[0],o[n*2+1]=a[1]},this.copy=function(n,a){var o=this.value;a*=2,n*=2,o[n]=o[a],o[n+1]=o[a+1]};break;case 3:this.get=function(n,a){var o=n*3,s=this.value;return a[0]=s[o],a[1]=s[o+1],a[2]=s[o+2],a},this.set=function(n,a){var o=n*3,s=this.value;s[o]=a[0],s[o+1]=a[1],s[o+2]=a[2]},this.copy=function(n,a){var o=this.value;a*=3,n*=3,o[n]=o[a],o[n+1]=o[a+1],o[n+2]=o[a+2]};break;case 4:this.get=function(n,a){var o=this.value,s=n*4;return a[0]=o[s],a[1]=o[s+1],a[2]=o[s+2],a[3]=o[s+3],a},this.set=function(n,a){var o=this.value,s=n*4;o[s]=a[0],o[s+1]=a[1],o[s+2]=a[2],o[s+3]=a[3]},this.copy=function(n,a){var o=this.value;a*=4,n*=4,o[n]=o[a],o[n+1]=o[a+1],o[n+2]=o[a+2],o[n+3]=o[a+3]}}}ni.prototype.init=function(e){if(!this.value||this.value.length!==e*this.size){var t=Is(this.type);this.value=new t(e*this.size)}};ni.prototype.fromArray=function(e){var t=Is(this.type),r;if(e[0]&&e[0].length){var i=0,n=this.size;r=new t(e.length*n);for(var a=0;a<e.length;a++)for(var o=0;o<n;o++)r[i++]=e[a][o]}else r=new t(e);this.value=r};ni.prototype.clone=function(e){var t=new ni(this.name,this.type,this.size,this.semantic);return e&&console.warn("todo"),t};function Os(e,t,r,i,n){this.name=e,this.type=t,this.buffer=r,this.size=i,this.semantic=n,this.symbol="",this.needsRemove=!1}function Bs(e){this.buffer=e,this.count=0}var $t=xe.extend(function(){return{attributes:{},indices:null,dynamic:!0,_enabledAttributes:null,__used:0}},function(){this._cache=new ii,this._attributeList=Object.keys(this.attributes),this.__vaoCache={}},{mainAttribute:"",pick:null,pickByRay:null,dirty:function(){for(var e=this.getEnabledAttributes(),t=0;t<e.length;t++)this.dirtyAttribute(e[t]);this.dirtyIndices(),this._enabledAttributes=null,this._cache.dirty("any")},dirtyIndices:function(){this._cache.dirtyAll("indices")},dirtyAttribute:function(e){this._cache.dirtyAll(Ca(e)),this._cache.dirtyAll("attributes")},getTriangleIndices:function(e,t){if(e<this.triangleCount&&e>=0){t||(t=[]);var r=this.indices;return t[0]=r[e*3],t[1]=r[e*3+1],t[2]=r[e*3+2],t}},setTriangleIndices:function(e,t){var r=this.indices;r[e*3]=t[0],r[e*3+1]=t[1],r[e*3+2]=t[2]},isUseIndices:function(){return!!this.indices},initIndicesFromArray:function(e){var t,r=this.vertexCount>65535?me.Uint32Array:me.Uint16Array;if(e[0]&&e[0].length){var i=0,n=3;t=new r(e.length*n);for(var a=0;a<e.length;a++)for(var o=0;o<n;o++)t[i++]=e[a][o]}else t=new r(e);this.indices=t},createAttribute:function(e,t,r,i){var n=new ni(e,t,r,i);return this.attributes[e]&&this.removeAttribute(e),this.attributes[e]=n,this._attributeList.push(e),n},removeAttribute:function(e){var t=this._attributeList,r=t.indexOf(e);return r>=0?(t.splice(r,1),delete this.attributes[e],!0):!1},getAttribute:function(e){return this.attributes[e]},getEnabledAttributes:function(){var e=this._enabledAttributes,t=this._attributeList;if(e)return e;for(var r=[],i=this.vertexCount,n=0;n<t.length;n++){var a=t[n],o=this.attributes[a];o.value&&o.value.length===i*o.size&&r.push(a)}return this._enabledAttributes=r,r},getBufferChunks:function(e){var t=this._cache;t.use(e.__uid__);var r=t.isDirty("attributes"),i=t.isDirty("indices");if(r||i){this._updateBuffer(e.gl,r,i);for(var n=this.getEnabledAttributes(),a=0;a<n.length;a++)t.fresh(Ca(n[a]));t.fresh("attributes"),t.fresh("indices")}return t.fresh("any"),t.get("chunks")},_updateBuffer:function(e,t,r){var i=this._cache,n=i.get("chunks"),a=!1;n||(n=[],n[0]={attributeBuffers:[],indicesBuffer:null},i.put("chunks",n),a=!0);var o=n[0],s=o.attributeBuffers,l=o.indicesBuffer;if(t||a){var f=this.getEnabledAttributes(),h={};if(!a)for(var u=0;u<s.length;u++)h[s[u].name]=s[u];for(var d=0;d<f.length;d++){var c=f[d],m=this.attributes[c],p;a||(p=h[c]);var v;p?v=p.buffer:v=e.createBuffer(),i.isDirty(Ca(c))&&(e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,m.value,this.dynamic?e.DYNAMIC_DRAW:e.STATIC_DRAW)),s[d]=new Os(c,m.type,v,m.size,m.semantic)}for(var u=d;u<s.length;u++)e.deleteBuffer(s[u].buffer);s.length=d}this.isUseIndices()&&(r||a)&&(l||(l=new Bs(e.createBuffer()),o.indicesBuffer=l),l.count=this.indices.length,e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,l.buffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.indices,this.dynamic?e.DYNAMIC_DRAW:e.STATIC_DRAW))},dispose:function(e){var t=this._cache;t.use(e.__uid__);var r=t.get("chunks");if(r)for(var i=0;i<r.length;i++){for(var n=r[i],a=0;a<n.attributeBuffers.length;a++){var o=n.attributeBuffers[a];e.gl.deleteBuffer(o.buffer)}n.indicesBuffer&&e.gl.deleteBuffer(n.indicesBuffer.buffer)}if(this.__vaoCache){var s=e.getGLExtension("OES_vertex_array_object");for(var l in this.__vaoCache){var f=this.__vaoCache[l].vao;f&&s.deleteVertexArrayOES(f)}}this.__vaoCache={},t.deleteContext(e.__uid__)}});Object.defineProperty&&(Object.defineProperty($t.prototype,"vertexCount",{enumerable:!1,get:function(){var e=this.attributes[this.mainAttribute];return e||(e=this.attributes[this._attributeList[0]]),!e||!e.value?0:e.value.length/e.size}}),Object.defineProperty($t.prototype,"triangleCount",{enumerable:!1,get:function(){var e=this.indices;return e?e.length/3:0}}));$t.STATIC_DRAW=D.STATIC_DRAW;$t.DYNAMIC_DRAW=D.DYNAMIC_DRAW;$t.STREAM_DRAW=D.STREAM_DRAW;$t.AttributeBuffer=Os;$t.IndicesBuffer=Bs;$t.Attribute=ni;var vr=$t;var pt=w.create,ai=w.add,Br=w.set,Zt=vr.Attribute,Fr=vr.extend(function(){return{attributes:{position:new Zt("position","float",3,"POSITION"),texcoord0:new Zt("texcoord0","float",2,"TEXCOORD_0"),texcoord1:new Zt("texcoord1","float",2,"TEXCOORD_1"),normal:new Zt("normal","float",3,"NORMAL"),tangent:new Zt("tangent","float",4,"TANGENT"),color:new Zt("color","float",4,"COLOR"),weight:new Zt("weight","float",3,"WEIGHT"),joint:new Zt("joint","float",4,"JOINT"),barycentric:new Zt("barycentric","float",3,null)},boundingBox:null}},{mainAttribute:"position",updateBoundingBox:function(){var e=this.boundingBox;e||(e=this.boundingBox=new Fe);var t=this.attributes.position.value;if(t&&t.length){var r=e.min,i=e.max,n=r.array,a=i.array;w.set(n,t[0],t[1],t[2]),w.set(a,t[0],t[1],t[2]);for(var o=3;o<t.length;){var s=t[o++],l=t[o++],f=t[o++];s<n[0]&&(n[0]=s),l<n[1]&&(n[1]=l),f<n[2]&&(n[2]=f),s>a[0]&&(a[0]=s),l>a[1]&&(a[1]=l),f>a[2]&&(a[2]=f)}r._dirty=!0,i._dirty=!0}},generateVertexNormals:function(){if(this.vertexCount){var e=this.indices,t=this.attributes,r=t.position.value,i=t.normal.value;if(!i||i.length!==r.length)i=t.normal.value=new me.Float32Array(r.length);else for(var n=0;n<i.length;n++)i[n]=0;for(var a=pt(),o=pt(),s=pt(),l=pt(),f=pt(),h=pt(),u=e?e.length:this.vertexCount,d,c,m,p=0;p<u;){e?(d=e[p++],c=e[p++],m=e[p++]):(d=p++,c=p++,m=p++),Br(a,r[d*3],r[d*3+1],r[d*3+2]),Br(o,r[c*3],r[c*3+1],r[c*3+2]),Br(s,r[m*3],r[m*3+1],r[m*3+2]),w.sub(l,a,o),w.sub(f,o,s),w.cross(h,l,f);for(var n=0;n<3;n++)i[d*3+n]=i[d*3+n]+h[n],i[c*3+n]=i[c*3+n]+h[n],i[m*3+n]=i[m*3+n]+h[n]}for(var n=0;n<i.length;)Br(h,i[n],i[n+1],i[n+2]),w.normalize(h,h),i[n++]=h[0],i[n++]=h[1],i[n++]=h[2];this.dirty()}},generateFaceNormals:function(){if(this.vertexCount){this.isUniqueVertex()||this.generateUniqueVertex();var e=this.indices,t=this.attributes,r=t.position.value,i=t.normal.value,n=pt(),a=pt(),o=pt(),s=pt(),l=pt(),f=pt();i||(i=t.normal.value=new Float32Array(r.length));for(var h=e?e.length:this.vertexCount,u,d,c,m=0;m<h;){e?(u=e[m++],d=e[m++],c=e[m++]):(u=m++,d=m++,c=m++),Br(n,r[u*3],r[u*3+1],r[u*3+2]),Br(a,r[d*3],r[d*3+1],r[d*3+2]),Br(o,r[c*3],r[c*3+1],r[c*3+2]),w.sub(s,n,a),w.sub(l,a,o),w.cross(f,s,l),w.normalize(f,f);for(var p=0;p<3;p++)i[u*3+p]=f[p],i[d*3+p]=f[p],i[c*3+p]=f[p]}this.dirty()}},generateTangents:function(){if(this.vertexCount){var e=this.vertexCount,t=this.attributes;t.tangent.value||(t.tangent.value=new Float32Array(e*4));var r=t.texcoord0.value,i=t.position.value,n=t.tangent.value,a=t.normal.value;if(!r){console.warn("Geometry without texcoords can't generate tangents.");return}for(var o=[],s=[],l=0;l<e;l++)o[l]=[0,0,0],s[l]=[0,0,0];for(var f=[0,0,0],h=[0,0,0],u=this.indices,d=u?u.length:this.vertexCount,c,m,p,l=0;l<d;){u?(c=u[l++],m=u[l++],p=u[l++]):(c=l++,m=l++,p=l++);var v=r[c*2],g=r[m*2],y=r[p*2],x=r[c*2+1],_=r[m*2+1],S=r[p*2+1],E=i[c*3],b=i[m*3],A=i[p*3],L=i[c*3+1],P=i[m*3+1],C=i[p*3+1],I=i[c*3+2],B=i[m*3+2],M=i[p*3+2],G=b-E,k=A-E,Y=P-L,U=C-L,ue=B-I,X=M-I,_e=g-v,ce=y-v,be=_-x,Le=S-x,oe=1/(_e*Le-be*ce);f[0]=(Le*G-be*k)*oe,f[1]=(Le*Y-be*U)*oe,f[2]=(Le*ue-be*X)*oe,h[0]=(_e*k-ce*G)*oe,h[1]=(_e*U-ce*Y)*oe,h[2]=(_e*X-ce*ue)*oe,ai(o[c],o[c],f),ai(o[m],o[m],f),ai(o[p],o[p],f),ai(s[c],s[c],h),ai(s[m],s[m],h),ai(s[p],s[p],h)}for(var je=pt(),Be=pt(),He=pt(),l=0;l<e;l++){He[0]=a[l*3],He[1]=a[l*3+1],He[2]=a[l*3+2];var lt=o[l];w.scale(je,He,w.dot(He,lt)),w.sub(je,lt,je),w.normalize(je,je),w.cross(Be,He,lt),n[l*4]=je[0],n[l*4+1]=je[1],n[l*4+2]=je[2],n[l*4+3]=w.dot(Be,s[l])<0?-1:1}this.dirty()}},isUniqueVertex:function(){return this.isUseIndices()?this.vertexCount===this.indices.length:!0},generateUniqueVertex:function(){if(!(!this.vertexCount||!this.indices)){this.indices.length>65535&&(this.indices=new me.Uint32Array(this.indices));for(var e=this.attributes,t=this.indices,r=this.getEnabledAttributes(),i={},n=0;n<r.length;n++){var a=r[n];i[a]=e[a].value,e[a].init(this.indices.length)}for(var o=0,s=0;s<t.length;s++){for(var l=t[s],n=0;n<r.length;n++)for(var a=r[n],f=e[a].value,h=e[a].size,u=0;u<h;u++)f[o*h+u]=i[a][l*h+u];t[s]=o,o++}this.dirty()}},generateBarycentric:function(){if(this.vertexCount){this.isUniqueVertex()||this.generateUniqueVertex();var e=this.attributes,t=e.barycentric.value,r=this.indices;if(!(t&&t.length===r.length*3)){t=e.barycentric.value=new Float32Array(r.length*3);for(var i=0;i<(r?r.length:this.vertexCount/3);)for(var n=0;n<3;n++){var a=r?r[i++]:i*3+n;t[a*3+n]=1}this.dirty()}}},applyTransform:function(e){var t=this.attributes,r=t.position.value,i=t.normal.value,n=t.tangent.value;e=e.array;var a=O.create();O.invert(a,e),O.transpose(a,a);var o=w.transformMat4,s=w.forEach;s(r,3,0,null,o,e),i&&s(i,3,0,null,o,a),n&&s(n,4,0,null,o,a),this.boundingBox&&this.updateBoundingBox()},dispose:function(e){var t=this._cache;t.use(e.__uid__);var r=t.get("chunks");if(r)for(var i=0;i<r.length;i++){for(var n=r[i],a=0;a<n.attributeBuffers.length;a++){var o=n.attributeBuffers[a];e.gl.deleteBuffer(o.buffer)}n.indicesBuffer&&e.gl.deleteBuffer(n.indicesBuffer.buffer)}if(this.__vaoCache){var s=e.getGLExtension("OES_vertex_array_object");for(var l in this.__vaoCache){var f=this.__vaoCache[l].vao;f&&s.deleteVertexArrayOES(f)}}this.__vaoCache={},t.deleteContext(e.__uid__)}});Fr.STATIC_DRAW=vr.STATIC_DRAW;Fr.DYNAMIC_DRAW=vr.DYNAMIC_DRAW;Fr.STREAM_DRAW=vr.STREAM_DRAW;Fr.AttributeBuffer=vr.AttributeBuffer;Fr.IndicesBuffer=vr.IndicesBuffer;Fr.Attribute=Zt;var ee=Fr;var Fs=`vec3 calcAmbientSHLight(int idx, vec3 N) {
 int offset = 9 * idx;
 return ambientSHLightCoefficients[0]
 + ambientSHLightCoefficients[1] * N.x
 + ambientSHLightCoefficients[2] * N.y
 + ambientSHLightCoefficients[3] * N.z
 + ambientSHLightCoefficients[4] * N.x * N.z
 + ambientSHLightCoefficients[5] * N.z * N.y
 + ambientSHLightCoefficients[6] * N.y * N.x
 + ambientSHLightCoefficients[7] * (3.0 * N.z * N.z - 1.0)
 + ambientSHLightCoefficients[8] * (N.x * N.x - N.y * N.y);
}`;var Ht="uniform vec3 ",Ii="uniform float ",oi="@export clay.header.",si="@end",at=":unconfigurable;",Gs=[oi+"directional_light",Ht+"directionalLightDirection[DIRECTIONAL_LIGHT_COUNT]"+at,Ht+"directionalLightColor[DIRECTIONAL_LIGHT_COUNT]"+at,si,oi+"ambient_light",Ht+"ambientLightColor[AMBIENT_LIGHT_COUNT]"+at,si,oi+"ambient_sh_light",Ht+"ambientSHLightColor[AMBIENT_SH_LIGHT_COUNT]"+at,Ht+"ambientSHLightCoefficients[AMBIENT_SH_LIGHT_COUNT * 9]"+at,Fs,si,oi+"ambient_cubemap_light",Ht+"ambientCubemapLightColor[AMBIENT_CUBEMAP_LIGHT_COUNT]"+at,"uniform samplerCube ambientCubemapLightCubemap[AMBIENT_CUBEMAP_LIGHT_COUNT]"+at,"uniform sampler2D ambientCubemapLightBRDFLookup[AMBIENT_CUBEMAP_LIGHT_COUNT]"+at,si,oi+"point_light",Ht+"pointLightPosition[POINT_LIGHT_COUNT]"+at,Ii+"pointLightRange[POINT_LIGHT_COUNT]"+at,Ht+"pointLightColor[POINT_LIGHT_COUNT]"+at,si,oi+"spot_light",Ht+"spotLightPosition[SPOT_LIGHT_COUNT]"+at,Ht+"spotLightDirection[SPOT_LIGHT_COUNT]"+at,Ii+"spotLightRange[SPOT_LIGHT_COUNT]"+at,Ii+"spotLightUmbraAngleCosine[SPOT_LIGHT_COUNT]"+at,Ii+"spotLightPenumbraAngleCosine[SPOT_LIGHT_COUNT]"+at,Ii+"spotLightFalloffFactor[SPOT_LIGHT_COUNT]"+at,Ht+"spotLightColor[SPOT_LIGHT_COUNT]"+at,si].join(`
`);F.import(Gs);var gc=mt.extend(function(){return{color:[1,1,1],intensity:1,castShadow:!0,shadowResolution:512,group:0}},{type:"",clone:function(){var e=mt.prototype.clone.call(this);return e.color=Array.prototype.slice.call(this.color),e.intensity=this.intensity,e.castShadow=this.castShadow,e.shadowResolution=this.shadowResolution,e}}),ot=gc;var yn=function(e,t){this.normal=e||new R(0,1,0),this.distance=t||0};yn.prototype={constructor:yn,distanceToPoint:function(e){return w.dot(e.array,this.normal.array)-this.distance},projectPoint:function(e,t){t||(t=new R);var r=this.distanceToPoint(e);return w.scaleAndAdd(t.array,e.array,this.normal.array,-r),t._dirty=!0,t},normalize:function(){var e=1/w.len(this.normal.array);w.scale(this.normal.array,e),this.distance*=e},intersectFrustum:function(e){for(var t=e.vertices,r=this.normal.array,i=w.dot(t[0].array,r)>this.distance,n=1;n<8;n++)if(w.dot(t[n].array,r)>this.distance!=i)return!0},intersectLine:(function(){var e=w.create();return function(t,r,i){var n=this.distanceToPoint(t),a=this.distanceToPoint(r);if(n>0&&a>0||n<0&&a<0)return null;var o=this.normal.array,s=this.distance,l=t.array;w.sub(e,r.array,t.array),w.normalize(e,e);var f=w.dot(o,e);if(f===0)return null;i||(i=new R);var h=(w.dot(o,l)-s)/f;return w.scaleAndAdd(i.array,l,e,-h),i._dirty=!0,i}})(),applyTransform:(function(){var e=O.create(),t=z.create(),r=z.create();return r[3]=1,function(i){i=i.array,w.scale(r,this.normal.array,this.distance),z.transformMat4(r,r,i),this.distance=w.dot(r,this.normal.array),O.invert(e,i),O.transpose(e,e),t[3]=0,w.copy(t,this.normal.array),z.transformMat4(t,t,e),w.copy(this.normal.array,t)}})(),copy:function(e){w.copy(this.normal.array,e.normal.array),this.normal._dirty=!0,this.distance=e.distance},clone:function(){var e=new yn;return e.copy(this),e}};var Tn=yn;var Xe=w.set,Us=w.copy,zs=w.transformMat4,Ma=Math.min,Pa=Math.max,Vs=function(){this.planes=[];for(var e=0;e<6;e++)this.planes.push(new Tn);this.boundingBox=new Fe,this.vertices=[];for(var e=0;e<8;e++)this.vertices[e]=w.fromValues(0,0,0)};Vs.prototype={setFromProjection:function(e){var t=this.planes,r=e.array,i=r[0],n=r[1],a=r[2],o=r[3],s=r[4],l=r[5],f=r[6],h=r[7],u=r[8],d=r[9],c=r[10],m=r[11],p=r[12],v=r[13],g=r[14],y=r[15];Xe(t[0].normal.array,o-i,h-s,m-u),t[0].distance=-(y-p),t[0].normalize(),Xe(t[1].normal.array,o+i,h+s,m+u),t[1].distance=-(y+p),t[1].normalize(),Xe(t[2].normal.array,o+n,h+l,m+d),t[2].distance=-(y+v),t[2].normalize(),Xe(t[3].normal.array,o-n,h-l,m-d),t[3].distance=-(y-v),t[3].normalize(),Xe(t[4].normal.array,o-a,h-f,m-c),t[4].distance=-(y-g),t[4].normalize(),Xe(t[5].normal.array,o+a,h+f,m+c),t[5].distance=-(y+g),t[5].normalize();var x=this.boundingBox,_=this.vertices;if(y===0){var S=l/i,E=-g/(c-1),b=-g/(c+1),A=-b/l,L=-E/l;x.min.set(-A*S,-A,b),x.max.set(A*S,A,E),Xe(_[0],-A*S,-A,b),Xe(_[1],-A*S,A,b),Xe(_[2],A*S,-A,b),Xe(_[3],A*S,A,b),Xe(_[4],-L*S,-L,E),Xe(_[5],-L*S,L,E),Xe(_[6],L*S,-L,E),Xe(_[7],L*S,L,E)}else{var P=(-1-p)/i,C=(1-p)/i,I=(1-v)/l,B=(-1-v)/l,M=(-1-g)/c,G=(1-g)/c;x.min.set(Math.min(P,C),Math.min(B,I),Math.min(G,M)),x.max.set(Math.max(C,P),Math.max(I,B),Math.max(M,G));var k=x.min.array,Y=x.max.array;Xe(_[0],k[0],k[1],k[2]),Xe(_[1],k[0],Y[1],k[2]),Xe(_[2],Y[0],k[1],k[2]),Xe(_[3],Y[0],Y[1],k[2]),Xe(_[4],k[0],k[1],Y[2]),Xe(_[5],k[0],Y[1],Y[2]),Xe(_[6],Y[0],k[1],Y[2]),Xe(_[7],Y[0],Y[1],Y[2])}},getTransformedBoundingBox:(function(){var e=w.create();return function(t,r){var i=this.vertices,n=r.array,a=t.min,o=t.max,s=a.array,l=o.array,f=i[0];zs(e,f,n),Us(s,e),Us(l,e);for(var h=1;h<8;h++)f=i[h],zs(e,f,n),s[0]=Ma(e[0],s[0]),s[1]=Ma(e[1],s[1]),s[2]=Ma(e[2],s[2]),l[0]=Pa(e[0],l[0]),l[1]=Pa(e[1],l[1]),l[2]=Pa(e[2],l[2]);return a._dirty=!0,o._dirty=!0,t}})()};var li=Vs;var _c=mt.extend(function(){return{projectionMatrix:new H,invProjectionMatrix:new H,viewMatrix:new H,frustum:new li}},function(){this.update(!0)},{update:function(e){mt.prototype.update.call(this,e),H.invert(this.viewMatrix,this.worldTransform),this.updateProjectionMatrix(),H.invert(this.invProjectionMatrix,this.projectionMatrix),this.frustum.setFromProjection(this.projectionMatrix)},setViewMatrix:function(e){H.copy(this.viewMatrix,e),H.invert(this.worldTransform,e),this.decomposeWorldTransform()},decomposeProjectionMatrix:function(){},setProjectionMatrix:function(e){H.copy(this.projectionMatrix,e),H.invert(this.invProjectionMatrix,e),this.decomposeProjectionMatrix()},updateProjectionMatrix:function(){},castRay:(function(){var e=z.create();return function(t,r){var i=r!==void 0?r:new Or,n=t.array[0],a=t.array[1];return z.set(e,n,a,-1,1),z.transformMat4(e,e,this.invProjectionMatrix.array),z.transformMat4(e,e,this.worldTransform.array),w.scale(i.origin.array,e,1/e[3]),z.set(e,n,a,1,1),z.transformMat4(e,e,this.invProjectionMatrix.array),z.transformMat4(e,e,this.worldTransform.array),w.scale(e,e,1/e[3]),w.sub(i.direction.array,e,i.origin.array),w.normalize(i.direction.array,i.direction.array),i.direction._dirty=!0,i.origin._dirty=!0,i}})()}),er=_c;var xc=O.create(),Hs=O.create(),Na={};function yc(e){var t=[],r=Object.keys(e);r.sort();for(var i=0;i<r.length;i++){var n=r[i];t.push(n+" "+e[n])}var a=t.join(`
`);if(Na[a])return Na[a];var o=Ne.genGUID();return Na[a]=o,o}function En(){this.opaque=[],this.transparent=[],this._opaqueCount=0,this._transparentCount=0}En.prototype.startCount=function(){this._opaqueCount=0,this._transparentCount=0};En.prototype.add=function(e,t){t?this.transparent[this._transparentCount++]=e:this.opaque[this._opaqueCount++]=e};En.prototype.endCount=function(){this.transparent.length=this._transparentCount,this.opaque.length=this._opaqueCount};var Tc=mt.extend(function(){return{material:null,lights:[],viewBoundingBoxLastFrame:new Fe,shadowUniforms:{},_cameraList:[],_lightUniforms:{},_previousLightNumber:{},_lightNumber:{},_lightProgramKeys:{},_nodeRepository:{},_renderLists:new on(20)}},function(){this._scene=this},{addToScene:function(e){e instanceof er?(this._cameraList.length>0&&console.warn("Found multiple camera in one scene. Use the fist one."),this._cameraList.push(e)):e instanceof ot&&this.lights.push(e),e.name&&(this._nodeRepository[e.name]=e)},removeFromScene:function(e){var t;e instanceof er?(t=this._cameraList.indexOf(e),t>=0&&this._cameraList.splice(t,1)):e instanceof ot&&(t=this.lights.indexOf(e),t>=0&&this.lights.splice(t,1)),e.name&&delete this._nodeRepository[e.name]},getNode:function(e){return this._nodeRepository[e]},setMainCamera:function(e){var t=this._cameraList.indexOf(e);t>=0&&this._cameraList.splice(t,1),this._cameraList.unshift(e)},getMainCamera:function(){return this._cameraList[0]},getLights:function(){return this.lights},updateLights:function(){var e=this.lights;this._previousLightNumber=this._lightNumber;for(var t={},r=0;r<e.length;r++){var i=e[r];if(!i.invisible){var n=i.group;t[n]||(t[n]={}),t[n][i.type]=t[n][i.type]||0,t[n][i.type]++}}this._lightNumber=t;for(var a in t)this._lightProgramKeys[a]=yc(t[a]);this._updateLightUniforms()},cloneNode:function(e){var t=e.clone(),r={};function i(n,a){r[n.__uid__]=a;for(var o=0;o<n._children.length;o++){var s=n._children[o],l=a._children[o];i(s,l)}}return i(e,t),t.traverse(function(n){n.skeleton&&(n.skeleton=n.skeleton.clone(r)),n.material&&(n.material=n.material.clone())}),t},updateRenderList:function(e,t){var r=e.__uid__,i=this._renderLists.get(r);i||(i=new En,this._renderLists.put(r,i)),i.startCount(),t&&(this.viewBoundingBoxLastFrame.min.set(1/0,1/0,1/0),this.viewBoundingBoxLastFrame.max.set(-1/0,-1/0,-1/0));var n=this.material&&this.material.transparent||!1;return this._doUpdateRenderList(this,e,n,i,t),i.endCount(),i},getRenderList:function(e){return this._renderLists.get(e.__uid__)},_doUpdateRenderList:function(e,t,r,i,n){if(!e.invisible)for(var a=0;a<e._children.length;a++){var o=e._children[a];if(o.isRenderable()){var s=o.isSkinnedMesh()?xc:o.worldTransform.array,l=o.geometry;O.multiplyAffine(Hs,t.viewMatrix.array,s),(n&&!l.boundingBox||!this.isFrustumCulled(o,t,Hs))&&i.add(o,o.material.transparent||r)}o._children.length>0&&this._doUpdateRenderList(o,t,r,i,n)}},isFrustumCulled:(function(){var e=new Fe,t=new H;return function(r,i,n){var a=r.boundingBox;if(a||(r.skeleton&&r.skeleton.boundingBox?a=r.skeleton.boundingBox:a=r.geometry.boundingBox),!a)return!1;if(t.array=n,e.transformFrom(a,t),r.castShadow&&this.viewBoundingBoxLastFrame.union(e),r.frustumCulling){if(!e.intersectBoundingBox(i.frustum.boundingBox))return!0;t.array=i.projectionMatrix.array,e.max.array[2]>0&&e.min.array[2]<0&&(e.max.array[2]=-1e-20),e.applyProjection(t);var o=e.min.array,s=e.max.array;if(s[0]<-1||o[0]>1||s[1]<-1||o[1]>1||s[2]<-1||o[2]>1)return!0}return!1}})(),_updateLightUniforms:function(){var e=this.lights;e.sort(Ec);var t=this._lightUniforms;for(var r in t)for(var i in t[r])t[r][i].value.length=0;for(var n=0;n<e.length;n++){var a=e[n];if(!a.invisible){var r=a.group;for(var i in a.uniformTemplates){var o=a.uniformTemplates[i],s=o.value(a);if(s!=null){t[r]||(t[r]={}),t[r][i]||(t[r][i]={type:"",value:[]});var l=t[r][i];switch(l.type=o.type+"v",o.type){case"1i":case"1f":case"t":l.value.push(s);break;case"2f":case"3f":case"4f":for(var f=0;f<s.length;f++)l.value.push(s[f]);break;default:console.error("Unkown light uniform type "+o.type)}}}}}},getLightGroups:function(){var e=[];for(var t in this._lightNumber)e.push(t);return e},getNumberChangedLightGroups:function(){var e=[];for(var t in this._lightNumber)this.isLightNumberChanged(t)&&e.push(t);return e},isLightNumberChanged:function(e){var t=this._previousLightNumber,r=this._lightNumber;for(var i in r[e])if(!t[e]||r[e][i]!==t[e][i])return!0;for(var i in t[e])if(!r[e]||r[e][i]!==t[e][i])return!0;return!1},getLightsNumbers:function(e){return this._lightNumber[e]},getProgramKey:function(e){return this._lightProgramKeys[e]},setLightUniforms:(function(){function e(t,r,i){for(var n in t){var a=t[n];if(a.type==="tv"){if(!r.hasUniform(n))continue;for(var o=[],s=0;s<a.value.length;s++){var l=a.value[s],f=r.takeCurrentTextureSlot(i,l);o.push(f)}r.setUniform(i.gl,"1iv",n,o)}else r.setUniform(i.gl,a.type,n,a.value)}}return function(t,r,i){e(this._lightUniforms[r],t,i),e(this.shadowUniforms,t,i)}})(),dispose:function(){this.material=null,this._opaqueList=[],this._transparentList=[],this.lights=[],this._lightUniforms={},this._lightNumber={},this._nodeRepository={}}});function Ec(e,t){if(t.castShadow&&!e.castShadow)return!0}var Lt=Tc;var Sn=xn.isPowerOfTwo,Sc=["px","nx","py","ny","pz","nz"],Ra=V.extend(function(){return{image:{px:null,nx:null,py:null,ny:null,pz:null,nz:null},pixels:{px:null,nx:null,py:null,ny:null,pz:null,nz:null},mipmaps:[]}},{textureType:"textureCube",update:function(e){var t=e.gl;t.bindTexture(t.TEXTURE_CUBE_MAP,this._cache.get("webgl_texture")),this.updateCommon(e);var r=this.format,i=this.type;t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_WRAP_S,this.getAvailableWrapS()),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_WRAP_T,this.getAvailableWrapT()),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MAG_FILTER,this.getAvailableMagFilter()),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MIN_FILTER,this.getAvailableMinFilter());var n=e.getGLExtension("EXT_texture_filter_anisotropic");if(n&&this.anisotropic>1&&t.texParameterf(t.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropic),i===36193){var a=e.getGLExtension("OES_texture_half_float");a||(i=D.FLOAT)}if(this.mipmaps.length)for(var o=this.width,s=this.height,l=0;l<this.mipmaps.length;l++){var f=this.mipmaps[l];this._updateTextureData(t,f,l,o,s,r,i),o/=2,s/=2}else this._updateTextureData(t,this,0,this.width,this.height,r,i),!this.NPOT&&this.useMipmap&&t.generateMipmap(t.TEXTURE_CUBE_MAP);t.bindTexture(t.TEXTURE_CUBE_MAP,null)},_updateTextureData:function(e,t,r,i,n,a,o){for(var s=0;s<6;s++){var l=Sc[s],f=t.image&&t.image[l];f?e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+s,r,a,a,o,f):e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+s,r,a,i,n,0,a,o,t.pixels&&t.pixels[l])}},generateMipmap:function(e){var t=e.gl;this.useMipmap&&!this.NPOT&&(t.bindTexture(t.TEXTURE_CUBE_MAP,this._cache.get("webgl_texture")),t.generateMipmap(t.TEXTURE_CUBE_MAP))},bind:function(e){e.gl.bindTexture(e.gl.TEXTURE_CUBE_MAP,this.getWebGLTexture(e))},unbind:function(e){e.gl.bindTexture(e.gl.TEXTURE_CUBE_MAP,null)},isPowerOfTwo:function(){return this.image.px?Sn(this.image.px.width)&&Sn(this.image.px.height):Sn(this.width)&&Sn(this.height)},isRenderable:function(){return this.image.px?fi(this.image.px)&&fi(this.image.nx)&&fi(this.image.py)&&fi(this.image.ny)&&fi(this.image.pz)&&fi(this.image.nz):!!(this.width&&this.height)},load:function(e,t){var r=0,i=this;return Ne.each(e,function(n,a){var o=me.createImage();t&&(o.crossOrigin=t),o.onload=function(){r--,r===0&&(i.dirty(),i.trigger("success",i))},o.onerror=function(){r--},r++,o.src=n,i.image[a]=o}),this}});Object.defineProperty(Ra.prototype,"width",{get:function(){return this.image&&this.image.px?this.image.px.width:this._width},set:function(e){this.image&&this.image.px?console.warn("Texture from image can't set width"):(this._width!==e&&this.dirty(),this._width=e)}});Object.defineProperty(Ra.prototype,"height",{get:function(){return this.image&&this.image.px?this.image.px.height:this._height},set:function(e){this.image&&this.image.px?console.warn("Texture from image can't set height"):(this._height!==e&&this.dirty(),this._height=e)}});function fi(e){return e.width>0&&e.height>0}var tr=Ra;var wc=er.extend({fov:50,aspect:1,near:.1,far:2e3},{updateProjectionMatrix:function(){var e=this.fov/180*Math.PI;this.projectionMatrix.perspective(e,this.aspect,this.near,this.far)},decomposeProjectionMatrix:function(){var e=this.projectionMatrix.array,t=Math.atan(1/e[5])*2;this.fov=t/Math.PI*180,this.aspect=e[5]/e[0],this.near=e[14]/(e[10]-1),this.far=e[14]/(e[10]+1)},clone:function(){var e=er.prototype.clone.call(this);return e.fov=this.fov,e.aspect=this.aspect,e.near=this.near,e.far=this.far,e}}),Ge=wc;var wn="framebuffer",rr="renderbuffer",ks=rr+"_width",Ws=rr+"_height",Ia=rr+"_attached",Oa="depthtexture_attached",Gr=D.FRAMEBUFFER,Oi=D.RENDERBUFFER,Bi=D.DEPTH_ATTACHMENT,Xs=D.COLOR_ATTACHMENT0,Fi=xe.extend({depthBuffer:!0,viewport:null,_width:0,_height:0,_textures:null,_boundRenderer:null},function(){this._cache=new ii,this._textures={}},{getTextureWidth:function(){return this._width},getTextureHeight:function(){return this._height},bind:function(e){if(e.__currentFrameBuffer){if(e.__currentFrameBuffer===this)return;console.warn("Renderer already bound with another framebuffer. Unbind it first")}e.__currentFrameBuffer=this;var t=e.gl;t.bindFramebuffer(Gr,this._getFrameBufferGL(e)),this._boundRenderer=e;var r=this._cache;r.put("viewport",e.viewport);var i=!1,n,a;for(var o in this._textures){i=!0;var s=this._textures[o];s&&(n=s.texture.width,a=s.texture.height,this._doAttach(e,s.texture,o,s.target))}this._width=n,this._height=a,!i&&this.depthBuffer&&console.error("Must attach texture before bind, or renderbuffer may have incorrect width and height."),this.viewport?e.setViewport(this.viewport):e.setViewport(0,0,n,a,1);var l=r.get("attached_textures");if(l){for(var o in l)if(!this._textures[o]){var f=l[o];this._doDetach(t,o,f)}}if(!r.get(Oa)&&this.depthBuffer){r.miss(rr)&&r.put(rr,t.createRenderbuffer());var h=r.get(rr);(n!==r.get(ks)||a!==r.get(Ws))&&(t.bindRenderbuffer(Oi,h),t.renderbufferStorage(Oi,t.DEPTH_COMPONENT16,n,a),r.put(ks,n),r.put(Ws,a),t.bindRenderbuffer(Oi,null)),r.get(Ia)||(t.framebufferRenderbuffer(Gr,Bi,Oi,h),r.put(Ia,!0))}},unbind:function(e){e.__currentFrameBuffer=null;var t=e.gl;t.bindFramebuffer(Gr,null),this._boundRenderer=null,this._cache.use(e.__uid__);var r=this._cache.get("viewport");r&&e.setViewport(r),this.updateMipmap(e)},updateMipmap:function(e){var t=e.gl;for(var r in this._textures){var i=this._textures[r];if(i){var n=i.texture;if(!n.NPOT&&n.useMipmap&&n.minFilter===V.LINEAR_MIPMAP_LINEAR){var a=n.textureType==="textureCube"?D.TEXTURE_CUBE_MAP:D.TEXTURE_2D;t.bindTexture(a,n.getWebGLTexture(e)),t.generateMipmap(a),t.bindTexture(a,null)}}}},checkStatus:function(e){return e.checkFramebufferStatus(Gr)},_getFrameBufferGL:function(e){var t=this._cache;return t.use(e.__uid__),t.miss(wn)&&t.put(wn,e.gl.createFramebuffer()),t.get(wn)},attach:function(e,t,r){if(!e.width)throw new Error("The texture attached to color buffer is not a valid.");t=t||Xs,r=r||D.TEXTURE_2D;var i=this._boundRenderer,n=i&&i.gl,a;if(n){var o=this._cache;o.use(i.__uid__),a=o.get("attached_textures")}var s=this._textures[t];if(!(s&&s.target===r&&s.texture===e&&a&&a[t]!=null)){var l=!0;i&&(l=this._doAttach(i,e,t,r),this.viewport||i.setViewport(0,0,e.width,e.height,1)),l&&(this._textures[t]=this._textures[t]||{},this._textures[t].texture=e,this._textures[t].target=r)}},_doAttach:function(e,t,r,i){var n=e.gl,a=t.getWebGLTexture(e),o=this._cache.get("attached_textures");if(o&&o[r]){var s=o[r];if(s.texture===t&&s.target===i)return}r=+r;var l=!0;if(r===Bi||r===D.DEPTH_STENCIL_ATTACHMENT){var f=e.getGLExtension("WEBGL_depth_texture");if(f||(console.error("Depth texture is not supported by the browser"),l=!1),t.format!==D.DEPTH_COMPONENT&&t.format!==D.DEPTH_STENCIL&&(console.error("The texture attached to depth buffer is not a valid."),l=!1),l){var h=this._cache.get(rr);h&&(n.framebufferRenderbuffer(Gr,Bi,Oi,null),n.deleteRenderbuffer(h),this._cache.put(rr,!1)),this._cache.put(Ia,!1),this._cache.put(Oa,!0)}}return n.framebufferTexture2D(Gr,r,i,a,0),o||(o={},this._cache.put("attached_textures",o)),o[r]=o[r]||{},o[r].texture=t,o[r].target=i,l},_doDetach:function(e,t,r){e.framebufferTexture2D(Gr,t,r,null,0);var i=this._cache.get("attached_textures");i&&i[t]&&(i[t]=null),(t===Bi||t===D.DEPTH_STENCIL_ATTACHMENT)&&this._cache.put(Oa,!1)},detach:function(e,t){if(this._textures[e]=null,this._boundRenderer){var r=this._cache;r.use(this._boundRenderer.__uid__),this._doDetach(this._boundRenderer.gl,e,t)}},dispose:function(e){var t=e.gl,r=this._cache;r.use(e.__uid__);var i=r.get(rr);i&&t.deleteRenderbuffer(i);var n=r.get(wn);n&&t.deleteFramebuffer(n),r.deleteContext(e.__uid__),this._textures={}}});Fi.DEPTH_ATTACHMENT=Bi;Fi.COLOR_ATTACHMENT0=Xs;Fi.STENCIL_ATTACHMENT=D.STENCIL_ATTACHMENT;Fi.DEPTH_STENCIL_ATTACHMENT=D.DEPTH_STENCIL_ATTACHMENT;var ve=Fi;var Ac=["px","nx","py","ny","pz","nz"],bc=xe.extend(function(){var e={position:new R,far:1e3,near:.1,texture:null,shadowMapPass:null},t=e._cameras={px:new Ge({fov:90}),nx:new Ge({fov:90}),py:new Ge({fov:90}),ny:new Ge({fov:90}),pz:new Ge({fov:90}),nz:new Ge({fov:90})};return t.px.lookAt(R.POSITIVE_X,R.NEGATIVE_Y),t.nx.lookAt(R.NEGATIVE_X,R.NEGATIVE_Y),t.py.lookAt(R.POSITIVE_Y,R.POSITIVE_Z),t.ny.lookAt(R.NEGATIVE_Y,R.NEGATIVE_Z),t.pz.lookAt(R.POSITIVE_Z,R.NEGATIVE_Y),t.nz.lookAt(R.NEGATIVE_Z,R.NEGATIVE_Y),e._frameBuffer=new ve,e},{getCamera:function(e){return this._cameras[e]},render:function(e,t,r){var i=e.gl;r||t.update();for(var n=this.texture.width,a=2*Math.atan(n/(n-.5))/Math.PI*180,o=0;o<6;o++){var s=Ac[o],l=this._cameras[s];if(R.copy(l.position,this.position),l.far=this.far,l.near=this.near,l.fov=a,this.shadowMapPass){l.update();var f=t.getBoundingBox();f.applyTransform(l.viewMatrix),t.viewBoundingBoxLastFrame.copy(f),this.shadowMapPass.render(e,t,l,!0)}this._frameBuffer.attach(this.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+o),this._frameBuffer.bind(e),e.render(t,l,!0),this._frameBuffer.unbind(e)}},dispose:function(e){this._frameBuffer.dispose(e)}}),hi=bc;var Lc=ee.extend({dynamic:!1,widthSegments:1,heightSegments:1},function(){this.build()},{build:function(){for(var e=this.heightSegments,t=this.widthSegments,r=this.attributes,i=[],n=[],a=[],o=[],s=0;s<=e;s++)for(var l=s/e,f=0;f<=t;f++){var h=f/t;if(i.push([2*h-1,2*l-1,0]),n&&n.push([h,l]),a&&a.push([0,0,1]),f<t&&s<e){var u=f+s*(t+1);o.push([u,u+1,u+t+1]),o.push([u+t+1,u+1,u+t+2])}}r.position.fromArray(i),r.texcoord0.fromArray(n),r.normal.fromArray(a),this.initIndicesFromArray(o),this.boundingBox=new Fe,this.boundingBox.min.set(-1,-1,0),this.boundingBox.max.set(1,1,0)}}),gr=Lc;var Ue=new H,Dc=ee.extend({dynamic:!1,widthSegments:1,heightSegments:1,depthSegments:1,inside:!1},function(){this.build()},{build:function(){var e={px:ui("px",this.depthSegments,this.heightSegments),nx:ui("nx",this.depthSegments,this.heightSegments),py:ui("py",this.widthSegments,this.depthSegments),ny:ui("ny",this.widthSegments,this.depthSegments),pz:ui("pz",this.widthSegments,this.heightSegments),nz:ui("nz",this.widthSegments,this.heightSegments)},t=["position","texcoord0","normal"],r=0,i=0;for(var n in e)r+=e[n].vertexCount,i+=e[n].indices.length;for(var a=0;a<t.length;a++)this.attributes[t[a]].init(r);this.indices=new me.Uint16Array(i);var o=0,s=0;for(var n in e){for(var l=e[n],a=0;a<t.length;a++)for(var f=t[a],h=l.attributes[f].value,u=l.attributes[f].size,d=f==="normal",c=0;c<h.length;c++){var m=h[c];this.inside&&d&&(m=-m),this.attributes[f].value[c+u*s]=m}for(var p=l.indices.length,c=0;c<l.indices.length;c++)this.indices[c+o]=s+l.indices[this.inside?p-c-1:c];o+=l.indices.length,s+=l.vertexCount}this.boundingBox=new Fe,this.boundingBox.max.set(1,1,1),this.boundingBox.min.set(-1,-1,-1)}});function ui(e,t,r){Ue.identity();var i=new gr({widthSegments:t,heightSegments:r});switch(e){case"px":H.translate(Ue,Ue,R.POSITIVE_X),H.rotateY(Ue,Ue,Math.PI/2);break;case"nx":H.translate(Ue,Ue,R.NEGATIVE_X),H.rotateY(Ue,Ue,-Math.PI/2);break;case"py":H.translate(Ue,Ue,R.POSITIVE_Y),H.rotateX(Ue,Ue,-Math.PI/2);break;case"ny":H.translate(Ue,Ue,R.NEGATIVE_Y),H.rotateX(Ue,Ue,Math.PI/2);break;case"pz":H.translate(Ue,Ue,R.POSITIVE_Z);break;case"nz":H.translate(Ue,Ue,R.NEGATIVE_Z),H.rotateY(Ue,Ue,Math.PI);break}return i.applyTransform(Ue),i}var An=Dc;var js=`@export clay.skybox.vertex
#define SHADER_NAME skybox
uniform mat4 world : WORLD;
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
attribute vec3 position : POSITION;
varying vec3 v_WorldPosition;
void main()
{
 v_WorldPosition = (world * vec4(position, 1.0)).xyz;
 gl_Position = worldViewProjection * vec4(position, 1.0);
}
@end
@export clay.skybox.fragment
#define PI 3.1415926
uniform mat4 viewInverse : VIEWINVERSE;
#ifdef EQUIRECTANGULAR
uniform sampler2D environmentMap;
#else
uniform samplerCube environmentMap;
#endif
uniform float lod: 0.0;
varying vec3 v_WorldPosition;
@import clay.util.rgbm
@import clay.util.srgb
@import clay.util.ACES
void main()
{
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(v_WorldPosition - eyePos);
#ifdef EQUIRECTANGULAR
 float phi = acos(V.y);
 float theta = atan(-V.x, V.z) + PI * 0.5;
 vec2 uv = vec2(theta / 2.0 / PI, phi / PI);
 vec4 texel = decodeHDR(texture2D(environmentMap, fract(uv)));
#else
 #if defined(LOD) || defined(SUPPORT_TEXTURE_LOD)
 vec4 texel = decodeHDR(textureCubeLodEXT(environmentMap, V, lod));
 #else
 vec4 texel = decodeHDR(textureCube(environmentMap, V));
 #endif
#endif
#ifdef SRGB_DECODE
 texel = sRGBToLinear(texel);
#endif
#ifdef TONEMAPPING
 texel.rgb = ACESToneMapping(texel.rgb);
#endif
#ifdef SRGB_ENCODE
 texel = linearTosRGB(texel);
#endif
 gl_FragColor = encodeHDR(vec4(texel.rgb, 1.0));
}
@end`;F.import(js);var Cc=Vt.extend(function(){var e=new F({vertex:F.source("clay.skybox.vertex"),fragment:F.source("clay.skybox.fragment")}),t=new Ye({shader:e,depthMask:!1});return{scene:null,geometry:new An,material:t,environmentMap:null,culling:!1,_dummyCamera:new Ge}},function(){var e=this.scene;e&&this.attachScene(e),this.environmentMap&&this.setEnvironmentMap(this.environmentMap)},{attachScene:function(e){this.scene&&this.detachScene(),e.skybox=this,this.scene=e,e.on("beforerender",this._beforeRenderScene,this)},detachScene:function(){this.scene&&(this.scene.off("beforerender",this._beforeRenderScene),this.scene.skybox=null),this.scene=null},dispose:function(e){this.detachScene(),this.geometry.dispose(e)},setEnvironmentMap:function(e){e.textureType==="texture2D"?(this.material.define("EQUIRECTANGULAR"),e.minFilter=V.LINEAR):this.material.undefine("EQUIRECTANGULAR"),this.material.set("environmentMap",e)},getEnvironmentMap:function(){return this.material.get("environmentMap")},_beforeRenderScene:function(e,t,r){this.renderSkybox(e,r)},renderSkybox:function(e,t){var r=this._dummyCamera;r.aspect=e.getViewportAspect(),r.fov=t.fov||50,r.updateProjectionMatrix(),H.invert(r.invProjectionMatrix,r.projectionMatrix),r.worldTransform.copy(t.worldTransform),r.viewMatrix.copy(t.viewMatrix),this.position.copy(t.getWorldPosition()),this.update(),e.gl.disable(e.gl.BLEND),this.material.get("lod")>0?this.material.define("fragment","LOD"):this.material.undefine("fragment","LOD"),e.renderPass([this],r)}}),_r=Cc;var bn=_r;var Mc=542327876;var Pc=131072;var Nc=512;var Rc=4;function Ba(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}var Ic=31,Oc=Ba("DXT1"),Bc=Ba("DXT3"),Fc=Ba("DXT5"),Gc=0,Uc=1,zc=2,Vc=3,Hc=4,kc=7,Wc=20,Xc=21;var jc=28;var Zc={parse:function(e,t){var r=new Int32Array(e,0,Ic);if(r[Gc]!==Mc||!r(Wc)&Rc)return null;var i=r(Xc),n=r[Hc],a=r[Vc],o=r[jc]&Nc,s=r[zc]&Pc,l,f;switch(i){case Oc:l=8,f=V.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case Bc:l=16,f=V.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case Fc:l=16,f=V.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return null}var h=r[Uc]+4,u=o?6:1,d=1;s&&(d=Math.max(1,r[kc]));for(var c=[],m=0;m<u;m++){var p=n,v=a;c[m]=new j({width:p,height:v,format:f});for(var g=[],y=0;y<d;y++){var x=Math.max(4,p)/4*Math.max(4,v)/4*l,_=new Uint8Array(e,h,x);h+=x,p*=.5,v*=.5,g[y]=_}c[m].pixels=g[0],s&&(c[m].mipmaps=g)}if(t)t.width=c[0].width,t.height=c[0].height,t.format=c[0].format,t.pixels=c[0].pixels,t.mipmaps=c[0].mipmaps;else return c[0]}},Zs=Zc;var Ln=String.fromCharCode,Yc=8,qc=32767;function Kc(e,t,r,i){if(e[3]>0){var n=Math.pow(2,e[3]-128-8+i);t[r+0]=e[0]*n,t[r+1]=e[1]*n,t[r+2]=e[2]*n}else t[r+0]=0,t[r+1]=0,t[r+2]=0;return t[r+3]=1,t}function Qc(e,t,r){for(var i="",n=t;n<r;n++)i+=Ln(e[n]);return i}function Jc(e,t){t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3]}function Ys(e,t,r,i){for(var n=0,a=0,o=i;o>0;)if(e[a][0]=t[r++],e[a][1]=t[r++],e[a][2]=t[r++],e[a][3]=t[r++],e[a][0]===1&&e[a][1]===1&&e[a][2]===1){for(var s=e[a][3]<<n>>>0;s>0;s--)Jc(e[a-1],e[a]),a++,o--;n+=8}else a++,o--,n=0;return r}function $c(e,t,r,i){if(i<Yc|i>qc)return Ys(e,t,r,i);var n=t[r++];if(n!=2)return Ys(e,t,r-1,i);if(e[0][1]=t[r++],e[0][2]=t[r++],n=t[r++],(e[0][2]<<8>>>0|n)>>>0!==i)return null;for(var n=0;n<4;n++)for(var a=0;a<i;){var o=t[r++];if(o>128){o=(o&127)>>>0;for(var s=t[r++];o--;)e[a++][n]=s}else for(;o--;)e[a++][n]=t[r++]}return r}var ed={parseRGBE:function(e,t,r){r==null&&(r=0);var i=new Uint8Array(e),n=i.length;if(Qc(i,0,2)==="#?"){for(var a=2;a<n&&!(Ln(i[a])===`
`&&Ln(i[a+1])===`
`);a++);if(!(a>=n)){a+=2;for(var o="";a<n;a++){var s=Ln(i[a]);if(s===`
`)break;o+=s}var l=o.split(" "),f=parseInt(l[1]),h=parseInt(l[3]);if(!(!h||!f)){for(var u=a+1,d=[],c=0;c<h;c++){d[c]=[];for(var m=0;m<4;m++)d[c][m]=0}for(var p=new Float32Array(h*f*4),v=0,g=0;g<f;g++){var u=$c(d,i,u,h);if(!u)return null;for(var c=0;c<h;c++)Kc(d[c],p,v,r),v+=4}return t||(t=new j),t.width=h,t.height=f,t.pixels=p,t.type=V.FLOAT,t}}}},parseRGBEFromPNG:function(e){}},qs=ed;var Dn={loadTexture:function(e,t,r,i){var n;if(typeof t=="function"?(r=t,i=r,t={}):t=t||{},typeof e=="string"){if(e.match(/.hdr$/)||t.fileType==="hdr")return n=new j({width:0,height:0,sRGB:!1}),Dn._fetchTexture(e,function(a){qs.parseRGBE(a,n,t.exposure),n.dirty(),r&&r(n)},i),n;e.match(/.dds$/)||t.fileType==="dds"?(n=new j({width:0,height:0}),Dn._fetchTexture(e,function(a){Zs.parse(a,n),n.dirty(),r&&r(n)},i)):(n=new j,n.load(e),n.success(r),n.error(i))}else typeof e=="object"&&typeof e.px<"u"&&(n=new tr,n.load(e),n.success(r),n.error(i));return n},loadPanorama:function(e,t,r,i,n,a){var o=this;typeof i=="function"?(n=i,a=n,i={}):i=i||{},Dn.loadTexture(t,i,function(s){s.flipY=i.flipY||!1,o.panoramaToCubeMap(e,s,r,i),s.dispose(e),n&&n(r)},a)},panoramaToCubeMap:function(e,t,r,i){var n=new hi,a=new bn({scene:new Lt});return a.setEnvironmentMap(t),i=i||{},i.encodeRGBM&&a.material.define("fragment","RGBM_ENCODE"),r.sRGB=t.sRGB,n.texture=r,n.render(e,a.scene),n.texture=null,n.dispose(e),r},heightToNormal:function(e,t){var r=document.createElement("canvas"),i=r.width=e.width,n=r.height=e.height,a=r.getContext("2d");a.drawImage(e,0,0,i,n),t=t||!1;for(var o=a.getImageData(0,0,i,n),s=a.createImageData(i,n),l=0;l<o.data.length;l+=4){if(t){var f=o.data[l],h=o.data[l+1],u=o.data[l+2],d=Math.abs(f-h)+Math.abs(h-u);if(d>20)return console.warn("Given image is not a height map"),e}var c,m,p,v;l%(i*4)===0?(c=o.data[l],p=o.data[l+4]):l%(i*4)===(i-1)*4?(c=o.data[l-4],p=o.data[l]):(c=o.data[l-4],p=o.data[l+4]),l<i*4?(m=o.data[l],v=o.data[l+i*4]):l>i*(n-1)*4?(m=o.data[l-i*4],v=o.data[l]):(m=o.data[l-i*4],v=o.data[l+i*4]),s.data[l]=c-p+127,s.data[l+1]=m-v+127,s.data[l+2]=255,s.data[l+3]=255}return a.putImageData(s,0,0),r},isHeightImage:function(e,t,r){if(!e||!e.width||!e.height)return!1;var i=document.createElement("canvas"),n=i.getContext("2d"),a=t||32;r=r||20,i.width=i.height=a,n.drawImage(e,0,0,a,a);for(var o=n.getImageData(0,0,a,a),s=0;s<o.data.length;s+=4){var l=o.data[s],f=o.data[s+1],h=o.data[s+2],u=Math.abs(l-f)+Math.abs(f-h);if(u>r)return!1}return!0},_fetchTexture:function(e,t,r){me.request.get({url:e,responseType:"arraybuffer",onload:t,onerror:r})},createChessboard:function(e,t,r,i){e=e||512,t=t||64,r=r||"black",i=i||"white";var n=Math.ceil(e/t),a=document.createElement("canvas");a.width=e,a.height=e;var o=a.getContext("2d");o.fillStyle=i,o.fillRect(0,0,e,e),o.fillStyle=r;for(var s=0;s<n;s++)for(var l=0;l<n;l++){var f=l%2?s%2:s%2-1;f&&o.fillRect(s*t,l*t,t,t)}var h=new j({image:a,anisotropic:8});return h},createBlank:function(e){var t=document.createElement("canvas");t.width=1,t.height=1;var r=t.getContext("2d");r.fillStyle=e,r.fillRect(0,0,1,1);var i=new j({image:t});return i}},Yt=Dn;var Fa=["mousedown","mouseup","mousemove","mouseover","mouseout","click","dblclick","contextmenu"];function Ga(e){return"_on"+e}var Ua=function(e){var t=this;this._texture=new j({anisotropic:32,flipY:!1,surface:this,dispose:function(r){t.dispose(),j.prototype.dispose.call(this,r)}}),Fa.forEach(function(r){this[Ga(r)]=function(i){i.triangle&&this._meshes.forEach(function(n){this.dispatchEvent(r,n,i.triangle,i.point)},this)}},this),this._meshes=[],e&&this.setECharts(e),this.onupdate=null};Ua.prototype={constructor:Ua,getTexture:function(){return this._texture},setECharts:function(e){this._chart=e;var t=e.getDom();if(!(t instanceof HTMLCanvasElement))console.error("ECharts must init on canvas if it is used as texture."),t=document.createElement("canvas");else{var r=this,i=e.getZr(),n=i.__oldRefreshImmediately||i.refreshImmediately;i.refreshImmediately=function(){n.call(this),r._texture.dirty(),r.onupdate&&r.onupdate()},i.__oldRefreshImmediately=n}this._texture.image=t,this._texture.dirty(),this.onupdate&&this.onupdate()},dispatchEvent:(function(){var e=new R,t=new R,r=new R,i=new nt,n=new nt,a=new nt,o=new nt,s=new R;return function(l,f,h,u){var d=f.geometry,c=d.attributes.position,m=d.attributes.texcoord0,p=R.dot,v=R.cross;c.get(h[0],e.array),c.get(h[1],t.array),c.get(h[2],r.array),m.get(h[0],i.array),m.get(h[1],n.array),m.get(h[2],a.array),v(s,t,r);var g=p(e,s),y=p(u,s)/g;v(s,r,e);var x=p(u,s)/g;v(s,e,t);var _=p(u,s)/g;nt.scale(o,i,y),nt.scaleAndAdd(o,o,n,x),nt.scaleAndAdd(o,o,a,_);var S=o.x*this._chart.getWidth(),E=o.y*this._chart.getHeight();this._chart.getZr().handler.dispatch(l,{zrX:S,zrY:E})}})(),attachToMesh:function(e){this._meshes.indexOf(e)>=0||(Fa.forEach(function(t){e.on(t,this[Ga(t)],this)},this),this._meshes.push(e))},detachFromMesh:function(e){var t=this._meshes.indexOf(e);t>=0&&this._meshes.splice(t,1),Fa.forEach(function(r){e.off(r,this[Ga(r)])},this)},dispose:function(){this._meshes.forEach(function(e){this.detachFromMesh(e)},this)}};var Ks=Ua;var td=er.extend({left:-1,right:1,near:-1,far:1,top:1,bottom:-1},{updateProjectionMatrix:function(){this.projectionMatrix.ortho(this.left,this.right,this.bottom,this.top,this.near,this.far)},decomposeProjectionMatrix:function(){var e=this.projectionMatrix.array;this.left=(-1-e[12])/e[0],this.right=(1-e[12])/e[0],this.top=(1-e[13])/e[5],this.bottom=(-1-e[13])/e[5],this.near=-(-1-e[14])/e[10],this.far=-(1-e[14])/e[10]},clone:function(){var e=er.prototype.clone.call(this);return e.left=this.left,e.right=this.right,e.near=this.near,e.far=this.far,e.top=this.top,e.bottom=this.bottom,e}}),kt=td;var Qs=`
@export clay.compositor.vertex
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
attribute vec3 position : POSITION;
attribute vec2 texcoord : TEXCOORD_0;
varying vec2 v_Texcoord;
void main()
{
 v_Texcoord = texcoord;
 gl_Position = worldViewProjection * vec4(position, 1.0);
}
@end`;F.import(Qs);var rd=new gr,Js=new Vt({geometry:rd,frustumCulling:!1}),id=new kt,nd=xe.extend(function(){return{fragment:"",outputs:null,material:null,blendWithPrevious:!1,clearColor:!1,clearDepth:!0}},function(){var e=new F(F.source("clay.compositor.vertex"),this.fragment),t=new Ye({shader:e});t.enableTexturesAll(),this.material=t},{setUniform:function(e,t){this.material.setUniform(e,t)},getUniform:function(e){var t=this.material.uniforms[e];if(t)return t.value},attachOutput:function(e,t){this.outputs||(this.outputs={}),t=t||D.COLOR_ATTACHMENT0,this.outputs[t]=e},detachOutput:function(e){for(var t in this.outputs)this.outputs[t]===e&&(this.outputs[t]=null)},bind:function(e,t){if(this.outputs)for(var r in this.outputs){var i=this.outputs[r];i&&t.attach(i,r)}t&&t.bind(e)},unbind:function(e,t){t.unbind(e)},render:function(e,t){var r=e.gl;if(t){this.bind(e,t);var i=e.getGLExtension("EXT_draw_buffers");if(i&&this.outputs){var n=[];for(var a in this.outputs)a=+a,a>=r.COLOR_ATTACHMENT0&&a<=r.COLOR_ATTACHMENT0+8&&n.push(a);i.drawBuffersEXT(n)}}this.trigger("beforerender",this,e);var o=this.clearDepth?r.DEPTH_BUFFER_BIT:0;if(r.depthMask(!0),this.clearColor){o=o|r.COLOR_BUFFER_BIT,r.colorMask(!0,!0,!0,!0);var s=this.clearColor;Array.isArray(s)&&r.clearColor(s[0],s[1],s[2],s[3])}r.clear(o),this.blendWithPrevious?(r.enable(r.BLEND),this.material.transparent=!0):(r.disable(r.BLEND),this.material.transparent=!1),this.renderQuad(e),this.trigger("afterrender",this,e),t&&this.unbind(e,t)},renderQuad:function(e){Js.material=this.material,e.renderPass([Js],id)},dispose:function(e){}}),ge=nd;var $s=`#define SAMPLE_NUMBER 1024
#define PI 3.14159265358979
uniform sampler2D normalDistribution;
uniform vec2 viewportSize : [512, 256];
const vec3 N = vec3(0.0, 0.0, 1.0);
const float fSampleNumber = float(SAMPLE_NUMBER);
vec3 importanceSampleNormal(float i, float roughness, vec3 N) {
 vec3 H = texture2D(normalDistribution, vec2(roughness, i)).rgb;
 vec3 upVector = abs(N.y) > 0.999 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
 vec3 tangentX = normalize(cross(N, upVector));
 vec3 tangentZ = cross(N, tangentX);
 return normalize(tangentX * H.x + N * H.y + tangentZ * H.z);
}
float G_Smith(float roughness, float NoV, float NoL) {
 float k = roughness * roughness / 2.0;
 float G1V = NoV / (NoV * (1.0 - k) + k);
 float G1L = NoL / (NoL * (1.0 - k) + k);
 return G1L * G1V;
}
void main() {
 vec2 uv = gl_FragCoord.xy / viewportSize;
 float NoV = uv.x;
 float roughness = uv.y;
 vec3 V;
 V.x = sqrt(1.0 - NoV * NoV);
 V.y = 0.0;
 V.z = NoV;
 float A = 0.0;
 float B = 0.0;
 for (int i = 0; i < SAMPLE_NUMBER; i++) {
 vec3 H = importanceSampleNormal(float(i) / fSampleNumber, roughness, N);
 vec3 L = reflect(-V, H);
 float NoL = clamp(L.z, 0.0, 1.0);
 float NoH = clamp(H.z, 0.0, 1.0);
 float VoH = clamp(dot(V, H), 0.0, 1.0);
 if (NoL > 0.0) {
 float G = G_Smith(roughness, NoV, NoL);
 float G_Vis = G * VoH / (NoH * NoV);
 float Fc = pow(1.0 - VoH, 5.0);
 A += (1.0 - Fc) * G_Vis;
 B += Fc * G_Vis;
 }
 }
 gl_FragColor = vec4(vec2(A, B) / fSampleNumber, 0.0, 1.0);
}
`;var el=`#define SHADER_NAME prefilter
#define SAMPLE_NUMBER 1024
#define PI 3.14159265358979
uniform mat4 viewInverse : VIEWINVERSE;
uniform samplerCube environmentMap;
uniform sampler2D normalDistribution;
uniform float roughness : 0.5;
varying vec2 v_Texcoord;
varying vec3 v_WorldPosition;
@import clay.util.rgbm
vec3 importanceSampleNormal(float i, float roughness, vec3 N) {
 vec3 H = texture2D(normalDistribution, vec2(roughness, i)).rgb;
 vec3 upVector = abs(N.y) > 0.999 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
 vec3 tangentX = normalize(cross(N, upVector));
 vec3 tangentZ = cross(N, tangentX);
 return normalize(tangentX * H.x + N * H.y + tangentZ * H.z);
}
void main() {
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(v_WorldPosition - eyePos);
 vec3 N = V;
 vec3 prefilteredColor = vec3(0.0);
 float totalWeight = 0.0;
 float fMaxSampleNumber = float(SAMPLE_NUMBER);
 for (int i = 0; i < SAMPLE_NUMBER; i++) {
 vec3 H = importanceSampleNormal(float(i) / fMaxSampleNumber, roughness, N);
 vec3 L = reflect(-V, H);
 float NoL = clamp(dot(N, L), 0.0, 1.0);
 if (NoL > 0.0) {
 prefilteredColor += decodeHDR(textureCube(environmentMap, L)).rgb * NoL;
 totalWeight += NoL;
 }
 }
 gl_FragColor = encodeHDR(vec4(prefilteredColor / totalWeight, 1.0));
}
`;var Ur={},za=["px","nx","py","ny","pz","nz"];Ur.prefilterEnvironmentMap=function(e,t,r,i,n){(!n||!i)&&(i=Ur.generateNormalDistribution(),n=Ur.integrateBRDF(e,i)),r=r||{};var a=r.width||64,o=r.height||64,s=r.type||t.type,l=new tr({width:a,height:o,type:s,flipY:!1,mipmaps:[]});l.isPowerOfTwo()||console.warn("Width and height must be power of two to enable mipmap.");var f=Math.min(a,o),h=Math.log(f)/Math.log(2)+1,u=new Ye({shader:new F({vertex:F.source("clay.skybox.vertex"),fragment:el})});u.set("normalDistribution",i),r.encodeRGBM&&u.define("fragment","RGBM_ENCODE"),r.decodeRGBM&&u.define("fragment","RGBM_DECODE");var d=new Lt,c;if(t.textureType==="texture2D"){var m=new tr({width:a,height:o,type:s===V.FLOAT?V.HALF_FLOAT:s});Yt.panoramaToCubeMap(e,t,m,{encodeRGBM:r.decodeRGBM}),t=m}c=new _r({scene:d,material:u}),c.material.set("environmentMap",t);var p=new hi({texture:l});r.encodeRGBM&&(s=l.type=V.UNSIGNED_BYTE);for(var v=new j({width:a,height:o,type:s}),g=new ve({depthBuffer:!1}),y=me[s===V.UNSIGNED_BYTE?"Uint8Array":"Float32Array"],x=0;x<h;x++){l.mipmaps[x]={pixels:{}},c.material.set("roughness",x/(h-1));for(var _=v.width,S=2*Math.atan(_/(_-.5))/Math.PI*180,E=0;E<za.length;E++){var b=new y(v.width*v.height*4);g.attach(v),g.bind(e);var A=p.getCamera(za[E]);A.fov=S,e.render(d,A),e.gl.readPixels(0,0,v.width,v.height,V.RGBA,s,b),g.unbind(e),l.mipmaps[x].pixels[za[E]]=b}v.width/=2,v.height/=2,v.dirty()}return g.dispose(e),v.dispose(e),c.dispose(e),i.dispose(e),{environmentMap:l,brdfLookup:n,normalDistribution:i,maxMipmapLevel:h}};Ur.integrateBRDF=function(e,t){t=t||Ur.generateNormalDistribution();var r=new ve({depthBuffer:!1}),i=new ge({fragment:$s}),n=new j({width:512,height:256,type:V.HALF_FLOAT,wrapS:V.CLAMP_TO_EDGE,wrapT:V.CLAMP_TO_EDGE,minFilter:V.NEAREST,magFilter:V.NEAREST,useMipmap:!1});return i.setUniform("normalDistribution",t),i.setUniform("viewportSize",[512,256]),i.attachOutput(n),i.render(e,r),r.dispose(e),n};Ur.generateNormalDistribution=function(r,i){for(var r=r||256,i=i||1024,n=new j({width:r,height:i,type:V.FLOAT,minFilter:V.NEAREST,magFilter:V.NEAREST,wrapS:V.CLAMP_TO_EDGE,wrapT:V.CLAMP_TO_EDGE,useMipmap:!1}),a=new Float32Array(i*r*4),o=[],s=0;s<r;s++){for(var l=s/r,f=l*l,h=0;h<i;h++){var u=(h<<16|h>>>16)>>>0;u=((u&1431655765)<<1|(u&2863311530)>>>1)>>>0,u=((u&858993459)<<2|(u&3435973836)>>>2)>>>0,u=((u&252645135)<<4|(u&4042322160)>>>4)>>>0,u=(((u&16711935)<<8|(u&4278255360)>>>8)>>>0)/4294967296;var d=Math.sqrt((1-u)/(1+(f*f-1)*u));o[h]=d}for(var h=0;h<i;h++){var c=(h*r+s)*4,d=o[h],m=Math.sqrt(1-d*d),p=h/i,v=2*Math.PI*p;a[c]=m*Math.cos(v),a[c+1]=d,a[c+2]=m*Math.sin(v),a[c+3]=1}}return n.pixels=a,n};var ci=Ur;var ad=ot.extend({cubemap:null,castShadow:!1,_normalDistribution:null,_brdfLookup:null},{type:"AMBIENT_CUBEMAP_LIGHT",prefilter:function(e,t){if(!e.getGLExtension("EXT_shader_texture_lod")){console.warn("Device not support textureCubeLodEXT");return}this._brdfLookup||(this._normalDistribution=ci.generateNormalDistribution(),this._brdfLookup=ci.integrateBRDF(e,this._normalDistribution));var r=this.cubemap;if(!r.__prefiltered){var i=ci.prefilterEnvironmentMap(e,r,{encodeRGBM:!0,width:t,height:t},this._normalDistribution,this._brdfLookup);this.cubemap=i.environmentMap,this.cubemap.__prefiltered=!0,r.dispose(e)}},getBRDFLookup:function(){return this._brdfLookup},uniformTemplates:{ambientCubemapLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}},ambientCubemapLightCubemap:{type:"t",value:function(e){return e.cubemap}},ambientCubemapLightBRDFLookup:{type:"t",value:function(e){return e._brdfLookup}}}}),tl=ad;var od=ot.extend({castShadow:!1,coefficients:[]},function(){this._coefficientsTmpArr=new me.Float32Array(27)},{type:"AMBIENT_SH_LIGHT",uniformTemplates:{ambientSHLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}},ambientSHLightCoefficients:{type:"3f",value:function(e){for(var t=e._coefficientsTmpArr,r=0;r<e.coefficients.length;r++)t[r]=e.coefficients[r];return t}}}}),rl=od;var il={},zr=["px","nx","py","ny","pz","nz"];function sd(e,t){var r=e[0],i=e[1],n=e[2];return t===0?1:t===1?r:t===2?i:t===3?n:t===4?r*n:t===5?i*n:t===6?r*i:t===7?3*n*n-1:r*r-i*i}var ld={px:[2,1,0,-1,-1,1],nx:[2,1,0,1,-1,-1],py:[0,2,1,1,-1,-1],ny:[0,2,1,1,1,1],pz:[0,1,2,-1,-1,-1],nz:[0,1,2,1,-1,1]};function fd(e,t,r,i){for(var n=new me.Float32Array(27),a=w.create(),o=w.create(),s=w.create(),l=0;l<9;l++){for(var f=w.create(),h=0;h<zr.length;h++){for(var u=t[zr[h]],d=w.create(),c=0,m=0,p=ld[zr[h]],v=0;v<i;v++)for(var g=0;g<r;g++){a[0]=g/(r-1)*2-1,a[1]=v/(i-1)*2-1,a[2]=-1,w.normalize(a,a),s[0]=a[p[0]]*p[3],s[1]=a[p[1]]*p[4],s[2]=a[p[2]]*p[5],o[0]=u[m++]/255,o[1]=u[m++]/255,o[2]=u[m++]/255;var y=u[m++]/255*8.12;o[0]*=y,o[1]*=y,o[2]*=y,w.scaleAndAdd(d,d,o,sd(s,l)*-a[2]),c+=-a[2]}w.scaleAndAdd(f,f,d,1/c)}n[l*3]=f[0]/6,n[l*3+1]=f[1]/6,n[l*3+2]=f[2]/6}return n}il.projectEnvironmentMap=function(e,t,r){r=r||{},r.lod=r.lod||0;var i,n=new Lt,a=64;t.textureType==="texture2D"?i=new bn({scene:n,environmentMap:t}):(a=t.image&&t.image.px?t.image.px.width:t.width,i=new _r({scene:n,environmentMap:t}));var o=Math.ceil(a/Math.pow(2,r.lod)),s=Math.ceil(a/Math.pow(2,r.lod)),l=new j({width:o,height:s}),f=new ve;i.material.define("fragment","RGBM_ENCODE"),r.decodeRGBM&&i.material.define("fragment","RGBM_DECODE"),i.material.set("lod",r.lod);for(var h=new hi({texture:l}),u={},d=0;d<zr.length;d++){u[zr[d]]=new Uint8Array(o*s*4);var c=h.getCamera(zr[d]);c.fov=90,f.attach(l),f.bind(e),e.render(n,c),e.gl.readPixels(0,0,o,s,V.RGBA,V.UNSIGNED_BYTE,u[zr[d]]),f.unbind(e)}return i.dispose(e),f.dispose(e),l.dispose(e),fd(e,u,o,s)};var nl=il;var hd={firstNotNull:function(){for(var e=0,t=arguments.length;e<t;e++)if(arguments[e]!=null)return arguments[e]},queryDataIndex:function(e,t){if(t.dataIndexInside!=null)return t.dataIndexInside;if(t.dataIndex!=null)return N.isArray(t.dataIndex)?N.map(t.dataIndex,function(r){return e.indexOfRawIndex(r)}):e.indexOfRawIndex(t.dataIndex);if(t.name!=null)return N.isArray(t.name)?N.map(t.name,function(r){return e.indexOfName(r)}):e.indexOfName(t.name)}},Z=hd;var ud=ee.extend({dynamic:!1,widthSegments:40,heightSegments:20,phiStart:0,phiLength:Math.PI*2,thetaStart:0,thetaLength:Math.PI,radius:1},function(){this.build()},{build:function(){var e=this.heightSegments,t=this.widthSegments,r=this.attributes.position,i=this.attributes.texcoord0,n=this.attributes.normal,a=(t+1)*(e+1);r.init(a),i.init(a),n.init(a);var o=a>65535?Uint32Array:Uint16Array,s=this.indices=new o(t*e*6),l,f,h,u,d,c,m,x=this.radius,p=this.phiStart,v=this.phiLength,g=this.thetaStart,y=this.thetaLength,x=this.radius,_=[],S=[],E=0,b=1/x;for(m=0;m<=e;m++)for(c=0;c<=t;c++)u=c/t,d=m/e,l=-x*Math.cos(p+u*v)*Math.sin(g+d*y),f=x*Math.cos(g+d*y),h=x*Math.sin(p+u*v)*Math.sin(g+d*y),_[0]=l,_[1]=f,_[2]=h,S[0]=u,S[1]=d,r.set(E,_),i.set(E,S),_[0]*=b,_[1]*=b,_[2]*=b,n.set(E,_),E++;var A,L,P,C,I=t+1,B=0;for(m=0;m<e;m++)for(c=0;c<t;c++)L=m*I+c,A=m*I+c+1,C=(m+1)*I+c+1,P=(m+1)*I+c,s[B++]=A,s[B++]=L,s[B++]=C,s[B++]=L,s[B++]=P,s[B++]=C;this.boundingBox=new Fe,this.boundingBox.max.set(x,x,x),this.boundingBox.min.set(-x,-x,-x)}}),al=ud;var cd=ot.extend({castShadow:!1},{type:"AMBIENT_LIGHT",uniformTemplates:{ambientLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}}}}),ol=cd;var dd=ot.extend({shadowBias:.001,shadowSlopeScale:2,shadowCascade:1,cascadeSplitLogFactor:.2},{type:"DIRECTIONAL_LIGHT",uniformTemplates:{directionalLightDirection:{type:"3f",value:function(e){return e.__dir=e.__dir||new R,e.__dir.copy(e.worldTransform.z).normalize().negate().array}},directionalLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}}},clone:function(){var e=ot.prototype.clone.call(this);return e.shadowBias=this.shadowBias,e.shadowSlopeScale=this.shadowSlopeScale,e}}),sl=dd;var md=ot.extend({range:100,castShadow:!1},{type:"POINT_LIGHT",uniformTemplates:{pointLightPosition:{type:"3f",value:function(e){return e.getWorldPosition().array}},pointLightRange:{type:"1f",value:function(e){return e.range}},pointLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}}},clone:function(){var e=ot.prototype.clone.call(this);return e.range=this.range,e}}),ll=md;var pd=ot.extend({range:20,umbraAngle:30,penumbraAngle:45,falloffFactor:2,shadowBias:.001,shadowSlopeScale:2},{type:"SPOT_LIGHT",uniformTemplates:{spotLightPosition:{type:"3f",value:function(e){return e.getWorldPosition().array}},spotLightRange:{type:"1f",value:function(e){return e.range}},spotLightUmbraAngleCosine:{type:"1f",value:function(e){return Math.cos(e.umbraAngle*Math.PI/180)}},spotLightPenumbraAngleCosine:{type:"1f",value:function(e){return Math.cos(e.penumbraAngle*Math.PI/180)}},spotLightFalloffFactor:{type:"1f",value:function(e){return e.falloffFactor}},spotLightDirection:{type:"3f",value:function(e){return e.__dir=e.__dir||new R,e.__dir.copy(e.worldTransform.z).negate().array}},spotLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}}},clone:function(){var e=ot.prototype.clone.call(this);return e.range=this.range,e.umbraAngle=this.umbraAngle,e.penumbraAngle=this.penumbraAngle,e.falloffFactor=this.falloffFactor,e.shadowBias=this.shadowBias,e.shadowSlopeScale=this.shadowSlopeScale,e}}),fl=pd;var fe=function(e,t,r,i){e=e||0,t=t||0,r=r||0,i=i||0,this.array=z.fromValues(e,t,r,i),this._dirty=!0};fe.prototype={constructor:fe,add:function(e){return z.add(this.array,this.array,e.array),this._dirty=!0,this},set:function(e,t,r,i){return this.array[0]=e,this.array[1]=t,this.array[2]=r,this.array[3]=i,this._dirty=!0,this},setArray:function(e){return this.array[0]=e[0],this.array[1]=e[1],this.array[2]=e[2],this.array[3]=e[3],this._dirty=!0,this},clone:function(){return new fe(this.x,this.y,this.z,this.w)},copy:function(e){return z.copy(this.array,e.array),this._dirty=!0,this},dist:function(e){return z.dist(this.array,e.array)},distance:function(e){return z.distance(this.array,e.array)},div:function(e){return z.div(this.array,this.array,e.array),this._dirty=!0,this},divide:function(e){return z.divide(this.array,this.array,e.array),this._dirty=!0,this},dot:function(e){return z.dot(this.array,e.array)},len:function(){return z.len(this.array)},length:function(){return z.length(this.array)},lerp:function(e,t,r){return z.lerp(this.array,e.array,t.array,r),this._dirty=!0,this},min:function(e){return z.min(this.array,this.array,e.array),this._dirty=!0,this},max:function(e){return z.max(this.array,this.array,e.array),this._dirty=!0,this},mul:function(e){return z.mul(this.array,this.array,e.array),this._dirty=!0,this},multiply:function(e){return z.multiply(this.array,this.array,e.array),this._dirty=!0,this},negate:function(){return z.negate(this.array,this.array),this._dirty=!0,this},normalize:function(){return z.normalize(this.array,this.array),this._dirty=!0,this},random:function(e){return z.random(this.array,e),this._dirty=!0,this},scale:function(e){return z.scale(this.array,this.array,e),this._dirty=!0,this},scaleAndAdd:function(e,t){return z.scaleAndAdd(this.array,this.array,e.array,t),this._dirty=!0,this},sqrDist:function(e){return z.sqrDist(this.array,e.array)},squaredDistance:function(e){return z.squaredDistance(this.array,e.array)},sqrLen:function(){return z.sqrLen(this.array)},squaredLength:function(){return z.squaredLength(this.array)},sub:function(e){return z.sub(this.array,this.array,e.array),this._dirty=!0,this},subtract:function(e){return z.subtract(this.array,this.array,e.array),this._dirty=!0,this},transformMat4:function(e){return z.transformMat4(this.array,this.array,e.array),this._dirty=!0,this},transformQuat:function(e){return z.transformQuat(this.array,this.array,e.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};var Gi=Object.defineProperty;Gi&&(Ui=fe.prototype,Gi(Ui,"x",{get:function(){return this.array[0]},set:function(e){this.array[0]=e,this._dirty=!0}}),Gi(Ui,"y",{get:function(){return this.array[1]},set:function(e){this.array[1]=e,this._dirty=!0}}),Gi(Ui,"z",{get:function(){return this.array[2]},set:function(e){this.array[2]=e,this._dirty=!0}}),Gi(Ui,"w",{get:function(){return this.array[3]},set:function(e){this.array[3]=e,this._dirty=!0}}));var Ui;fe.add=function(e,t,r){return z.add(e.array,t.array,r.array),e._dirty=!0,e};fe.set=function(e,t,r,i,n){z.set(e.array,t,r,i,n),e._dirty=!0};fe.copy=function(e,t){return z.copy(e.array,t.array),e._dirty=!0,e};fe.dist=function(e,t){return z.distance(e.array,t.array)};fe.distance=fe.dist;fe.div=function(e,t,r){return z.divide(e.array,t.array,r.array),e._dirty=!0,e};fe.divide=fe.div;fe.dot=function(e,t){return z.dot(e.array,t.array)};fe.len=function(e){return z.length(e.array)};fe.lerp=function(e,t,r,i){return z.lerp(e.array,t.array,r.array,i),e._dirty=!0,e};fe.min=function(e,t,r){return z.min(e.array,t.array,r.array),e._dirty=!0,e};fe.max=function(e,t,r){return z.max(e.array,t.array,r.array),e._dirty=!0,e};fe.mul=function(e,t,r){return z.multiply(e.array,t.array,r.array),e._dirty=!0,e};fe.multiply=fe.mul;fe.negate=function(e,t){return z.negate(e.array,t.array),e._dirty=!0,e};fe.normalize=function(e,t){return z.normalize(e.array,t.array),e._dirty=!0,e};fe.random=function(e,t){return z.random(e.array,t),e._dirty=!0,e};fe.scale=function(e,t,r){return z.scale(e.array,t.array,r),e._dirty=!0,e};fe.scaleAndAdd=function(e,t,r,i){return z.scaleAndAdd(e.array,t.array,r.array,i),e._dirty=!0,e};fe.sqrDist=function(e,t){return z.sqrDist(e.array,t.array)};fe.squaredDistance=fe.sqrDist;fe.sqrLen=function(e){return z.sqrLen(e.array)};fe.squaredLength=fe.sqrLen;fe.sub=function(e,t,r){return z.subtract(e.array,t.array,r.array),e._dirty=!0,e};fe.subtract=fe.sub;fe.transformMat4=function(e,t,r){return z.transformMat4(e.array,t.array,r.array),e._dirty=!0,e};fe.transformQuat=function(e,t,r){return z.transformQuat(e.array,t.array,r.array),e._dirty=!0,e};var hl=fe;var ht={};ht.create=function(){var e=new Ce(4);return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e};ht.clone=function(e){var t=new Ce(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t};ht.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e};ht.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e};ht.transpose=function(e,t){if(e===t){var r=t[1];e[1]=t[2],e[2]=r}else e[0]=t[0],e[1]=t[2],e[2]=t[1],e[3]=t[3];return e};ht.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r*a-n*i;return o?(o=1/o,e[0]=a*o,e[1]=-i*o,e[2]=-n*o,e[3]=r*o,e):null};ht.adjoint=function(e,t){var r=t[0];return e[0]=t[3],e[1]=-t[1],e[2]=-t[2],e[3]=r,e};ht.determinant=function(e){return e[0]*e[3]-e[2]*e[1]};ht.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=r[0],l=r[1],f=r[2],h=r[3];return e[0]=i*s+a*l,e[1]=n*s+o*l,e[2]=i*f+a*h,e[3]=n*f+o*h,e};ht.mul=ht.multiply;ht.rotate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+a*s,e[1]=n*l+o*s,e[2]=i*-s+a*l,e[3]=n*-s+o*l,e};ht.scale=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=r[0],l=r[1];return e[0]=i*s,e[1]=n*s,e[2]=a*l,e[3]=o*l,e};ht.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2))};ht.LDU=function(e,t,r,i){return e[2]=i[2]/i[0],r[0]=i[0],r[1]=i[1],r[3]=i[3]-e[2]*r[1],[e,t,r]};var Ie=ht;var vt=function(){this.array=Ie.create(),this._dirty=!0};vt.prototype={constructor:vt,setArray:function(e){for(var t=0;t<this.array.length;t++)this.array[t]=e[t];return this._dirty=!0,this},clone:function(){return new vt().copy(this)},copy:function(e){return Ie.copy(this.array,e.array),this._dirty=!0,this},adjoint:function(){return Ie.adjoint(this.array,this.array),this._dirty=!0,this},determinant:function(){return Ie.determinant(this.array)},identity:function(){return Ie.identity(this.array),this._dirty=!0,this},invert:function(){return Ie.invert(this.array,this.array),this._dirty=!0,this},mul:function(e){return Ie.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return Ie.mul(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return Ie.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return Ie.multiply(this.array,e.array,this.array),this._dirty=!0,this},rotate:function(e){return Ie.rotate(this.array,this.array,e),this._dirty=!0,this},scale:function(e){return Ie.scale(this.array,this.array,e.array),this._dirty=!0,this},transpose:function(){return Ie.transpose(this.array,this.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};vt.adjoint=function(e,t){return Ie.adjoint(e.array,t.array),e._dirty=!0,e};vt.copy=function(e,t){return Ie.copy(e.array,t.array),e._dirty=!0,e};vt.determinant=function(e){return Ie.determinant(e.array)};vt.identity=function(e){return Ie.identity(e.array),e._dirty=!0,e};vt.invert=function(e,t){return Ie.invert(e.array,t.array),e._dirty=!0,e};vt.mul=function(e,t,r){return Ie.mul(e.array,t.array,r.array),e._dirty=!0,e};vt.multiply=vt.mul;vt.rotate=function(e,t,r){return Ie.rotate(e.array,t.array,r),e._dirty=!0,e};vt.scale=function(e,t,r){return Ie.scale(e.array,t.array,r.array),e._dirty=!0,e};vt.transpose=function(e,t){return Ie.transpose(e.array,t.array),e._dirty=!0,e};var ul=vt;var xt={};xt.create=function(){var e=new Ce(6);return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e};xt.clone=function(e){var t=new Ce(6);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t};xt.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e};xt.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e};xt.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=r*a-i*n;return l?(l=1/l,e[0]=a*l,e[1]=-i*l,e[2]=-n*l,e[3]=r*l,e[4]=(n*s-a*o)*l,e[5]=(i*o-r*s)*l,e):null};xt.determinant=function(e){return e[0]*e[3]-e[1]*e[2]};xt.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],f=r[0],h=r[1],u=r[2],d=r[3],c=r[4],m=r[5];return e[0]=i*f+a*h,e[1]=n*f+o*h,e[2]=i*u+a*d,e[3]=n*u+o*d,e[4]=i*c+a*m+s,e[5]=n*c+o*m+l,e};xt.mul=xt.multiply;xt.rotate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],f=Math.sin(r),h=Math.cos(r);return e[0]=i*h+a*f,e[1]=n*h+o*f,e[2]=i*-f+a*h,e[3]=n*-f+o*h,e[4]=s,e[5]=l,e};xt.scale=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],f=r[0],h=r[1];return e[0]=i*f,e[1]=n*f,e[2]=a*h,e[3]=o*h,e[4]=s,e[5]=l,e};xt.translate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],f=r[0],h=r[1];return e[0]=i,e[1]=n,e[2]=a,e[3]=o,e[4]=i*f+a*h+s,e[5]=n*f+o*h+l,e};xt.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+1)};var Ve=xt;var yt=function(){this.array=Ve.create(),this._dirty=!0};yt.prototype={constructor:yt,setArray:function(e){for(var t=0;t<this.array.length;t++)this.array[t]=e[t];return this._dirty=!0,this},clone:function(){return new yt().copy(this)},copy:function(e){return Ve.copy(this.array,e.array),this._dirty=!0,this},determinant:function(){return Ve.determinant(this.array)},identity:function(){return Ve.identity(this.array),this._dirty=!0,this},invert:function(){return Ve.invert(this.array,this.array),this._dirty=!0,this},mul:function(e){return Ve.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return Ve.mul(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return Ve.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return Ve.multiply(this.array,e.array,this.array),this._dirty=!0,this},rotate:function(e){return Ve.rotate(this.array,this.array,e),this._dirty=!0,this},scale:function(e){return Ve.scale(this.array,this.array,e.array),this._dirty=!0,this},translate:function(e){return Ve.translate(this.array,this.array,e.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};yt.copy=function(e,t){return Ve.copy(e.array,t.array),e._dirty=!0,e};yt.determinant=function(e){return Ve.determinant(e.array)};yt.identity=function(e){return Ve.identity(e.array),e._dirty=!0,e};yt.invert=function(e,t){return Ve.invert(e.array,t.array),e._dirty=!0,e};yt.mul=function(e,t,r){return Ve.mul(e.array,t.array,r.array),e._dirty=!0,e};yt.multiply=yt.mul;yt.rotate=function(e,t,r){return Ve.rotate(e.array,t.array,r),e._dirty=!0,e};yt.scale=function(e,t,r){return Ve.scale(e.array,t.array,r.array),e._dirty=!0,e};yt.translate=function(e,t,r){return Ve.translate(e.array,t.array,r.array),e._dirty=!0,e};var cl=yt;var Qe=function(){this.array=ie.create(),this._dirty=!0};Qe.prototype={constructor:Qe,setArray:function(e){for(var t=0;t<this.array.length;t++)this.array[t]=e[t];return this._dirty=!0,this},adjoint:function(){return ie.adjoint(this.array,this.array),this._dirty=!0,this},clone:function(){return new Qe().copy(this)},copy:function(e){return ie.copy(this.array,e.array),this._dirty=!0,this},determinant:function(){return ie.determinant(this.array)},fromMat2d:function(e){return ie.fromMat2d(this.array,e.array),this._dirty=!0,this},fromMat4:function(e){return ie.fromMat4(this.array,e.array),this._dirty=!0,this},fromQuat:function(e){return ie.fromQuat(this.array,e.array),this._dirty=!0,this},identity:function(){return ie.identity(this.array),this._dirty=!0,this},invert:function(){return ie.invert(this.array,this.array),this._dirty=!0,this},mul:function(e){return ie.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return ie.mul(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return ie.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return ie.multiply(this.array,e.array,this.array),this._dirty=!0,this},rotate:function(e){return ie.rotate(this.array,this.array,e),this._dirty=!0,this},scale:function(e){return ie.scale(this.array,this.array,e.array),this._dirty=!0,this},translate:function(e){return ie.translate(this.array,this.array,e.array),this._dirty=!0,this},normalFromMat4:function(e){return ie.normalFromMat4(this.array,e.array),this._dirty=!0,this},transpose:function(){return ie.transpose(this.array,this.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};Qe.adjoint=function(e,t){return ie.adjoint(e.array,t.array),e._dirty=!0,e};Qe.copy=function(e,t){return ie.copy(e.array,t.array),e._dirty=!0,e};Qe.determinant=function(e){return ie.determinant(e.array)};Qe.identity=function(e){return ie.identity(e.array),e._dirty=!0,e};Qe.invert=function(e,t){return ie.invert(e.array,t.array),e};Qe.mul=function(e,t,r){return ie.mul(e.array,t.array,r.array),e._dirty=!0,e};Qe.multiply=Qe.mul;Qe.fromMat2d=function(e,t){return ie.fromMat2d(e.array,t.array),e._dirty=!0,e};Qe.fromMat4=function(e,t){return ie.fromMat4(e.array,t.array),e._dirty=!0,e};Qe.fromQuat=function(e,t){return ie.fromQuat(e.array,t.array),e._dirty=!0,e};Qe.normalFromMat4=function(e,t){return ie.normalFromMat4(e.array,t.array),e._dirty=!0,e};Qe.rotate=function(e,t,r){return ie.rotate(e.array,t.array,r),e._dirty=!0,e};Qe.scale=function(e,t,r){return ie.scale(e.array,t.array,r.array),e._dirty=!0,e};Qe.transpose=function(e,t){return ie.transpose(e.array,t.array),e._dirty=!0,e};Qe.translate=function(e,t,r){return ie.translate(e.array,t.array,r.array),e._dirty=!0,e};var dl=Qe;var vd={_animators:null,getAnimators:function(){return this._animators=this._animators||[],this._animators},animate:function(e,t){this._animators=this._animators||[];var r=this,i;if(e){for(var n=e.split("."),a=r,o=0,s=n.length;o<s;o++)a&&(a=a[n[o]]);a&&(i=a)}else i=r;if(i==null)throw new Error("Target "+e+" not exists");var l=this._animators,f=new Uo(i,t),h=this;return f.during(function(){h.__zr&&h.__zr.refresh()}).done(function(){var u=l.indexOf(f);u>=0&&l.splice(u,1)}),l.push(f),this.__zr&&this.__zr.animation.addAnimator(f),f},stopAnimation:function(e){this._animators=this._animators||[];for(var t=this._animators,r=t.length,i=0;i<r;i++)t[i].stop(e);return t.length=0,this},addAnimatorsToZr:function(e){if(this._animators)for(var t=0;t<this._animators.length;t++)e.animation.addAnimator(this._animators[t])},removeAnimatorsFromZr:function(e){if(this._animators)for(var t=0;t<this._animators.length;t++)e.animation.removeAnimator(this._animators[t])}},ml=vd;var Cn=`
@export clay.util.rand
highp float rand(vec2 uv) {
 const highp float a = 12.9898, b = 78.233, c = 43758.5453;
 highp float dt = dot(uv.xy, vec2(a,b)), sn = mod(dt, 3.141592653589793);
 return fract(sin(sn) * c);
}
@end
@export clay.util.calculate_attenuation
uniform float attenuationFactor : 5.0;
float lightAttenuation(float dist, float range)
{
 float attenuation = 1.0;
 attenuation = dist*dist/(range*range+1.0);
 float att_s = attenuationFactor;
 attenuation = 1.0/(attenuation*att_s+1.0);
 att_s = 1.0/(att_s+1.0);
 attenuation = attenuation - att_s;
 attenuation /= 1.0 - att_s;
 return clamp(attenuation, 0.0, 1.0);
}
@end
@export clay.util.edge_factor
#ifdef SUPPORT_STANDARD_DERIVATIVES
float edgeFactor(float width)
{
 vec3 d = fwidth(v_Barycentric);
 vec3 a3 = smoothstep(vec3(0.0), d * width, v_Barycentric);
 return min(min(a3.x, a3.y), a3.z);
}
#else
float edgeFactor(float width)
{
 return 1.0;
}
#endif
@end
@export clay.util.encode_float
vec4 encodeFloat(const in float depth)
{
 const vec4 bitShifts = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);
 const vec4 bit_mask = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);
 vec4 res = fract(depth * bitShifts);
 res -= res.xxyz * bit_mask;
 return res;
}
@end
@export clay.util.decode_float
float decodeFloat(const in vec4 color)
{
 const vec4 bitShifts = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
 return dot(color, bitShifts);
}
@end
@export clay.util.float
@import clay.util.encode_float
@import clay.util.decode_float
@end
@export clay.util.rgbm_decode
vec3 RGBMDecode(vec4 rgbm, float range) {
 return range * rgbm.rgb * rgbm.a;
}
@end
@export clay.util.rgbm_encode
vec4 RGBMEncode(vec3 color, float range) {
 if (dot(color, color) == 0.0) {
 return vec4(0.0);
 }
 vec4 rgbm;
 color /= range;
 rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6)), 0.0, 1.0);
 rgbm.a = ceil(rgbm.a * 255.0) / 255.0;
 rgbm.rgb = color / rgbm.a;
 return rgbm;
}
@end
@export clay.util.rgbm
@import clay.util.rgbm_decode
@import clay.util.rgbm_encode
vec4 decodeHDR(vec4 color)
{
#if defined(RGBM_DECODE) || defined(RGBM)
 return vec4(RGBMDecode(color, 8.12), 1.0);
#else
 return color;
#endif
}
vec4 encodeHDR(vec4 color)
{
#if defined(RGBM_ENCODE) || defined(RGBM)
 return RGBMEncode(color.xyz, 8.12);
#else
 return color;
#endif
}
@end
@export clay.util.srgb
vec4 sRGBToLinear(in vec4 value) {
 return vec4(mix(pow(value.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), value.rgb * 0.0773993808, vec3(lessThanEqual(value.rgb, vec3(0.04045)))), value.w);
}
vec4 linearTosRGB(in vec4 value) {
 return vec4(mix(pow(value.rgb, vec3(0.41666)) * 1.055 - vec3(0.055), value.rgb * 12.92, vec3(lessThanEqual(value.rgb, vec3(0.0031308)))), value.w);
}
@end
@export clay.chunk.skinning_header
#ifdef SKINNING
attribute vec3 weight : WEIGHT;
attribute vec4 joint : JOINT;
#ifdef USE_SKIN_MATRICES_TEXTURE
uniform sampler2D skinMatricesTexture : ignore;
uniform float skinMatricesTextureSize: ignore;
mat4 getSkinMatrix(sampler2D tex, float idx) {
 float j = idx * 4.0;
 float x = mod(j, skinMatricesTextureSize);
 float y = floor(j / skinMatricesTextureSize) + 0.5;
 vec2 scale = vec2(skinMatricesTextureSize);
 return mat4(
 texture2D(tex, vec2(x + 0.5, y) / scale),
 texture2D(tex, vec2(x + 1.5, y) / scale),
 texture2D(tex, vec2(x + 2.5, y) / scale),
 texture2D(tex, vec2(x + 3.5, y) / scale)
 );
}
mat4 getSkinMatrix(float idx) {
 return getSkinMatrix(skinMatricesTexture, idx);
}
#else
uniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;
mat4 getSkinMatrix(float idx) {
 return skinMatrix[int(idx)];
}
#endif
#endif
@end
@export clay.chunk.skin_matrix
mat4 skinMatrixWS = getSkinMatrix(joint.x) * weight.x;
if (weight.y > 1e-4)
{
 skinMatrixWS += getSkinMatrix(joint.y) * weight.y;
}
if (weight.z > 1e-4)
{
 skinMatrixWS += getSkinMatrix(joint.z) * weight.z;
}
float weightW = 1.0-weight.x-weight.y-weight.z;
if (weightW > 1e-4)
{
 skinMatrixWS += getSkinMatrix(joint.w) * weightW;
}
@end
@export clay.chunk.instancing_header
#ifdef INSTANCING
attribute vec4 instanceMat1;
attribute vec4 instanceMat2;
attribute vec4 instanceMat3;
#endif
@end
@export clay.chunk.instancing_matrix
mat4 instanceMat = mat4(
 vec4(instanceMat1.xyz, 0.0),
 vec4(instanceMat2.xyz, 0.0),
 vec4(instanceMat3.xyz, 0.0),
 vec4(instanceMat1.w, instanceMat2.w, instanceMat3.w, 1.0)
);
@end
@export clay.util.parallax_correct
vec3 parallaxCorrect(in vec3 dir, in vec3 pos, in vec3 boxMin, in vec3 boxMax) {
 vec3 first = (boxMax - pos) / dir;
 vec3 second = (boxMin - pos) / dir;
 vec3 further = max(first, second);
 float dist = min(further.x, min(further.y, further.z));
 vec3 fixedPos = pos + dir * dist;
 vec3 boxCenter = (boxMax + boxMin) * 0.5;
 return normalize(fixedPos - boxCenter);
}
@end
@export clay.util.clamp_sample
vec4 clampSample(const in sampler2D texture, const in vec2 coord)
{
#ifdef STEREO
 float eye = step(0.5, coord.x) * 0.5;
 vec2 coordClamped = clamp(coord, vec2(eye, 0.0), vec2(0.5 + eye, 1.0));
#else
 vec2 coordClamped = clamp(coord, vec2(0.0), vec2(1.0));
#endif
 return texture2D(texture, coordClamped);
}
@end
@export clay.util.ACES
vec3 ACESToneMapping(vec3 color)
{
 const float A = 2.51;
 const float B = 0.03;
 const float C = 2.43;
 const float D = 0.59;
 const float E = 0.14;
 return (color * (A * color + B)) / (color * (C * color + D) + E);
}
@end`;var pl=`
@export ecgl.common.transformUniforms
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform mat4 worldInverseTranspose : WORLDINVERSETRANSPOSE;
uniform mat4 world : WORLD;
@end

@export ecgl.common.attributes
attribute vec3 position : POSITION;
attribute vec2 texcoord : TEXCOORD_0;
attribute vec3 normal : NORMAL;
@end

@export ecgl.common.uv.header
uniform vec2 uvRepeat : [1.0, 1.0];
uniform vec2 uvOffset : [0.0, 0.0];
uniform vec2 detailUvRepeat : [1.0, 1.0];
uniform vec2 detailUvOffset : [0.0, 0.0];

varying vec2 v_Texcoord;
varying vec2 v_DetailTexcoord;
@end

@export ecgl.common.uv.main
v_Texcoord = texcoord * uvRepeat + uvOffset;
v_DetailTexcoord = texcoord * detailUvRepeat + detailUvOffset;
@end

@export ecgl.common.uv.fragmentHeader
varying vec2 v_Texcoord;
varying vec2 v_DetailTexcoord;
@end


@export ecgl.common.albedo.main

 vec4 albedoTexel = vec4(1.0);
#ifdef DIFFUSEMAP_ENABLED
 albedoTexel = texture2D(diffuseMap, v_Texcoord);
 #ifdef SRGB_DECODE
 albedoTexel = sRGBToLinear(albedoTexel);
 #endif
#endif

#ifdef DETAILMAP_ENABLED
 vec4 detailTexel = texture2D(detailMap, v_DetailTexcoord);
 #ifdef SRGB_DECODE
 detailTexel = sRGBToLinear(detailTexel);
 #endif
 albedoTexel.rgb = mix(albedoTexel.rgb, detailTexel.rgb, detailTexel.a);
 albedoTexel.a = detailTexel.a + (1.0 - detailTexel.a) * albedoTexel.a;
#endif

@end

@export ecgl.common.wireframe.vertexHeader

#ifdef WIREFRAME_QUAD
attribute vec4 barycentric;
varying vec4 v_Barycentric;
#elif defined(WIREFRAME_TRIANGLE)
attribute vec3 barycentric;
varying vec3 v_Barycentric;
#endif

@end

@export ecgl.common.wireframe.vertexMain

#if defined(WIREFRAME_QUAD) || defined(WIREFRAME_TRIANGLE)
 v_Barycentric = barycentric;
#endif

@end


@export ecgl.common.wireframe.fragmentHeader

uniform float wireframeLineWidth : 1;
uniform vec4 wireframeLineColor: [0, 0, 0, 0.5];

#ifdef WIREFRAME_QUAD
varying vec4 v_Barycentric;
float edgeFactor () {
 vec4 d = fwidth(v_Barycentric);
 vec4 a4 = smoothstep(vec4(0.0), d * wireframeLineWidth, v_Barycentric);
 return min(min(min(a4.x, a4.y), a4.z), a4.w);
}
#elif defined(WIREFRAME_TRIANGLE)
varying vec3 v_Barycentric;
float edgeFactor () {
 vec3 d = fwidth(v_Barycentric);
 vec3 a3 = smoothstep(vec3(0.0), d * wireframeLineWidth, v_Barycentric);
 return min(min(a3.x, a3.y), a3.z);
}
#endif

@end


@export ecgl.common.wireframe.fragmentMain

#if defined(WIREFRAME_QUAD) || defined(WIREFRAME_TRIANGLE)
 if (wireframeLineWidth > 0.) {
 vec4 lineColor = wireframeLineColor;
#ifdef SRGB_DECODE
 lineColor = sRGBToLinear(lineColor);
#endif

 gl_FragColor.rgb = mix(gl_FragColor.rgb, lineColor.rgb, (1.0 - edgeFactor()) * lineColor.a);
 }
#endif
@end




@export ecgl.common.bumpMap.header

#ifdef BUMPMAP_ENABLED
uniform sampler2D bumpMap;
uniform float bumpScale : 1.0;


vec3 bumpNormal(vec3 surfPos, vec3 surfNormal, vec3 baseNormal)
{
 vec2 dSTdx = dFdx(v_Texcoord);
 vec2 dSTdy = dFdy(v_Texcoord);

 float Hll = bumpScale * texture2D(bumpMap, v_Texcoord).x;
 float dHx = bumpScale * texture2D(bumpMap, v_Texcoord + dSTdx).x - Hll;
 float dHy = bumpScale * texture2D(bumpMap, v_Texcoord + dSTdy).x - Hll;

 vec3 vSigmaX = dFdx(surfPos);
 vec3 vSigmaY = dFdy(surfPos);
 vec3 vN = surfNormal;

 vec3 R1 = cross(vSigmaY, vN);
 vec3 R2 = cross(vN, vSigmaX);

 float fDet = dot(vSigmaX, R1);

 vec3 vGrad = sign(fDet) * (dHx * R1 + dHy * R2);
 return normalize(abs(fDet) * baseNormal - vGrad);

}
#endif

@end

@export ecgl.common.normalMap.vertexHeader

#ifdef NORMALMAP_ENABLED
attribute vec4 tangent : TANGENT;
varying vec3 v_Tangent;
varying vec3 v_Bitangent;
#endif

@end

@export ecgl.common.normalMap.vertexMain

#ifdef NORMALMAP_ENABLED
 if (dot(tangent, tangent) > 0.0) {
 v_Tangent = normalize((worldInverseTranspose * vec4(tangent.xyz, 0.0)).xyz);
 v_Bitangent = normalize(cross(v_Normal, v_Tangent) * tangent.w);
 }
#endif

@end


@export ecgl.common.normalMap.fragmentHeader

#ifdef NORMALMAP_ENABLED
uniform sampler2D normalMap;
varying vec3 v_Tangent;
varying vec3 v_Bitangent;
#endif

@end

@export ecgl.common.normalMap.fragmentMain
#ifdef NORMALMAP_ENABLED
 if (dot(v_Tangent, v_Tangent) > 0.0) {
 vec3 normalTexel = texture2D(normalMap, v_DetailTexcoord).xyz;
 if (dot(normalTexel, normalTexel) > 0.0) { N = normalTexel * 2.0 - 1.0;
 mat3 tbn = mat3(v_Tangent, v_Bitangent, v_Normal);
 N = normalize(tbn * N);
 }
 }
#endif
@end



@export ecgl.common.vertexAnimation.header

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
attribute vec3 prevNormal;
uniform float percent;
#endif

@end

@export ecgl.common.vertexAnimation.main

#ifdef VERTEX_ANIMATION
 vec3 pos = mix(prevPosition, position, percent);
 vec3 norm = mix(prevNormal, normal, percent);
#else
 vec3 pos = position;
 vec3 norm = normal;
#endif

@end


@export ecgl.common.ssaoMap.header
#ifdef SSAOMAP_ENABLED
uniform sampler2D ssaoMap;
uniform vec4 viewport : VIEWPORT;
#endif
@end

@export ecgl.common.ssaoMap.main
 float ao = 1.0;
#ifdef SSAOMAP_ENABLED
 ao = texture2D(ssaoMap, (gl_FragCoord.xy - viewport.xy) / viewport.zw).r;
#endif
@end




@export ecgl.common.diffuseLayer.header

#if (LAYER_DIFFUSEMAP_COUNT > 0)
uniform float layerDiffuseIntensity[LAYER_DIFFUSEMAP_COUNT];
uniform sampler2D layerDiffuseMap[LAYER_DIFFUSEMAP_COUNT];
#endif

@end

@export ecgl.common.emissiveLayer.header

#if (LAYER_EMISSIVEMAP_COUNT > 0)
uniform float layerEmissionIntensity[LAYER_EMISSIVEMAP_COUNT];
uniform sampler2D layerEmissiveMap[LAYER_EMISSIVEMAP_COUNT];
#endif

@end

@export ecgl.common.layers.header
@import ecgl.common.diffuseLayer.header
@import ecgl.common.emissiveLayer.header
@end

@export ecgl.common.diffuseLayer.main

#if (LAYER_DIFFUSEMAP_COUNT > 0)
 for (int _idx_ = 0; _idx_ < LAYER_DIFFUSEMAP_COUNT; _idx_++) {{
 float intensity = layerDiffuseIntensity[_idx_];
 vec4 texel2 = texture2D(layerDiffuseMap[_idx_], v_Texcoord);
 #ifdef SRGB_DECODE
 texel2 = sRGBToLinear(texel2);
 #endif
 albedoTexel.rgb = mix(albedoTexel.rgb, texel2.rgb * intensity, texel2.a);
 albedoTexel.a = texel2.a + (1.0 - texel2.a) * albedoTexel.a;
 }}
#endif

@end

@export ecgl.common.emissiveLayer.main

#if (LAYER_EMISSIVEMAP_COUNT > 0)
 for (int _idx_ = 0; _idx_ < LAYER_EMISSIVEMAP_COUNT; _idx_++)
 {{
 vec4 texel2 = texture2D(layerEmissiveMap[_idx_], v_Texcoord) * layerEmissionIntensity[_idx_];
 #ifdef SRGB_DECODE
 texel2 = sRGBToLinear(texel2);
 #endif
 float intensity = layerEmissionIntensity[_idx_];
 gl_FragColor.rgb += texel2.rgb * texel2.a * intensity;
 }}
#endif

@end
`;var vl=`@export ecgl.color.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

@import ecgl.common.uv.header

attribute vec2 texcoord : TEXCOORD_0;
attribute vec3 position: POSITION;

@import ecgl.common.wireframe.vertexHeader

#ifdef VERTEX_COLOR
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;
#endif

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
uniform float percent : 1.0;
#endif

#ifdef ATMOSPHERE_ENABLED
attribute vec3 normal: NORMAL;
uniform mat4 worldInverseTranspose : WORLDINVERSETRANSPOSE;
varying vec3 v_Normal;
#endif

void main()
{
#ifdef VERTEX_ANIMATION
 vec3 pos = mix(prevPosition, position, percent);
#else
 vec3 pos = position;
#endif

 gl_Position = worldViewProjection * vec4(pos, 1.0);

 @import ecgl.common.uv.main

#ifdef VERTEX_COLOR
 v_Color = a_Color;
#endif

#ifdef ATMOSPHERE_ENABLED
 v_Normal = normalize((worldInverseTranspose * vec4(normal, 0.0)).xyz);
#endif

 @import ecgl.common.wireframe.vertexMain

}

@end

@export ecgl.color.fragment

#define LAYER_DIFFUSEMAP_COUNT 0
#define LAYER_EMISSIVEMAP_COUNT 0

uniform sampler2D diffuseMap;
uniform sampler2D detailMap;

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

#ifdef ATMOSPHERE_ENABLED
uniform mat4 viewTranspose: VIEWTRANSPOSE;
uniform vec3 glowColor;
uniform float glowPower;
varying vec3 v_Normal;
#endif

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif

@import ecgl.common.layers.header

@import ecgl.common.uv.fragmentHeader

@import ecgl.common.wireframe.fragmentHeader

@import clay.util.srgb

void main()
{
#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color);
#else
 gl_FragColor = color;
#endif

#ifdef VERTEX_COLOR
 gl_FragColor *= v_Color;
#endif

 @import ecgl.common.albedo.main

 @import ecgl.common.diffuseLayer.main

 gl_FragColor *= albedoTexel;

#ifdef ATMOSPHERE_ENABLED
 float atmoIntensity = pow(1.0 - dot(v_Normal, (viewTranspose * vec4(0.0, 0.0, 1.0, 0.0)).xyz), glowPower);
 gl_FragColor.rgb += glowColor * atmoIntensity;
#endif

 @import ecgl.common.emissiveLayer.main

 @import ecgl.common.wireframe.fragmentMain

}
@end`;var gl=`/**
 * http: */

@export ecgl.lambert.vertex

@import ecgl.common.transformUniforms

@import ecgl.common.uv.header


@import ecgl.common.attributes

@import ecgl.common.wireframe.vertexHeader

#ifdef VERTEX_COLOR
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;
#endif


@import ecgl.common.vertexAnimation.header


varying vec3 v_Normal;
varying vec3 v_WorldPosition;

void main()
{
 @import ecgl.common.uv.main

 @import ecgl.common.vertexAnimation.main


 gl_Position = worldViewProjection * vec4(pos, 1.0);

 v_Normal = normalize((worldInverseTranspose * vec4(norm, 0.0)).xyz);
 v_WorldPosition = (world * vec4(pos, 1.0)).xyz;

#ifdef VERTEX_COLOR
 v_Color = a_Color;
#endif

 @import ecgl.common.wireframe.vertexMain
}

@end


@export ecgl.lambert.fragment

#define LAYER_DIFFUSEMAP_COUNT 0
#define LAYER_EMISSIVEMAP_COUNT 0

#define NORMAL_UP_AXIS 1
#define NORMAL_FRONT_AXIS 2

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform sampler2D diffuseMap;
uniform sampler2D detailMap;

@import ecgl.common.layers.header

uniform float emissionIntensity: 1.0;

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

uniform mat4 viewInverse : VIEWINVERSE;

#ifdef ATMOSPHERE_ENABLED
uniform mat4 viewTranspose: VIEWTRANSPOSE;
uniform vec3 glowColor;
uniform float glowPower;
#endif

#ifdef AMBIENT_LIGHT_COUNT
@import clay.header.ambient_light
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
@import clay.header.ambient_sh_light
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif


@import ecgl.common.ssaoMap.header

@import ecgl.common.bumpMap.header

@import clay.util.srgb

@import ecgl.common.wireframe.fragmentHeader

@import clay.plugin.compute_shadow_map

void main()
{
#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color);
#else
 gl_FragColor = color;
#endif

#ifdef VERTEX_COLOR
 #ifdef SRGB_DECODE
 gl_FragColor *= sRGBToLinear(v_Color);
 #else
 gl_FragColor *= v_Color;
 #endif
#endif

 @import ecgl.common.albedo.main

 @import ecgl.common.diffuseLayer.main

 gl_FragColor *= albedoTexel;

 vec3 N = v_Normal;
#ifdef DOUBLE_SIDED
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(eyePos - v_WorldPosition);

 if (dot(N, V) < 0.0) {
 N = -N;
 }
#endif

 float ambientFactor = 1.0;

#ifdef BUMPMAP_ENABLED
 N = bumpNormal(v_WorldPosition, v_Normal, N);
 ambientFactor = dot(v_Normal, N);
#endif

 vec3 N2 = vec3(N.x, N[NORMAL_UP_AXIS], N[NORMAL_FRONT_AXIS]);

 vec3 diffuseColor = vec3(0.0, 0.0, 0.0);

 @import ecgl.common.ssaoMap.main

#ifdef AMBIENT_LIGHT_COUNT
 for(int i = 0; i < AMBIENT_LIGHT_COUNT; i++)
 {
 diffuseColor += ambientLightColor[i] * ambientFactor * ao;
 }
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
 for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)
 {{
 diffuseColor += calcAmbientSHLight(_idx_, N2) * ambientSHLightColor[_idx_] * ao;
 }}
#endif
#ifdef DIRECTIONAL_LIGHT_COUNT
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
 if(shadowEnabled)
 {
 computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
 }
#endif
 for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++)
 {
 vec3 lightDirection = -directionalLightDirection[i];
 vec3 lightColor = directionalLightColor[i];

 float shadowContrib = 1.0;
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 if (shadowEnabled)
 {
 shadowContrib = shadowContribsDir[i];
 }
#endif

 float ndl = dot(N, normalize(lightDirection)) * shadowContrib;

 diffuseColor += lightColor * clamp(ndl, 0.0, 1.0);
 }
#endif

 gl_FragColor.rgb *= diffuseColor;

#ifdef ATMOSPHERE_ENABLED
 float atmoIntensity = pow(1.0 - dot(v_Normal, (viewTranspose * vec4(0.0, 0.0, 1.0, 0.0)).xyz), glowPower);
 gl_FragColor.rgb += glowColor * atmoIntensity;
#endif

 @import ecgl.common.emissiveLayer.main

 @import ecgl.common.wireframe.fragmentMain
}

@end`;var _l=`@export ecgl.realistic.vertex

@import ecgl.common.transformUniforms

@import ecgl.common.uv.header

@import ecgl.common.attributes


@import ecgl.common.wireframe.vertexHeader

#ifdef VERTEX_COLOR
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;
#endif

#ifdef NORMALMAP_ENABLED
attribute vec4 tangent : TANGENT;
varying vec3 v_Tangent;
varying vec3 v_Bitangent;
#endif

@import ecgl.common.vertexAnimation.header

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

void main()
{

 @import ecgl.common.uv.main

 @import ecgl.common.vertexAnimation.main

 gl_Position = worldViewProjection * vec4(pos, 1.0);

 v_Normal = normalize((worldInverseTranspose * vec4(norm, 0.0)).xyz);
 v_WorldPosition = (world * vec4(pos, 1.0)).xyz;

#ifdef VERTEX_COLOR
 v_Color = a_Color;
#endif

#ifdef NORMALMAP_ENABLED
 v_Tangent = normalize((worldInverseTranspose * vec4(tangent.xyz, 0.0)).xyz);
 v_Bitangent = normalize(cross(v_Normal, v_Tangent) * tangent.w);
#endif

 @import ecgl.common.wireframe.vertexMain

}

@end



@export ecgl.realistic.fragment

#define LAYER_DIFFUSEMAP_COUNT 0
#define LAYER_EMISSIVEMAP_COUNT 0
#define PI 3.14159265358979
#define ROUGHNESS_CHANEL 0
#define METALNESS_CHANEL 1

#define NORMAL_UP_AXIS 1
#define NORMAL_FRONT_AXIS 2

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform sampler2D diffuseMap;

uniform sampler2D detailMap;
uniform sampler2D metalnessMap;
uniform sampler2D roughnessMap;

@import ecgl.common.layers.header

uniform float emissionIntensity: 1.0;

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

uniform float metalness : 0.0;
uniform float roughness : 0.5;

uniform mat4 viewInverse : VIEWINVERSE;

#ifdef ATMOSPHERE_ENABLED
uniform mat4 viewTranspose: VIEWTRANSPOSE;
uniform vec3 glowColor;
uniform float glowPower;
#endif

#ifdef AMBIENT_LIGHT_COUNT
@import clay.header.ambient_light
#endif

#ifdef AMBIENT_SH_LIGHT_COUNT
@import clay.header.ambient_sh_light
#endif

#ifdef AMBIENT_CUBEMAP_LIGHT_COUNT
@import clay.header.ambient_cubemap_light
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

@import ecgl.common.normalMap.fragmentHeader

@import ecgl.common.ssaoMap.header

@import ecgl.common.bumpMap.header

@import clay.util.srgb

@import clay.util.rgbm

@import ecgl.common.wireframe.fragmentHeader

@import clay.plugin.compute_shadow_map

vec3 F_Schlick(float ndv, vec3 spec) {
 return spec + (1.0 - spec) * pow(1.0 - ndv, 5.0);
}

float D_Phong(float g, float ndh) {
 float a = pow(8192.0, g);
 return (a + 2.0) / 8.0 * pow(ndh, a);
}

void main()
{
 vec4 albedoColor = color;

 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(eyePos - v_WorldPosition);
#ifdef VERTEX_COLOR
 #ifdef SRGB_DECODE
 albedoColor *= sRGBToLinear(v_Color);
 #else
 albedoColor *= v_Color;
 #endif
#endif

 @import ecgl.common.albedo.main

 @import ecgl.common.diffuseLayer.main

 albedoColor *= albedoTexel;

 float m = metalness;

#ifdef METALNESSMAP_ENABLED
 float m2 = texture2D(metalnessMap, v_DetailTexcoord)[METALNESS_CHANEL];
 m = clamp(m2 + (m - 0.5) * 2.0, 0.0, 1.0);
#endif

 vec3 baseColor = albedoColor.rgb;
 albedoColor.rgb = baseColor * (1.0 - m);
 vec3 specFactor = mix(vec3(0.04), baseColor, m);

 float g = 1.0 - roughness;

#ifdef ROUGHNESSMAP_ENABLED
 float g2 = 1.0 - texture2D(roughnessMap, v_DetailTexcoord)[ROUGHNESS_CHANEL];
 g = clamp(g2 + (g - 0.5) * 2.0, 0.0, 1.0);
#endif

 vec3 N = v_Normal;

#ifdef DOUBLE_SIDED
 if (dot(N, V) < 0.0) {
 N = -N;
 }
#endif

 float ambientFactor = 1.0;

#ifdef BUMPMAP_ENABLED
 N = bumpNormal(v_WorldPosition, v_Normal, N);
 ambientFactor = dot(v_Normal, N);
#endif

@import ecgl.common.normalMap.fragmentMain

 vec3 N2 = vec3(N.x, N[NORMAL_UP_AXIS], N[NORMAL_FRONT_AXIS]);

 vec3 diffuseTerm = vec3(0.0);
 vec3 specularTerm = vec3(0.0);

 float ndv = clamp(dot(N, V), 0.0, 1.0);
 vec3 fresnelTerm = F_Schlick(ndv, specFactor);

 @import ecgl.common.ssaoMap.main

#ifdef AMBIENT_LIGHT_COUNT
 for(int _idx_ = 0; _idx_ < AMBIENT_LIGHT_COUNT; _idx_++)
 {{
 diffuseTerm += ambientLightColor[_idx_] * ambientFactor * ao;
 }}
#endif

#ifdef AMBIENT_SH_LIGHT_COUNT
 for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)
 {{
 diffuseTerm += calcAmbientSHLight(_idx_, N2) * ambientSHLightColor[_idx_] * ao;
 }}
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
 if(shadowEnabled)
 {
 computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
 }
#endif
 for(int _idx_ = 0; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++)
 {{
 vec3 L = -directionalLightDirection[_idx_];
 vec3 lc = directionalLightColor[_idx_];

 vec3 H = normalize(L + V);
 float ndl = clamp(dot(N, normalize(L)), 0.0, 1.0);
 float ndh = clamp(dot(N, H), 0.0, 1.0);

 float shadowContrib = 1.0;
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 if (shadowEnabled)
 {
 shadowContrib = shadowContribsDir[_idx_];
 }
#endif

 vec3 li = lc * ndl * shadowContrib;

 diffuseTerm += li;
 specularTerm += li * fresnelTerm * D_Phong(g, ndh);
 }}
#endif


#ifdef AMBIENT_CUBEMAP_LIGHT_COUNT
 vec3 L = reflect(-V, N);
 L = vec3(L.x, L[NORMAL_UP_AXIS], L[NORMAL_FRONT_AXIS]);
 float rough2 = clamp(1.0 - g, 0.0, 1.0);
 float bias2 = rough2 * 5.0;
 vec2 brdfParam2 = texture2D(ambientCubemapLightBRDFLookup[0], vec2(rough2, ndv)).xy;
 vec3 envWeight2 = specFactor * brdfParam2.x + brdfParam2.y;
 vec3 envTexel2;
 for(int _idx_ = 0; _idx_ < AMBIENT_CUBEMAP_LIGHT_COUNT; _idx_++)
 {{
 envTexel2 = RGBMDecode(textureCubeLodEXT(ambientCubemapLightCubemap[_idx_], L, bias2), 8.12);
 specularTerm += ambientCubemapLightColor[_idx_] * envTexel2 * envWeight2 * ao;
 }}
#endif

 gl_FragColor.rgb = albedoColor.rgb * diffuseTerm + specularTerm;
 gl_FragColor.a = albedoColor.a;

#ifdef ATMOSPHERE_ENABLED
 float atmoIntensity = pow(1.0 - dot(v_Normal, (viewTranspose * vec4(0.0, 0.0, 1.0, 0.0)).xyz), glowPower);
 gl_FragColor.rgb += glowColor * atmoIntensity;
#endif

#ifdef SRGB_ENCODE
 gl_FragColor = linearTosRGB(gl_FragColor);
#endif

 @import ecgl.common.emissiveLayer.main

 @import ecgl.common.wireframe.fragmentMain
}

@end`;var xl=`@export ecgl.hatching.vertex

@import ecgl.realistic.vertex

@end


@export ecgl.hatching.fragment

#define NORMAL_UP_AXIS 1
#define NORMAL_FRONT_AXIS 2

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform vec4 color : [0.0, 0.0, 0.0, 1.0];
uniform vec4 paperColor : [1.0, 1.0, 1.0, 1.0];

uniform mat4 viewInverse : VIEWINVERSE;

#ifdef AMBIENT_LIGHT_COUNT
@import clay.header.ambient_light
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
@import clay.header.ambient_sh_light
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif


@import ecgl.common.ssaoMap.header

@import ecgl.common.bumpMap.header

@import clay.util.srgb

@import ecgl.common.wireframe.fragmentHeader

@import clay.plugin.compute_shadow_map

uniform sampler2D hatch1;
uniform sampler2D hatch2;
uniform sampler2D hatch3;
uniform sampler2D hatch4;
uniform sampler2D hatch5;
uniform sampler2D hatch6;

float shade(in float tone) {
 vec4 c = vec4(1. ,1., 1., 1.);
 float step = 1. / 6.;
 vec2 uv = v_DetailTexcoord;
 if (tone <= step / 2.0) {
 c = mix(vec4(0.), texture2D(hatch6, uv), 12. * tone);
 }
 else if (tone <= step) {
 c = mix(texture2D(hatch6, uv), texture2D(hatch5, uv), 6. * tone);
 }
 if(tone > step && tone <= 2. * step){
 c = mix(texture2D(hatch5, uv), texture2D(hatch4, uv) , 6. * (tone - step));
 }
 if(tone > 2. * step && tone <= 3. * step){
 c = mix(texture2D(hatch4, uv), texture2D(hatch3, uv), 6. * (tone - 2. * step));
 }
 if(tone > 3. * step && tone <= 4. * step){
 c = mix(texture2D(hatch3, uv), texture2D(hatch2, uv), 6. * (tone - 3. * step));
 }
 if(tone > 4. * step && tone <= 5. * step){
 c = mix(texture2D(hatch2, uv), texture2D(hatch1, uv), 6. * (tone - 4. * step));
 }
 if(tone > 5. * step){
 c = mix(texture2D(hatch1, uv), vec4(1.), 6. * (tone - 5. * step));
 }

 return c.r;
}

const vec3 w = vec3(0.2125, 0.7154, 0.0721);

void main()
{
#ifdef SRGB_DECODE
 vec4 inkColor = sRGBToLinear(color);
#else
 vec4 inkColor = color;
#endif

#ifdef VERTEX_COLOR
 #ifdef SRGB_DECODE
 inkColor *= sRGBToLinear(v_Color);
 #else
 inkColor *= v_Color;
 #endif
#endif

 vec3 N = v_Normal;
#ifdef DOUBLE_SIDED
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(eyePos - v_WorldPosition);

 if (dot(N, V) < 0.0) {
 N = -N;
 }
#endif

 float tone = 0.0;

 float ambientFactor = 1.0;

#ifdef BUMPMAP_ENABLED
 N = bumpNormal(v_WorldPosition, v_Normal, N);
 ambientFactor = dot(v_Normal, N);
#endif

 vec3 N2 = vec3(N.x, N[NORMAL_UP_AXIS], N[NORMAL_FRONT_AXIS]);

 @import ecgl.common.ssaoMap.main

#ifdef AMBIENT_LIGHT_COUNT
 for(int i = 0; i < AMBIENT_LIGHT_COUNT; i++)
 {
 tone += dot(ambientLightColor[i], w) * ambientFactor * ao;
 }
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
 for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)
 {{
 tone += dot(calcAmbientSHLight(_idx_, N2) * ambientSHLightColor[_idx_], w) * ao;
 }}
#endif
#ifdef DIRECTIONAL_LIGHT_COUNT
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
 if(shadowEnabled)
 {
 computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
 }
#endif
 for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++)
 {
 vec3 lightDirection = -directionalLightDirection[i];
 float lightTone = dot(directionalLightColor[i], w);

 float shadowContrib = 1.0;
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 if (shadowEnabled)
 {
 shadowContrib = shadowContribsDir[i];
 }
#endif

 float ndl = dot(N, normalize(lightDirection)) * shadowContrib;

 tone += lightTone * clamp(ndl, 0.0, 1.0);
 }
#endif

 gl_FragColor = mix(inkColor, paperColor, shade(clamp(tone, 0.0, 1.0)));
 }
@end
`;var yl=`@export ecgl.sm.depth.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec3 position : POSITION;
attribute vec2 texcoord : TEXCOORD_0;

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
uniform float percent : 1.0;
#endif

varying vec4 v_ViewPosition;
varying vec2 v_Texcoord;

void main(){

#ifdef VERTEX_ANIMATION
 vec3 pos = mix(prevPosition, position, percent);
#else
 vec3 pos = position;
#endif

 v_ViewPosition = worldViewProjection * vec4(pos, 1.0);
 gl_Position = v_ViewPosition;

 v_Texcoord = texcoord;

}
@end



@export ecgl.sm.depth.fragment

@import clay.sm.depth.fragment

@end`;Object.assign(mt.prototype,ml);F.import(Cn);F.import(ln);F.import(pl);F.import(vl);F.import(gl);F.import(_l);F.import(xl);F.import(yl);function gd(e){return!e||e==="none"}function Sl(e){return e instanceof HTMLCanvasElement||e instanceof HTMLImageElement||e instanceof Image}function _d(e){return e.getZr&&e.setOption}var xd=Lt.prototype.addToScene,yd=Lt.prototype.removeFromScene;Lt.prototype.addToScene=function(e){if(xd.call(this,e),this.__zr){var t=this.__zr;e.traverse(function(r){r.__zr=t,r.addAnimatorsToZr&&r.addAnimatorsToZr(t)})}};Lt.prototype.removeFromScene=function(e){yd.call(this,e),e.traverse(function(t){var r=t.__zr;t.__zr=null,r&&t.removeAnimatorsFromZr&&t.removeAnimatorsFromZr(r)})};Ye.prototype.setTextureImage=function(e,t,r,i){if(this.shader){var n=r.getZr(),a=this,o;return a.autoUpdateTextureStatus=!1,a.disableTexture(e),gd(t)||(o=$.loadTexture(t,r,i,function(s){a.enableTexture(e),n&&n.refresh()}),a.set(e,o)),o}};var $={};$.Renderer=mr;$.Node=mt;$.Mesh=Vt;$.Shader=F;$.Material=Ye;$.Texture=V;$.Texture2D=j;$.Geometry=ee;$.SphereGeometry=al;$.PlaneGeometry=gr;$.CubeGeometry=An;$.AmbientLight=ol;$.DirectionalLight=sl;$.PointLight=ll;$.SpotLight=fl;$.PerspectiveCamera=Ge;$.OrthographicCamera=kt;$.Vector2=nt;$.Vector3=R;$.Vector4=hl;$.Quaternion=mn;$.Matrix2=ul;$.Matrix2d=cl;$.Matrix3=dl;$.Matrix4=H;$.Plane=Tn;$.Ray=Or;$.BoundingBox=Fe;$.Frustum=li;var Mn=null;function Td(){return Mn!==null||(Mn=Yt.createBlank("rgba(255,255,255,0)").image),Mn}function Tl(e){return Math.pow(2,Math.round(Math.log(e)/Math.LN2))}function El(e){if((e.wrapS===V.REPEAT||e.wrapT===V.REPEAT)&&e.image){var t=Tl(e.width),r=Tl(e.height);if(t!==e.width||r!==e.height){var i=document.createElement("canvas");i.width=t,i.height=r;var n=i.getContext("2d");n.drawImage(e.image,0,0,t,r),e.image=i}}}$.loadTexture=function(e,t,r,i){typeof r=="function"&&(i=r,r={}),r=r||{};for(var n=Object.keys(r).sort(),a="",o=0;o<n.length;o++)a+=n[o]+"_"+r[n[o]]+"_";var s=t.__textureCache=t.__textureCache||new Go(20);if(_d(e)){var l=e.__textureid__,f=s.get(a+l);if(f)f.texture.surface.setECharts(e),i&&i(f.texture);else{var h=new Ks(e);h.onupdate=function(){t.getZr().refresh()},f={texture:h.getTexture()};for(var o=0;o<n.length;o++)f.texture[n[o]]=r[n[o]];l=e.__textureid__||"__ecgl_ec__"+f.texture.__uid__,e.__textureid__=l,s.put(a+l,f),i&&i(f.texture)}return f.texture}else if(Sl(e)){var l=e.__textureid__,f=s.get(a+l);if(!f){f={texture:new $.Texture2D({image:e})};for(var o=0;o<n.length;o++)f.texture[n[o]]=r[n[o]];l=e.__textureid__||"__ecgl_image__"+f.texture.__uid__,e.__textureid__=l,s.put(a+l,f),El(f.texture),i&&i(f.texture)}return f.texture}else{var f=s.get(a+e);if(f)f.callbacks?f.callbacks.push(i):i&&i(f.texture);else if(e.match(/.hdr$|^data:application\/octet-stream/)){f={callbacks:[i]};var u=Yt.loadTexture(e,{exposure:r.exposure,fileType:"hdr"},function(){u.dirty(),f.callbacks.forEach(function(m){m&&m(u)}),f.callbacks=null});f.texture=u,s.put(a+e,f)}else{for(var u=new $.Texture2D({image:new Image}),o=0;o<n.length;o++)u[n[o]]=r[n[o]];f={texture:u,callbacks:[i]};var d=u.image;d.onload=function(){u.image=d,El(u),u.dirty(),f.callbacks.forEach(function(p){p&&p(u)}),f.callbacks=null},d.crossOrigin="Anonymous",d.src=e,u.image=Td(),s.put(a+e,f)}return f.texture}};$.createAmbientCubemap=function(e,t,r,i){e=e||{};var n=e.texture,a=Z.firstNotNull(e.exposure,1),o=new tl({intensity:Z.firstNotNull(e.specularIntensity,1)}),s=new rl({intensity:Z.firstNotNull(e.diffuseIntensity,1),coefficients:[.844,.712,.691,-.037,.083,.167,.343,.288,.299,-.041,-.021,-.009,-.003,-.041,-.064,-.011,-.007,-.004,-.031,.034,.081,-.06,-.049,-.06,.046,.056,.05]});return o.cubemap=$.loadTexture(n,r,{exposure:a},function(){if(o.cubemap.flipY=!1,0)var l;if(o.prefilter(t,32),0)var f;s.coefficients=nl.projectEnvironmentMap(t,o.cubemap,{lod:1}),i&&i()}),{specular:o,diffuse:s}};$.createBlankTexture=Yt.createBlank;$.isImage=Sl;$.additiveBlend=function(e){e.blendEquation(e.FUNC_ADD),e.blendFunc(e.SRC_ALPHA,e.ONE)};$.parseColor=function(e,t){return e instanceof Array?(t||(t=[]),t[0]=e[0],t[1]=e[1],t[2]=e[2],e.length>3?t[3]=e[3]:t[3]=1,t):(t=Xt.parse(e||"#000",t)||[0,0,0,0],t[0]/=255,t[1]/=255,t[2]/=255,t)};$.directionFromAlphaBeta=function(e,t){var r=e/180*Math.PI+Math.PI/2,i=-t/180*Math.PI+Math.PI/2,n=[],a=Math.sin(r);return n[0]=a*Math.cos(i),n[1]=-Math.cos(r),n[2]=a*Math.sin(i),n};$.getShadowResolution=function(e){var t=1024;switch(e){case"low":t=512;break;case"medium":break;case"high":t=2048;break;case"ultra":t=4096;break}return t};$.COMMON_SHADERS=["lambert","color","realistic","hatching","shadow"];$.createShader=function(e){e==="ecgl.shadow"&&(e="ecgl.displayShadow");var t=F.source(e+".vertex"),r=F.source(e+".fragment");t||console.error("Vertex shader of '%s' not exits",e),r||console.error("Fragment shader of '%s' not exits",e);var i=new F(t,r);return i.name=e,i};$.createMaterial=function(e,t){t instanceof Array||(t=[t]);var r=$.createShader(e),i=new Ye({shader:r});return t.forEach(function(n){typeof n=="string"&&i.define(n)}),i};$.setMaterialFromModel=function(e,t,r,i){t.autoUpdateTextureStatus=!1;var n=r.getModel(e+"Material"),a=n.get("detailTexture"),o=Z.firstNotNull(n.get("textureTiling"),1),s=Z.firstNotNull(n.get("textureOffset"),0);typeof o=="number"&&(o=[o,o]),typeof s=="number"&&(s=[s,s]);var l=o[0]>1||o[1]>1?$.Texture.REPEAT:$.Texture.CLAMP_TO_EDGE,f={anisotropic:8,wrapS:l,wrapT:l};if(e==="realistic"){var h=n.get("roughness"),u=n.get("metalness");u!=null?isNaN(u)&&(t.setTextureImage("metalnessMap",u,i,f),u=Z.firstNotNull(n.get("metalnessAdjust"),.5)):u=0,h!=null?isNaN(h)&&(t.setTextureImage("roughnessMap",h,i,f),h=Z.firstNotNull(n.get("roughnessAdjust"),.5)):h=.5;var d=n.get("normalTexture");t.setTextureImage("detailMap",a,i,f),t.setTextureImage("normalMap",d,i,f),t.set({roughness:h,metalness:u,detailUvRepeat:o,detailUvOffset:s})}else if(e==="lambert")t.setTextureImage("detailMap",a,i,f),t.set({detailUvRepeat:o,detailUvOffset:s});else if(e==="color")t.setTextureImage("detailMap",a,i,f),t.set({detailUvRepeat:o,detailUvOffset:s});else if(e==="hatching"){var c=n.get("hatchingTextures")||[];c.length<6;for(var m=0;m<6;m++)t.setTextureImage("hatch"+(m+1),c[m],i,{anisotropic:8,wrapS:$.Texture.REPEAT,wrapT:$.Texture.REPEAT});t.set({detailUvRepeat:o,detailUvOffset:s})}};$.updateVertexAnimation=function(e,t,r,i){var n=i.get("animation"),a=i.get("animationDurationUpdate"),o=i.get("animationEasingUpdate"),s=r.shadowDepthMaterial;if(n&&t&&a>0&&t.geometry.vertexCount===r.geometry.vertexCount){r.material.define("vertex","VERTEX_ANIMATION"),r.ignorePreZ=!0,s&&s.define("vertex","VERTEX_ANIMATION");for(var l=0;l<e.length;l++)r.geometry.attributes[e[l][0]].value=t.geometry.attributes[e[l][1]].value;r.geometry.dirty(),r.__percent=0,r.material.set("percent",0),r.stopAnimation(),r.animate().when(a,{__percent:1}).during(function(){r.material.set("percent",r.__percent),s&&s.set("percent",r.__percent)}).done(function(){r.ignorePreZ=!1,r.material.undefine("vertex","VERTEX_ANIMATION"),s&&s.undefine("vertex","VERTEX_ANIMATION")}).start(o)}else r.material.undefine("vertex","VERTEX_ANIMATION"),s&&s.undefine("vertex","VERTEX_ANIMATION")};var T=$;var we=function(e,t){this.id=e,this.zr=t;try{this.renderer=new mr({clearBit:0,devicePixelRatio:t.painter.dpr,preserveDrawingBuffer:!0,premultipliedAlpha:!0}),this.renderer.resize(t.painter.getWidth(),t.painter.getHeight())}catch(i){this.renderer=null,this.dom=document.createElement("div"),this.dom.style.cssText="position:absolute; left: 0; top: 0; right: 0; bottom: 0;",this.dom.className="ecgl-nowebgl",this.dom.innerHTML="Sorry, your browser does not support WebGL",console.error(i);return}this.onglobalout=this.onglobalout.bind(this),t.on("globalout",this.onglobalout),this.dom=this.renderer.canvas;var r=this.dom.style;r.position="absolute",r.left="0",r.top="0",this.views=[],this._picking=new Ps({renderer:this.renderer}),this._viewsToDispose=[],this._accumulatingId=0,this._zrEventProxy=new ct.Rect({shape:{x:-1,y:-1,width:2,height:2},__isGLToZRProxy:!0}),this._backgroundColor=null,this._disposed=!1};we.prototype.setUnpainted=function(){};we.prototype.addView=function(e){if(e.layer!==this){var t=this._viewsToDispose.indexOf(e);t>=0&&this._viewsToDispose.splice(t,1),this.views.push(e),e.layer=this;var r=this.zr;e.scene.traverse(function(i){i.__zr=r,i.addAnimatorsToZr&&i.addAnimatorsToZr(r)})}};function wl(e){var t=e.__zr;e.__zr=null,t&&e.removeAnimatorsFromZr&&e.removeAnimatorsFromZr(t)}we.prototype.removeView=function(e){if(e.layer===this){var t=this.views.indexOf(e);t>=0&&(this.views.splice(t,1),e.scene.traverse(wl,this),e.layer=null,this._viewsToDispose.push(e))}};we.prototype.removeViewsAll=function(){this.views.forEach(function(e){e.scene.traverse(wl,this),e.layer=null,this._viewsToDispose.push(e)},this),this.views.length=0};we.prototype.resize=function(e,t){var r=this.renderer;r.resize(e,t)};we.prototype.clear=function(){var e=this.renderer.gl,t=this._backgroundColor||[0,0,0,0];e.clearColor(t[0],t[1],t[2],t[3]),e.depthMask(!0),e.colorMask(!0,!0,!0,!0),e.clear(e.DEPTH_BUFFER_BIT|e.COLOR_BUFFER_BIT)};we.prototype.clearDepth=function(){var e=this.renderer.gl;e.clear(e.DEPTH_BUFFER_BIT)};we.prototype.clearColor=function(){var e=this.renderer.gl;e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)};we.prototype.needsRefresh=function(){this.zr.refresh()};we.prototype.refresh=function(e){this._backgroundColor=e?T.parseColor(e):[0,0,0,0],this.renderer.clearColor=this._backgroundColor;for(var t=0;t<this.views.length;t++)this.views[t].prepareRender(this.renderer);this._doRender(!1),this._trackAndClean();for(var t=0;t<this._viewsToDispose.length;t++)this._viewsToDispose[t].dispose(this.renderer);this._viewsToDispose.length=0,this._startAccumulating()};we.prototype.renderToCanvas=function(e){this._startAccumulating(!0),e.drawImage(this.dom,0,0,e.canvas.width,e.canvas.height)};we.prototype._doRender=function(e){this.clear(),this.renderer.saveViewport();for(var t=0;t<this.views.length;t++)this.views[t].render(this.renderer,e);this.renderer.restoreViewport()};we.prototype._stopAccumulating=function(){this._accumulatingId=0,clearTimeout(this._accumulatingTimeout)};var Ed=1;we.prototype._startAccumulating=function(e){var t=this;this._stopAccumulating();for(var r=!1,i=0;i<this.views.length;i++)r=this.views[i].needsAccumulate()||r;if(!r)return;function n(a){if(!(!t._accumulatingId||a!==t._accumulatingId)){for(var o=!0,s=0;s<t.views.length;s++)o=t.views[s].isAccumulateFinished()&&r;o||(t._doRender(!0),e?n(a):Ai(function(){n(a)}))}}this._accumulatingId=Ed++,e?n(t._accumulatingId):this._accumulatingTimeout=setTimeout(function(){n(t._accumulatingId)},50)};we.prototype._trackAndClean=function(){var e=[],t=[];this._textureList&&(Nn(this._textureList),Nn(this._geometriesList));for(var r=0;r<this.views.length;r++)Sd(this.views[r].scene,e,t);this._textureList&&(Rn(this.renderer,this._textureList),Rn(this.renderer,this._geometriesList)),this._textureList=e,this._geometriesList=t};function Nn(e){for(var t=0;t<e.length;t++)e[t].__used__=0}function Rn(e,t){for(var r=0;r<t.length;r++)t[r].__used__||t[r].dispose(e)}function Pn(e,t){e.__used__=e.__used__||0,e.__used__++,e.__used__===1&&t.push(e)}function Sd(e,t,r){var i,n;e.traverse(function(o){if(o.isRenderable()){var s=o.geometry,l=o.material;if(l!==i)for(var f=l.getTextureUniforms(),h=0;h<f.length;h++){var u=f[h],d=l.uniforms[u].value;if(d){if(d instanceof V)Pn(d,t);else if(d instanceof Array)for(var c=0;c<d.length;c++)d[c]instanceof V&&Pn(d[c],t)}}s!==n&&Pn(s,r),i=l,n=s}});for(var a=0;a<e.lights.length;a++)e.lights[a].cubemap&&Pn(e.lights[a].cubemap,t)}we.prototype.dispose=function(){this._disposed||(this._stopAccumulating(),this._textureList&&(Nn(this._textureList),Nn(this._geometriesList),Rn(this.renderer,this._textureList),Rn(this.renderer,this._geometriesList)),this.zr.off("globalout",this.onglobalout),this._disposed=!0)};we.prototype.onmousedown=function(e){if(!(e.target&&e.target.__isGLToZRProxy)){e=e.event;var t=this.pickObject(e.offsetX,e.offsetY);t&&(this._dispatchEvent("mousedown",e,t),this._dispatchDataEvent("mousedown",e,t)),this._downX=e.offsetX,this._downY=e.offsetY}};we.prototype.onmousemove=function(e){if(!(e.target&&e.target.__isGLToZRProxy)){e=e.event;var t=this.pickObject(e.offsetX,e.offsetY),r=t&&t.target,i=this._hovered;this._hovered=t,i&&r!==i.target&&(i.relatedTarget=r,this._dispatchEvent("mouseout",e,i),this.zr.setCursorStyle("default")),this._dispatchEvent("mousemove",e,t),t&&(this.zr.setCursorStyle("pointer"),(!i||r!==i.target)&&this._dispatchEvent("mouseover",e,t)),this._dispatchDataEvent("mousemove",e,t)}};we.prototype.onmouseup=function(e){if(!(e.target&&e.target.__isGLToZRProxy)){e=e.event;var t=this.pickObject(e.offsetX,e.offsetY);t&&(this._dispatchEvent("mouseup",e,t),this._dispatchDataEvent("mouseup",e,t)),this._upX=e.offsetX,this._upY=e.offsetY}};we.prototype.onclick=we.prototype.dblclick=function(e){if(!(e.target&&e.target.__isGLToZRProxy)){var t=this._upX-this._downX,r=this._upY-this._downY;if(!(Math.sqrt(t*t+r*r)>20)){e=e.event;var i=this.pickObject(e.offsetX,e.offsetY);i&&(this._dispatchEvent(e.type,e,i),this._dispatchDataEvent(e.type,e,i));var n=this._clickToSetFocusPoint(e);if(n){var a=n.view.setDOFFocusOnPoint(n.distance);a&&this.zr.refresh()}}}};we.prototype._clickToSetFocusPoint=function(e){for(var t=this.renderer,r=t.viewport,i=this.views.length-1;i>=0;i--){var n=this.views[i];if(n.hasDOF()&&n.containPoint(e.offsetX,e.offsetY)){this._picking.scene=n.scene,this._picking.camera=n.camera,t.viewport=n.viewport;var a=this._picking.pick(e.offsetX,e.offsetY,!0);if(a)return a.view=n,a}}t.viewport=r};we.prototype.onglobalout=function(e){var t=this._hovered;t&&this._dispatchEvent("mouseout",e,{target:t.target})};we.prototype.pickObject=function(e,t){for(var r=[],i=this.renderer,n=i.viewport,a=0;a<this.views.length;a++){var o=this.views[a];o.containPoint(e,t)&&(this._picking.scene=o.scene,this._picking.camera=o.camera,i.viewport=o.viewport,this._picking.pickAll(e,t,r))}return i.viewport=n,r.sort(function(s,l){return s.distance-l.distance}),r[0]};we.prototype._dispatchEvent=function(e,t,r){r||(r={});var i=r.target;for(r.cancelBubble=!1,r.event=t,r.type=e,r.offsetX=t.offsetX,r.offsetY=t.offsetY;i&&(i.trigger(e,r),i=i.getParent(),!r.cancelBubble););this._dispatchToView(e,r)};we.prototype._dispatchDataEvent=function(e,t,r){var i=r&&r.target,n=i&&i.dataIndex,a=i&&i.seriesIndex,o=i&&i.eventData,s=!1,l=this._zrEventProxy;l.x=t.offsetX,l.y=t.offsetY,l.update();var f={target:l};let h=Ee.getECData(l);e==="mousemove"&&(n!=null?n!==this._lastDataIndex&&(parseInt(this._lastDataIndex,10)>=0&&(h.dataIndex=this._lastDataIndex,h.seriesIndex=this._lastSeriesIndex,this.zr.handler.dispatchToElement(f,"mouseout",t)),s=!0):o!=null&&o!==this._lastEventData&&(this._lastEventData!=null&&(h.eventData=this._lastEventData,this.zr.handler.dispatchToElement(f,"mouseout",t)),s=!0),this._lastEventData=o,this._lastDataIndex=n,this._lastSeriesIndex=a),h.eventData=o,h.dataIndex=n,h.seriesIndex=a,(o!=null||parseInt(n,10)>=0&&parseInt(a,10)>=0)&&(this.zr.handler.dispatchToElement(f,e,t),s&&this.zr.handler.dispatchToElement(f,"mouseover",t))};we.prototype._dispatchToView=function(e,t){for(var r=0;r<this.views.length;r++)this.views[r].containPoint(t.offsetX,t.offsetY)&&this.views[r].trigger(e,t)};Object.assign(we.prototype,Qr);var Va=we;var wd=["bar3D","line3D","map3D","scatter3D","surface","lines3D","scatterGL","scatter3D"];function zi(e,t){if(e&&e[t]&&(e[t].normal||e[t].emphasis)){var r=e[t].normal,i=e[t].emphasis;r&&(e[t]=r),i&&(e.emphasis=e.emphasis||{},e.emphasis[t]=i)}}function Ad(e){zi(e,"itemStyle"),zi(e,"lineStyle"),zi(e,"areaStyle"),zi(e,"label")}function In(e){e&&(e instanceof Array||(e=[e]),N.each(e,function(t){if(t.axisLabel){var r=t.axisLabel;Object.assign(r,r.textStyle),r.textStyle=null}}))}function Al(e){N.each(e.series,function(t){N.indexOf(wd,t.type)>=0&&(Ad(t),t.coordinateSystem==="mapbox"&&(t.coordinateSystem="mapbox3D",e.mapbox3D=e.mapbox))}),In(e.xAxis3D),In(e.yAxis3D),In(e.zAxis3D),In(e.grid3D),zi(e.geo3D)}function bl(e){this._layers={},this._zr=e}bl.prototype.update=function(e,t){var r=this,i=t.getZr();if(!i.getWidth()||!i.getHeight()){console.warn("Dom has no width or height");return}function n(s){i.setSleepAfterStill(0);var l;s.coordinateSystem&&s.coordinateSystem.model,l=s.get("zlevel");var f=r._layers,h=f[l];if(!h){if(h=f[l]=new Va("gl-"+l,i),i.painter.isSingleCanvas()){h.virtual=!0;var u=new ct.Image({z:1e4,style:{image:h.renderer.canvas},silent:!0});h.__hostImage=u,i.add(u)}i.painter.insertLayer(l,h)}return h.__hostImage&&h.__hostImage.setStyle({width:h.renderer.getWidth(),height:h.renderer.getHeight()}),h}function a(s,l){s&&s.traverse(function(f){f.isRenderable&&f.isRenderable()&&(f.ignorePicking=f.$ignorePicking!=null?f.$ignorePicking:l)})}for(var o in this._layers)this._layers[o].removeViewsAll();e.eachComponent(function(s,l){if(s!=="series"){var f=t.getViewOfComponentModel(l),h=l.coordinateSystem;if(f.__ecgl__){var u;if(h){if(!h.viewGL){console.error("Can't find viewGL in coordinateSystem of component "+l.id);return}u=h.viewGL}else{if(!l.viewGL){console.error("Can't find viewGL of component "+l.id);return}u=h.viewGL}var u=h.viewGL,d=n(l);d.addView(u),f.afterRender&&f.afterRender(l,e,t,d),a(f.groupGL,l.get("silent"))}}}),e.eachSeries(function(s){var l=t.getViewOfSeriesModel(s),f=s.coordinateSystem;if(l.__ecgl__){if(f&&!f.viewGL&&!l.viewGL){console.error("Can't find viewGL of series "+l.id);return}var h=f&&f.viewGL||l.viewGL,u=n(s);u.addView(h),l.afterRender&&l.afterRender(s,e,t,u),a(l.groupGL,s.get("silent"))}})};ko(function(e){var t=e.getZr(),r=t.painter.dispose;t.painter.dispose=function(){typeof this.eachOtherLayer=="function"&&this.eachOtherLayer(function(i){i instanceof Va&&i.dispose()}),r.call(this)},t.painter.getRenderedCanvas=function(i){if(i=i||{},this._singleCanvas)return this._layers[0].dom;var n=document.createElement("canvas"),a=i.pixelRatio||this.dpr;n.width=this.getWidth()*a,n.height=this.getHeight()*a;var o=n.getContext("2d");o.dpr=a,o.clearRect(0,0,n.width,n.height),i.backgroundColor&&(o.fillStyle=i.backgroundColor,o.fillRect(0,0,n.width,n.height));var s=this.storage.getDisplayList(!0),l={},f,h=this;function u(p,v){var g=h._zlevelList;p==null&&(p=-1/0);for(var y,x=0;x<g.length;x++){var _=g[x],S=h._layers[_];if(!S.__builtin__&&_>p&&_<v){y=S;break}}y&&y.renderToCanvas&&(o.save(),y.renderToCanvas(o),o.restore())}for(var d={ctx:o},c=0;c<s.length;c++){var m=s[c];m.zlevel!==f&&(u(f,m.zlevel),f=m.zlevel),this._doPaintEl(m,d,!0,null,l)}return u(f,1/0),n}});Wo(function(e,t){var r=t.getZr(),i=r.__egl=r.__egl||new bl(r);i.update(e,t)});Ho(Al);var xr={defaultOption:{viewControl:{projection:"perspective",autoRotate:!1,autoRotateDirection:"cw",autoRotateSpeed:10,autoRotateAfterStill:3,damping:.8,rotateSensitivity:1,zoomSensitivity:1,panSensitivity:1,panMouseButton:"middle",rotateMouseButton:"left",distance:150,minDistance:40,maxDistance:400,orthographicSize:150,maxOrthographicSize:400,minOrthographicSize:20,center:[0,0,0],alpha:0,beta:0,minAlpha:-90,maxAlpha:90}},setView:function(e){e=e||{},this.option.viewControl=this.option.viewControl||{},e.alpha!=null&&(this.option.viewControl.alpha=e.alpha),e.beta!=null&&(this.option.viewControl.beta=e.beta),e.distance!=null&&(this.option.viewControl.distance=e.distance),e.center!=null&&(this.option.viewControl.center=e.center)}};var Nt={defaultOption:{postEffect:{enable:!1,bloom:{enable:!0,intensity:.1},depthOfField:{enable:!1,focalRange:20,focalDistance:50,blurRadius:10,fstop:2.8,quality:"medium"},screenSpaceAmbientOcclusion:{enable:!1,radius:2,quality:"medium",intensity:1},screenSpaceReflection:{enable:!1,quality:"medium",maxRoughness:.8},colorCorrection:{enable:!0,exposure:0,brightness:0,contrast:1,saturation:1,lookupTexture:""},edge:{enable:!1},FXAA:{enable:!1}},temporalSuperSampling:{enable:"auto"}}};var Rt={defaultOption:{light:{main:{shadow:!1,shadowQuality:"high",color:"#fff",intensity:1,alpha:0,beta:0},ambient:{color:"#fff",intensity:.2},ambientCubemap:{texture:null,exposure:1,diffuseIntensity:.5,specularIntensity:.5}}}};var On=Ct.extend({type:"grid3D",dependencies:["xAxis3D","yAxis3D","zAxis3D"],defaultOption:{show:!0,zlevel:-10,left:0,top:0,width:"100%",height:"100%",environment:"auto",boxWidth:100,boxHeight:100,boxDepth:100,axisPointer:{show:!0,lineStyle:{color:"rgba(0, 0, 0, 0.8)",width:1},label:{show:!0,formatter:null,margin:8,textStyle:{fontSize:14,color:"#fff",backgroundColor:"rgba(0,0,0,0.5)",padding:3,borderRadius:3}}},axisLine:{show:!0,lineStyle:{color:"#333",width:2,type:"solid"}},axisTick:{show:!0,inside:!1,length:3,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,margin:8,textStyle:{fontSize:12}},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}},light:{main:{alpha:30,beta:40},ambient:{intensity:.4}},viewControl:{alpha:20,beta:40,autoRotate:!1,distance:200,minDistance:40,maxDistance:400}}});N.merge(On.prototype,xr);N.merge(On.prototype,Nt);N.merge(On.prototype,Rt);var Ll=On;var Vi=Z.firstNotNull,Dl={left:0,middle:1,right:2};function Cl(e){return e instanceof Array||(e=[e,e]),e}var Ml=xe.extend(function(){return{zr:null,viewGL:null,_center:new R,minDistance:.5,maxDistance:1.5,maxOrthographicSize:300,minOrthographicSize:30,minAlpha:-90,maxAlpha:90,minBeta:-1/0,maxBeta:1/0,autoRotateAfterStill:0,autoRotateDirection:"cw",autoRotateSpeed:60,damping:.8,rotateSensitivity:1,zoomSensitivity:1,panSensitivity:1,panMouseButton:"middle",rotateMouseButton:"left",_mode:"rotate",_camera:null,_needsUpdate:!1,_rotating:!1,_phi:0,_theta:0,_mouseX:0,_mouseY:0,_rotateVelocity:new nt,_panVelocity:new nt,_distance:500,_zoomSpeed:0,_stillTimeout:0,_animators:[]}},function(){["_mouseDownHandler","_mouseWheelHandler","_mouseMoveHandler","_mouseUpHandler","_pinchHandler","_contextMenuHandler","_update"].forEach(function(e){this[e]=this[e].bind(this)},this)},{init:function(){var e=this.zr;e&&(e.on("mousedown",this._mouseDownHandler),e.on("globalout",this._mouseUpHandler),e.on("mousewheel",this._mouseWheelHandler),e.on("pinch",this._pinchHandler),e.animation.on("frame",this._update),e.dom.addEventListener("contextmenu",this._contextMenuHandler))},dispose:function(){var e=this.zr;e&&(e.off("mousedown",this._mouseDownHandler),e.off("mousemove",this._mouseMoveHandler),e.off("mouseup",this._mouseUpHandler),e.off("mousewheel",this._mouseWheelHandler),e.off("pinch",this._pinchHandler),e.off("globalout",this._mouseUpHandler),e.dom.removeEventListener("contextmenu",this._contextMenuHandler),e.animation.off("frame",this._update)),this.stopAllAnimation()},getDistance:function(){return this._distance},setDistance:function(e){this._distance=e,this._needsUpdate=!0},getOrthographicSize:function(){return this._orthoSize},setOrthographicSize:function(e){this._orthoSize=e,this._needsUpdate=!0},getAlpha:function(){return this._theta/Math.PI*180},getBeta:function(){return-this._phi/Math.PI*180},getCenter:function(){return this._center.toArray()},setAlpha:function(e){e=Math.max(Math.min(this.maxAlpha,e),this.minAlpha),this._theta=e/180*Math.PI,this._needsUpdate=!0},setBeta:function(e){e=Math.max(Math.min(this.maxBeta,e),this.minBeta),this._phi=-e/180*Math.PI,this._needsUpdate=!0},setCenter:function(e){this._center.setArray(e)},setViewGL:function(e){this.viewGL=e},getCamera:function(){return this.viewGL.camera},setFromViewControlModel:function(e,t){t=t||{};var r=t.baseDistance||0,i=t.baseOrthoSize||1,n=e.get("projection");n!=="perspective"&&n!=="orthographic"&&n!=="isometric"&&(n="perspective"),this._projection=n,this.viewGL.setProjection(n);var a=e.get("distance")+r,o=e.get("orthographicSize")+i;[["damping",.8],["autoRotate",!1],["autoRotateAfterStill",3],["autoRotateDirection","cw"],["autoRotateSpeed",10],["minDistance",30],["maxDistance",400],["minOrthographicSize",30],["maxOrthographicSize",300],["minAlpha",-90],["maxAlpha",90],["minBeta",-1/0],["maxBeta",1/0],["rotateSensitivity",1],["zoomSensitivity",1],["panSensitivity",1],["panMouseButton","left"],["rotateMouseButton","middle"]].forEach(function(d){this[d[0]]=Vi(e.get(d[0]),d[1])},this),this.minDistance+=r,this.maxDistance+=r,this.minOrthographicSize+=i,this.maxOrthographicSize+=i;var s=e.ecModel,l={};["animation","animationDurationUpdate","animationEasingUpdate"].forEach(function(d){l[d]=Vi(e.get(d),s&&s.get(d))});var f=Vi(t.alpha,e.get("alpha"))||0,h=Vi(t.beta,e.get("beta"))||0,u=Vi(t.center,e.get("center"))||[0,0,0];l.animation&&l.animationDurationUpdate>0&&this._notFirst?this.animateTo({alpha:f,beta:h,center:u,distance:a,orthographicSize:o,easing:l.animationEasingUpdate,duration:l.animationDurationUpdate}):(this.setDistance(a),this.setAlpha(f),this.setBeta(h),this.setCenter(u),this.setOrthographicSize(o)),this._notFirst=!0,this._validateProperties()},_validateProperties:function(){},animateTo:function(e){var t=this.zr,r=this,i={},n={};return e.distance!=null&&(i.distance=this.getDistance(),n.distance=e.distance),e.orthographicSize!=null&&(i.orthographicSize=this.getOrthographicSize(),n.orthographicSize=e.orthographicSize),e.alpha!=null&&(i.alpha=this.getAlpha(),n.alpha=e.alpha),e.beta!=null&&(i.beta=this.getBeta(),n.beta=e.beta),e.center!=null&&(i.center=this.getCenter(),n.center=e.center),this._addAnimator(t.animation.animate(i).when(e.duration||1e3,n).during(function(){i.alpha!=null&&r.setAlpha(i.alpha),i.beta!=null&&r.setBeta(i.beta),i.distance!=null&&r.setDistance(i.distance),i.center!=null&&r.setCenter(i.center),i.orthographicSize!=null&&r.setOrthographicSize(i.orthographicSize),r._needsUpdate=!0})).start(e.easing||"linear")},stopAllAnimation:function(){for(var e=0;e<this._animators.length;e++)this._animators[e].stop();this._animators.length=0},update:function(){this._needsUpdate=!0,this._update(20)},_isAnimating:function(){return this._animators.length>0},_update:function(e){if(this._rotating){var t=(this.autoRotateDirection==="cw"?1:-1)*this.autoRotateSpeed/180*Math.PI;this._phi-=t*e/1e3,this._needsUpdate=!0}else this._rotateVelocity.len()>0&&(this._needsUpdate=!0);(Math.abs(this._zoomSpeed)>.1||this._panVelocity.len()>0)&&(this._needsUpdate=!0),this._needsUpdate&&(e=Math.min(e,50),this._updateDistanceOrSize(e),this._updatePan(e),this._updateRotate(e),this._updateTransform(),this.getCamera().update(),this.zr&&this.zr.refresh(),this.trigger("update"),this._needsUpdate=!1)},_updateRotate:function(e){var t=this._rotateVelocity;this._phi=t.y*e/20+this._phi,this._theta=t.x*e/20+this._theta,this.setAlpha(this.getAlpha()),this.setBeta(this.getBeta()),this._vectorDamping(t,Math.pow(this.damping,e/16))},_updateDistanceOrSize:function(e){this._projection==="perspective"?this._setDistance(this._distance+this._zoomSpeed*e/20):this._setOrthoSize(this._orthoSize+this._zoomSpeed*e/20),this._zoomSpeed*=Math.pow(this.damping,e/16)},_setDistance:function(e){this._distance=Math.max(Math.min(e,this.maxDistance),this.minDistance)},_setOrthoSize:function(e){this._orthoSize=Math.max(Math.min(e,this.maxOrthographicSize),this.minOrthographicSize);var t=this.getCamera(),r=this._orthoSize,i=r/this.viewGL.viewport.height*this.viewGL.viewport.width;t.left=-i/2,t.right=i/2,t.top=r/2,t.bottom=-r/2},_updatePan:function(e){var t=this._panVelocity,r=this._distance,i=this.getCamera(),n=i.worldTransform.y,a=i.worldTransform.x;this._center.scaleAndAdd(a,-t.x*r/200).scaleAndAdd(n,-t.y*r/200),this._vectorDamping(t,0)},_updateTransform:function(){var e=this.getCamera(),t=new R,r=this._theta+Math.PI/2,i=this._phi+Math.PI/2,n=Math.sin(r);t.x=n*Math.cos(i),t.y=-Math.cos(r),t.z=n*Math.sin(i),e.position.copy(this._center).scaleAndAdd(t,this._distance),e.rotation.identity().rotateY(-this._phi).rotateX(-this._theta)},_startCountingStill:function(){clearTimeout(this._stillTimeout);var e=this.autoRotateAfterStill,t=this;!isNaN(e)&&e>0&&(this._stillTimeout=setTimeout(function(){t._rotating=!0},e*1e3))},_vectorDamping:function(e,t){var r=e.len();r=r*t,r<1e-4&&(r=0),e.normalize().scale(r)},_decomposeTransform:function(){if(this.getCamera()){this.getCamera().updateWorldTransform();var e=this.getCamera().worldTransform.z,t=Math.asin(e.y),r=Math.atan2(e.x,e.z);this._theta=t,this._phi=-r,this.setBeta(this.getBeta()),this.setAlpha(this.getAlpha()),this.getCamera().aspect?this._setDistance(this.getCamera().position.dist(this._center)):this._setOrthoSize(this.getCamera().top-this.getCamera().bottom)}},_mouseDownHandler:function(e){if(!e.target&&!this._isAnimating()){var t=e.offsetX,r=e.offsetY;this.viewGL&&!this.viewGL.containPoint(t,r)||(this.zr.on("mousemove",this._mouseMoveHandler),this.zr.on("mouseup",this._mouseUpHandler),e.event.targetTouches?e.event.targetTouches.length===1&&(this._mode="rotate"):e.event.button===Dl[this.rotateMouseButton]?this._mode="rotate":e.event.button===Dl[this.panMouseButton]?this._mode="pan":this._mode="",this._rotateVelocity.set(0,0),this._rotating=!1,this.autoRotate&&this._startCountingStill(),this._mouseX=e.offsetX,this._mouseY=e.offsetY)}},_mouseMoveHandler:function(e){if(!(e.target&&e.target.__isGLToZRProxy)&&!this._isAnimating()){var t=Cl(this.panSensitivity),r=Cl(this.rotateSensitivity);this._mode==="rotate"?(this._rotateVelocity.y=(e.offsetX-this._mouseX)/this.zr.getHeight()*2*r[0],this._rotateVelocity.x=(e.offsetY-this._mouseY)/this.zr.getWidth()*2*r[1]):this._mode==="pan"&&(this._panVelocity.x=(e.offsetX-this._mouseX)/this.zr.getWidth()*t[0]*400,this._panVelocity.y=(-e.offsetY+this._mouseY)/this.zr.getHeight()*t[1]*400),this._mouseX=e.offsetX,this._mouseY=e.offsetY,e.event.preventDefault()}},_mouseWheelHandler:function(e){if(!this._isAnimating()){var t=e.event.wheelDelta||-e.event.detail;this._zoomHandler(e,t)}},_pinchHandler:function(e){this._isAnimating()||(this._zoomHandler(e,e.pinchScale>1?1:-1),this._mode="")},_zoomHandler:function(e,t){if(t!==0){var r=e.offsetX,i=e.offsetY;if(!(this.viewGL&&!this.viewGL.containPoint(r,i))){var n;this._projection==="perspective"?n=Math.max(Math.max(Math.min(this._distance-this.minDistance,this.maxDistance-this._distance))/20,.5):n=Math.max(Math.max(Math.min(this._orthoSize-this.minOrthographicSize,this.maxOrthographicSize-this._orthoSize))/20,.5),this._zoomSpeed=(t>0?-1:1)*n*this.zoomSensitivity,this._rotating=!1,this.autoRotate&&this._mode==="rotate"&&this._startCountingStill(),e.event.preventDefault()}}},_mouseUpHandler:function(){this.zr.off("mousemove",this._mouseMoveHandler),this.zr.off("mouseup",this._mouseUpHandler)},_isRightMouseButtonUsed:function(){return this.rotateMouseButton==="right"||this.panMouseButton==="right"},_contextMenuHandler:function(e){this._isRightMouseButtonUsed()&&e.preventDefault()},_addAnimator:function(e){var t=this._animators;return t.push(e),e.done(function(){var r=t.indexOf(e);r>=0&&t.splice(r,1)}),e}});Object.defineProperty(Ml.prototype,"autoRotate",{get:function(e){return this._autoRotate},set:function(e){this._autoRotate=e,this._rotating=e}});var yr=Ml;var qt={convertToDynamicArray:function(e){e&&this.resetOffset();var t=this.attributes;for(var r in t)e||!t[r].value?t[r].value=[]:t[r].value=Array.prototype.slice.call(t[r].value);e||!this.indices?this.indices=[]:this.indices=Array.prototype.slice.call(this.indices)},convertToTypedArray:function(){var e=this.attributes;for(var t in e)e[t].value&&e[t].value.length>0?e[t].value=new Float32Array(e[t].value):e[t].value=null;this.indices&&this.indices.length>0&&(this.indices=this.vertexCount>65535?new Uint32Array(this.indices):new Uint16Array(this.indices)),this.dirty()}};var Pl={vec2:q,vec3:w,vec4:z,mat2:Ie,mat2d:Ve,mat3:ie,mat4:O,quat:K};var ae=Pl;var Ha=ae.vec3,Nl=[[0,0],[1,1]],Rl=ee.extend(function(){return{segmentScale:1,dynamic:!0,useNativeLine:!0,attributes:{position:new ee.Attribute("position","float",3,"POSITION"),positionPrev:new ee.Attribute("positionPrev","float",3),positionNext:new ee.Attribute("positionNext","float",3),prevPositionPrev:new ee.Attribute("prevPositionPrev","float",3),prevPosition:new ee.Attribute("prevPosition","float",3),prevPositionNext:new ee.Attribute("prevPositionNext","float",3),offset:new ee.Attribute("offset","float",1),color:new ee.Attribute("color","float",4,"COLOR")}}},{resetOffset:function(){this._vertexOffset=0,this._triangleOffset=0,this._itemVertexOffsets=[]},setVertexCount:function(e){var t=this.attributes;this.vertexCount!==e&&(t.position.init(e),t.color.init(e),this.useNativeLine||(t.positionPrev.init(e),t.positionNext.init(e),t.offset.init(e)),e>65535?this.indices instanceof Uint16Array&&(this.indices=new Uint32Array(this.indices)):this.indices instanceof Uint32Array&&(this.indices=new Uint16Array(this.indices)))},setTriangleCount:function(e){this.triangleCount!==e&&(e===0?this.indices=null:this.indices=this.vertexCount>65535?new Uint32Array(e*3):new Uint16Array(e*3))},_getCubicCurveApproxStep:function(e,t,r,i){var n=Ha.dist(e,t)+Ha.dist(r,t)+Ha.dist(i,r),a=1/(n+1)*this.segmentScale;return a},getCubicCurveVertexCount:function(e,t,r,i){var n=this._getCubicCurveApproxStep(e,t,r,i),a=Math.ceil(1/n);return this.useNativeLine?a*2:a*2+2},getCubicCurveTriangleCount:function(e,t,r,i){var n=this._getCubicCurveApproxStep(e,t,r,i),a=Math.ceil(1/n);return this.useNativeLine?0:a*2},getLineVertexCount:function(){return this.getPolylineVertexCount(Nl)},getLineTriangleCount:function(){return this.getPolylineTriangleCount(Nl)},getPolylineVertexCount:function(e){var t;if(typeof e=="number")t=e;else{var r=typeof e[0]!="number";t=r?e.length:e.length/3}return this.useNativeLine?(t-1)*2:(t-1)*2+2},getPolylineTriangleCount:function(e){var t;if(typeof e=="number")t=e;else{var r=typeof e[0]!="number";t=r?e.length:e.length/3}return this.useNativeLine?0:Math.max(t-1,0)*2},addCubicCurve:function(e,t,r,i,n,a){a==null&&(a=1);for(var o=e[0],s=e[1],l=e[2],f=t[0],h=t[1],u=t[2],d=r[0],c=r[1],m=r[2],p=i[0],v=i[1],g=i[2],y=this._getCubicCurveApproxStep(e,t,r,i),x=y*y,_=x*y,S=3*y,E=3*x,b=6*x,A=6*_,L=o-f*2+d,P=s-h*2+c,C=l-u*2+m,I=(f-d)*3-o+p,B=(h-c)*3-s+v,M=(u-m)*3-l+g,G=o,k=s,Y=l,U=(f-o)*S+L*E+I*_,ue=(h-s)*S+P*E+B*_,X=(u-l)*S+C*E+M*_,_e=L*b+I*A,ce=P*b+B*A,be=C*b+M*A,Le=I*A,oe=B*A,je=M*A,Be=0,He=0,lt=Math.ceil(1/y),et=new Float32Array((lt+1)*3),et=[],tt=0,He=0;He<lt+1;He++)et[tt++]=G,et[tt++]=k,et[tt++]=Y,G+=U,k+=ue,Y+=X,U+=_e,ue+=ce,X+=be,_e+=Le,ce+=oe,be+=je,Be+=y,Be>1&&(G=U>0?Math.min(G,p):Math.max(G,p),k=ue>0?Math.min(k,v):Math.max(k,v),Y=X>0?Math.min(Y,g):Math.max(Y,g));return this.addPolyline(et,n,a)},addLine:function(e,t,r,i){return this.addPolyline([e,t],r,i)},addPolyline:function(e,t,r,i,n){if(e.length){var a=typeof e[0]!="number";if(n==null&&(n=a?e.length:e.length/3),!(n<2)){i==null&&(i=0),r==null&&(r=1),this._itemVertexOffsets.push(this._vertexOffset);var a=typeof e[0]!="number",o=a?typeof t[0]!="number":t.length/4===n,s=this.attributes.position,l=this.attributes.positionPrev,f=this.attributes.positionNext,h=this.attributes.color,u=this.attributes.offset,d=this.indices,c=this._vertexOffset,m,p;r=Math.max(r,.01);for(var v=i;v<n;v++){if(a)m=e[v],o?p=t[v]:p=t;else{var g=v*3;if(m=m||[],m[0]=e[g],m[1]=e[g+1],m[2]=e[g+2],o){var y=v*4;p=p||[],p[0]=t[y],p[1]=t[y+1],p[2]=t[y+2],p[3]=t[y+3]}else p=t}if(this.useNativeLine?v>1&&(s.copy(c,c-1),h.copy(c,c-1),c++):(v<n-1&&(l.set(c+2,m),l.set(c+3,m)),v>0&&(f.set(c-2,m),f.set(c-1,m)),s.set(c,m),s.set(c+1,m),h.set(c,p),h.set(c+1,p),u.set(c,r/2),u.set(c+1,-r/2),c+=2),this.useNativeLine)h.set(c,p),s.set(c,m),c++;else if(v>0){var x=this._triangleOffset*3,d=this.indices;d[x]=c-4,d[x+1]=c-3,d[x+2]=c-2,d[x+3]=c-3,d[x+4]=c-1,d[x+5]=c-2,this._triangleOffset+=2}}if(!this.useNativeLine){var _=this._vertexOffset,S=this._vertexOffset+n*2;l.copy(_,_+2),l.copy(_+1,_+3),f.copy(S-1,S-3),f.copy(S-2,S-4)}return this._vertexOffset=c,this._vertexOffset}}},setItemColor:function(e,t){for(var r=this._itemVertexOffsets[e],i=e<this._itemVertexOffsets.length-1?this._itemVertexOffsets[e+1]:this._vertexOffset,n=r;n<i;n++)this.attributes.color.set(n,t);this.dirty("color")},currentTriangleOffset:function(){return this._triangleOffset},currentVertexOffset:function(){return this._vertexOffset}});N.defaults(Rl.prototype,qt);var Tt=Rl;function Bn(e,t,r,i,n,a,o){this._zr=e,this._x=0,this._y=0,this._rowHeight=0,this.width=i,this.height=n,this.offsetX=t,this.offsetY=r,this.dpr=o,this.gap=a}Bn.prototype={constructor:Bn,clear:function(){this._x=0,this._y=0,this._rowHeight=0},add:function(e,t,r){var i=e.getBoundingRect();t==null&&(t=i.width),r==null&&(r=i.height),t*=this.dpr,r*=this.dpr,this._fitElement(e,t,r);var n=this._x,a=this._y,o=this.width*this.dpr,s=this.height*this.dpr,l=this.gap;if(n+t+l>o&&(n=this._x=0,a+=this._rowHeight+l,this._y=a,this._rowHeight=0),this._x+=t+l,this._rowHeight=Math.max(this._rowHeight,r),a+r+l>s)return null;e.x+=this.offsetX*this.dpr+n,e.y+=this.offsetY*this.dpr+a,this._zr.add(e);var f=[this.offsetX/this.width,this.offsetY/this.height],h=[[n/o+f[0],a/s+f[1]],[(n+t)/o+f[0],(a+r)/s+f[1]]];return h},_fitElement:function(e,t,r){var i=e.getBoundingRect(),n=t/i.width,a=r/i.height;e.x=-i.x*n,e.y=-i.y*a,e.scaleX=n,e.scaleY=a,e.update()}};function Il(e){e=e||{},e.width=e.width||512,e.height=e.height||512,e.devicePixelRatio=e.devicePixelRatio||1,e.gap=e.gap==null?2:e.gap;var t=document.createElement("canvas");t.width=e.width*e.devicePixelRatio,t.height=e.height*e.devicePixelRatio,this._canvas=t,this._texture=new j({image:t,flipY:!1});var r=this;this._zr=zo.init(t);var i=this._zr.refreshImmediately;this._zr.refreshImmediately=function(){i.call(this),r._texture.dirty(),r.onupdate&&r.onupdate()},this._dpr=e.devicePixelRatio,this._coords={},this.onupdate=e.onupdate,this._gap=e.gap,this._textureAtlasNodes=[new Bn(this._zr,0,0,e.width,e.height,this._gap,this._dpr)],this._nodeWidth=e.width,this._nodeHeight=e.height,this._currentNodeIdx=0}Il.prototype={clear:function(){for(var e=0;e<this._textureAtlasNodes.length;e++)this._textureAtlasNodes[e].clear();this._currentNodeIdx=0,this._zr.clear(),this._coords={}},getWidth:function(){return this._width},getHeight:function(){return this._height},getTexture:function(){return this._texture},getDevicePixelRatio:function(){return this._dpr},getZr:function(){return this._zr},_getCurrentNode:function(){return this._textureAtlasNodes[this._currentNodeIdx]},_expand:function(){if(this._currentNodeIdx++,this._textureAtlasNodes[this._currentNodeIdx])return this._textureAtlasNodes[this._currentNodeIdx];var e=4096/this._dpr,t=this._textureAtlasNodes,r=t.length,i=r*this._nodeWidth%e,n=Math.floor(r*this._nodeWidth/e)*this._nodeHeight;if(!(n>=e)){var a=(i+this._nodeWidth)*this._dpr,o=(n+this._nodeHeight)*this._dpr;try{this._zr.resize({width:a,height:o})}catch{this._canvas.width=a,this._canvas.height=o}var s=new Bn(this._zr,i,n,this._nodeWidth,this._nodeHeight,this._gap,this._dpr);return this._textureAtlasNodes.push(s),s}},add:function(e,t,r){if(this._coords[e.id])return this._coords[e.id];var i=this._getCurrentNode().add(e,t,r);if(!i){var n=this._expand();if(!n)return;i=n.add(e,t,r)}return this._coords[e.id]=i,i},getCoordsScale:function(){var e=this._dpr;return[this._nodeWidth/this._canvas.width*e,this._nodeHeight/this._canvas.height*e]},getCoords:function(e){return this._coords[e]},dispose:function(){this._zr.dispose()}};var Hi=Il;function ka(){}ka.prototype={constructor:ka,setScene:function(e){this._scene=e,this._skybox&&this._skybox.attachScene(this._scene)},initLight:function(e){this._lightRoot=e,this.mainLight=new T.DirectionalLight({shadowBias:.005}),this.ambientLight=new T.AmbientLight,e.add(this.mainLight),e.add(this.ambientLight)},dispose:function(){this._lightRoot&&(this._lightRoot.remove(this.mainLight),this._lightRoot.remove(this.ambientLight))},updateLight:function(e){var t=this.mainLight,r=this.ambientLight,i=e.getModel("light"),n=i.getModel("main"),a=i.getModel("ambient");t.intensity=n.get("intensity"),r.intensity=a.get("intensity"),t.color=T.parseColor(n.get("color")).slice(0,3),r.color=T.parseColor(a.get("color")).slice(0,3);var o=n.get("alpha")||0,s=n.get("beta")||0;t.position.setArray(T.directionFromAlphaBeta(o,s)),t.lookAt(T.Vector3.ZERO),t.castShadow=n.get("shadow"),t.shadowResolution=T.getShadowResolution(n.get("shadowQuality"))},updateAmbientCubemap:function(e,t,r){var i=t.getModel("light.ambientCubemap"),n=i.get("texture");if(n){this._cubemapLightsCache=this._cubemapLightsCache||{};var a=this._cubemapLightsCache[n];if(!a){var o=this;a=this._cubemapLightsCache[n]=T.createAmbientCubemap(i.option,e,r,function(){o._isSkyboxFromAmbientCubemap&&o._skybox.setEnvironmentMap(a.specular.cubemap),r.getZr().refresh()})}this._lightRoot.add(a.diffuse),this._lightRoot.add(a.specular),this._currentCubemapLights=a}else this._currentCubemapLights&&(this._lightRoot.remove(this._currentCubemapLights.diffuse),this._lightRoot.remove(this._currentCubemapLights.specular),this._currentCubemapLights=null)},updateSkybox:function(e,t,r){var i=t.get("environment"),n=this;function a(){return n._skybox=n._skybox||new _r,n._skybox}var o=a();if(i&&i!=="none")if(i==="auto")if(this._isSkyboxFromAmbientCubemap=!0,this._currentCubemapLights){var s=this._currentCubemapLights.specular.cubemap;o.setEnvironmentMap(s),this._scene&&o.attachScene(this._scene),o.material.set("lod",3)}else this._skybox&&this._skybox.detachScene();else if(typeof i=="object"&&i.colorStops||typeof i=="string"&&Xt.parse(i)){this._isSkyboxFromAmbientCubemap=!1;var l=new T.Texture2D({anisotropic:8,flipY:!1});o.setEnvironmentMap(l);var f=l.image=document.createElement("canvas");f.width=f.height=16;var h=f.getContext("2d"),u=new ct.Rect({shape:{x:0,y:0,width:16,height:16},style:{fill:i}});tn(h,u),o.attachScene(this._scene)}else{this._isSkyboxFromAmbientCubemap=!1;var l=T.loadTexture(i,r,{anisotropic:8,flipY:!1});o.setEnvironmentMap(l),o.attachScene(this._scene)}else this._skybox&&this._skybox.detachScene(this._scene),this._skybox=null;var d=t.coordinateSystem;if(this._skybox)if(d&&d.viewGL&&i!=="auto"&&!(i.match&&i.match(/.hdr$/))){var c=d.viewGL.isLinearSpace()?"define":"undefine";this._skybox.material[c]("fragment","SRGB_DECODE")}else this._skybox.material.undefine("fragment","SRGB_DECODE")}};var It=ka;var Vr=ae.vec3,Ol=ee.extend(function(){return{segmentScale:1,useNativeLine:!0,attributes:{position:new ee.Attribute("position","float",3,"POSITION"),normal:new ee.Attribute("normal","float",3,"NORMAL"),color:new ee.Attribute("color","float",4,"COLOR")}}},{resetOffset:function(){this._vertexOffset=0,this._faceOffset=0},setQuadCount:function(e){var t=this.attributes,r=this.getQuadVertexCount()*e,i=this.getQuadTriangleCount()*e;this.vertexCount!==r&&(t.position.init(r),t.normal.init(r),t.color.init(r)),this.triangleCount!==i&&(this.indices=r>65535?new Uint32Array(i*3):new Uint16Array(i*3))},getQuadVertexCount:function(){return 4},getQuadTriangleCount:function(){return 2},addQuad:(function(){var e=Vr.create(),t=Vr.create(),r=Vr.create(),i=[0,3,1,3,2,1];return function(n,a){var o=this.attributes.position,s=this.attributes.normal,l=this.attributes.color;Vr.sub(e,n[1],n[0]),Vr.sub(t,n[2],n[1]),Vr.cross(r,e,t),Vr.normalize(r,r);for(var f=0;f<4;f++)o.set(this._vertexOffset+f,n[f]),l.set(this._vertexOffset+f,a),s.set(this._vertexOffset+f,r);for(var h=this._faceOffset*3,f=0;f<6;f++)this.indices[h+f]=i[f]+this._vertexOffset;this._vertexOffset+=4,this._faceOffset+=2}})()});N.defaults(Ol.prototype,qt);var Bl=Ol;var Wa=Z.firstNotNull,bd={x:0,y:2,z:1};function Ld(e,t,r,i){var n=[0,0,0],a=i<0?r.getExtentMin():r.getExtentMax();n[bd[r.dim]]=a,e.position.setArray(n),e.rotation.identity(),t.distance=-Math.abs(a),t.normal.set(0,0,0),r.dim==="x"?(e.rotation.rotateY(i*Math.PI/2),t.normal.x=-i):r.dim==="z"?(e.rotation.rotateX(-i*Math.PI/2),t.normal.y=-i):(i>0&&e.rotation.rotateY(Math.PI),t.normal.z=-i)}function Fn(e,t,r){this.rootNode=new T.Node;var i=new T.Mesh({geometry:new Tt({useNativeLine:!1}),material:t,castShadow:!1,ignorePicking:!0,$ignorePicking:!0,renderOrder:1}),n=new T.Mesh({geometry:new Bl,material:r,castShadow:!1,culling:!1,ignorePicking:!0,$ignorePicking:!0,renderOrder:0});this.rootNode.add(n),this.rootNode.add(i),this.faceInfo=e,this.plane=new T.Plane,this.linesMesh=i,this.quadsMesh=n}Fn.prototype.update=function(e,t,r){var i=e.coordinateSystem,n=[i.getAxis(this.faceInfo[0]),i.getAxis(this.faceInfo[1])],a=this.linesMesh.geometry,o=this.quadsMesh.geometry;a.convertToDynamicArray(!0),o.convertToDynamicArray(!0),this._updateSplitLines(a,n,e,r),this._udpateSplitAreas(o,n,e,r),a.convertToTypedArray(),o.convertToTypedArray();var s=i.getAxis(this.faceInfo[2]);Ld(this.rootNode,this.plane,s,this.faceInfo[3])};Fn.prototype._updateSplitLines=function(e,t,r,i){var n=i.getDevicePixelRatio();t.forEach(function(a,o){var s=a.model,l=t[1-o].getExtent();if(!a.scale.isBlank()){var f=s.getModel("splitLine",r.getModel("splitLine"));if(f.get("show")){var h=f.getModel("lineStyle"),u=h.get("color"),d=Wa(h.get("opacity"),1),c=Wa(h.get("width"),1);u=N.isArray(u)?u:[u];for(var m=a.getTicksCoords({tickModel:f}),p=0,v=0;v<m.length;v++){var g=m[v].coord,y=T.parseColor(u[p%u.length]);y[3]*=d;var x=[0,0,0],_=[0,0,0];x[o]=_[o]=g,x[1-o]=l[0],_[1-o]=l[1],e.addLine(x,_,y,c*n),p++}}}})};Fn.prototype._udpateSplitAreas=function(e,t,r,i){t.forEach(function(n,a){var o=n.model,s=t[1-a].getExtent();if(!n.scale.isBlank()){var l=o.getModel("splitArea",r.getModel("splitArea"));if(l.get("show")){var f=l.getModel("areaStyle"),h=f.get("color"),u=Wa(f.get("opacity"),1);h=N.isArray(h)?h:[h];for(var d=n.getTicksCoords({tickModel:l,clamp:!0}),c=0,m=[0,0,0],p=[0,0,0],v=0;v<d.length;v++){var g=d[v].coord,y=[0,0,0],x=[0,0,0];if(y[a]=x[a]=g,y[1-a]=s[0],x[1-a]=s[1],v===0){m=y,p=x;continue}var _=T.parseColor(h[c%h.length]);_[3]*=u,e.addQuad([m,y,x,p],_),m=y,p=x,c++}}}})};var Fl=Fn;var Gl=[0,1,2,0,2,3],Ul=ee.extend(function(){return{attributes:{position:new ee.Attribute("position","float",3,"POSITION"),texcoord:new ee.Attribute("texcoord","float",2,"TEXCOORD_0"),offset:new ee.Attribute("offset","float",2),color:new ee.Attribute("color","float",4,"COLOR")}}},{resetOffset:function(){this._vertexOffset=0,this._faceOffset=0},setSpriteCount:function(e){this._spriteCount=e;var t=e*4,r=e*2;this.vertexCount!==t&&(this.attributes.position.init(t),this.attributes.offset.init(t),this.attributes.color.init(t)),this.triangleCount!==r&&(this.indices=t>65535?new Uint32Array(r*3):new Uint16Array(r*3))},setSpriteAlign:function(e,t,r,i,n){r==null&&(r="left"),i==null&&(i="top");var a,o,s,l;switch(n=n||0,r){case"left":a=n,s=t[0]+n;break;case"center":case"middle":a=-t[0]/2,s=t[0]/2;break;case"right":a=-t[0]-n,s=-n;break}switch(i){case"bottom":o=n,l=t[1]+n;break;case"middle":o=-t[1]/2,l=t[1]/2;break;case"top":o=-t[1]-n,l=-n;break}var f=e*4,h=this.attributes.offset;h.set(f,[a,l]),h.set(f+1,[s,l]),h.set(f+2,[s,o]),h.set(f+3,[a,o])},addSprite:function(e,t,r,i,n,a){var o=this._vertexOffset;this.setSprite(this._vertexOffset/4,e,t,r,i,n,a);for(var s=0;s<Gl.length;s++)this.indices[this._faceOffset*3+s]=Gl[s]+o;return this._faceOffset+=2,this._vertexOffset+=4,o/4},setSprite:function(e,t,r,i,n,a,o){for(var s=e*4,l=this.attributes,f=0;f<4;f++)l.position.set(s+f,t);var h=l.texcoord;h.set(s,[i[0][0],i[0][1]]),h.set(s+1,[i[1][0],i[0][1]]),h.set(s+2,[i[1][0],i[1][1]]),h.set(s+3,[i[0][0],i[1][1]]),this.setSpriteAlign(e,r,n,a,o)}});N.defaults(Ul.prototype,qt);var zl=Ul;var Vl=`@export ecgl.labels.vertex

attribute vec3 position: POSITION;
attribute vec2 texcoord: TEXCOORD_0;
attribute vec2 offset;
#ifdef VERTEX_COLOR
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;
#endif

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform vec4 viewport : VIEWPORT;

varying vec2 v_Texcoord;

void main()
{
 vec4 proj = worldViewProjection * vec4(position, 1.0);

 vec2 screen = (proj.xy / abs(proj.w) + 1.0) * 0.5 * viewport.zw;

 screen += offset;

 proj.xy = (screen / viewport.zw - 0.5) * 2.0 * abs(proj.w);
 gl_Position = proj;
#ifdef VERTEX_COLOR
 v_Color = a_Color;
#endif
 v_Texcoord = texcoord;
}
@end


@export ecgl.labels.fragment

uniform vec3 color : [1.0, 1.0, 1.0];
uniform float alpha : 1.0;
uniform sampler2D textureAtlas;
uniform vec2 uvScale: [1.0, 1.0];

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif
varying float v_Miter;

varying vec2 v_Texcoord;

void main()
{
 gl_FragColor = vec4(color, alpha) * texture2D(textureAtlas, v_Texcoord * uvScale);
#ifdef VERTEX_COLOR
 gl_FragColor *= v_Color;
#endif
}

@end`;T.Shader.import(Vl);var di=T.Mesh.extend(function(){var e=new zl({dynamic:!0}),t=new T.Material({shader:T.createShader("ecgl.labels"),transparent:!0,depthMask:!1});return{geometry:e,material:t,culling:!1,castShadow:!1,ignorePicking:!0}});var Hr=Z.firstNotNull,kr={x:0,y:2,z:1};function ja(e,t){var r=new T.Mesh({geometry:new Tt({useNativeLine:!1}),material:t,castShadow:!1,ignorePicking:!0,renderOrder:2}),i=new di;i.material.depthMask=!1;var n=new T.Node;n.add(r),n.add(i),this.rootNode=n,this.dim=e,this.linesMesh=r,this.labelsMesh=i,this.axisLineCoords=null,this.labelElements=[]}var Xa={x:"y",y:"x",z:"y"};ja.prototype.update=function(e,t,r){var i=e.coordinateSystem,n=i.getAxis(this.dim),a=this.linesMesh.geometry,o=this.labelsMesh.geometry;a.convertToDynamicArray(!0),o.convertToDynamicArray(!0);var s=n.model,l=n.getExtent(),C=r.getDevicePixelRatio(),f=s.getModel("axisLine",e.getModel("axisLine")),h=s.getModel("axisTick",e.getModel("axisTick")),u=s.getModel("axisLabel",e.getModel("axisLabel")),d=f.get("lineStyle.color");if(f.get("show")){var c=f.getModel("lineStyle"),m=[0,0,0],p=[0,0,0],v=kr[n.dim];m[v]=l[0],p[v]=l[1],this.axisLineCoords=[m,p];var g=T.parseColor(d),y=Hr(c.get("width"),1),x=Hr(c.get("opacity"),1);g[3]*=x,a.addLine(m,p,g,y*C)}if(h.get("show")){var _=h.getModel("lineStyle"),S=T.parseColor(Hr(_.get("color"),d)),y=Hr(_.get("width"),1);S[3]*=Hr(_.get("opacity"),1);for(var E=n.getTicksCoords(),b=h.get("length"),A=0;A<E.length;A++){var L=E[A].coord,m=[0,0,0],p=[0,0,0],v=kr[n.dim],P=kr[Xa[n.dim]];m[v]=p[v]=L,p[P]=b,a.addLine(m,p,S,y*C)}}this.labelElements=[];var C=r.getDevicePixelRatio();if(u.get("show"))for(var E=n.getTicksCoords(),I=s.get("data"),B=u.get("margin"),M=n.getViewLabels(),A=0;A<M.length;A++){var G=M[A].tickValue,k=M[A].formattedLabel,Y=M[A].rawLabel,L=n.dataToCoord(G),U=[0,0,0],v=kr[n.dim],P=kr[Xa[n.dim]];U[v]=U[v]=L,U[P]=B;var ue=u;I&&I[G]&&I[G].textStyle&&(ue=new fr(I[G].textStyle,u,s.ecModel));var X=Hr(ue.get("color"),d),_e=new ct.Text({style:Nr(ue,{text:k,fill:typeof X=="function"?X(n.type==="category"?Y:n.type==="value"?G+"":G,A):X,verticalAlign:"top",align:"left"})}),ce=t.add(_e),be=_e.getBoundingRect();o.addSprite(U,[be.width*C,be.height*C],ce),this.labelElements.push(_e)}if(s.get("name")){var Le=s.getModel("nameTextStyle"),U=[0,0,0],v=kr[n.dim],P=kr[Xa[n.dim]],oe=Hr(Le.get("color"),d),je=Le.get("borderColor"),y=Le.get("borderWidth");U[v]=U[v]=(l[0]+l[1])/2,U[P]=s.get("nameGap");var _e=new ct.Text({style:Nr(Le,{text:s.get("name"),fill:oe,stroke:je,lineWidth:y})}),ce=t.add(_e),be=_e.getBoundingRect();o.addSprite(U,[be.width*C,be.height*C],ce),_e.__idx=this.labelElements.length,this.nameLabelElement=_e}this.labelsMesh.material.set("textureAtlas",t.getTexture()),this.labelsMesh.material.set("uvScale",t.getCoordsScale()),a.convertToTypedArray(),o.convertToTypedArray()};ja.prototype.setSpriteAlign=function(e,t,r){for(var i=r.getDevicePixelRatio(),n=this.labelsMesh.geometry,a=0;a<this.labelElements.length;a++){var o=this.labelElements[a],s=o.getBoundingRect();n.setSpriteAlign(a,[s.width*i,s.height*i],e,t)}var l=this.nameLabelElement;if(l){var s=l.getBoundingRect();n.setSpriteAlign(l.__idx,[s.width*i,s.height*i],e,t),n.dirty()}this.textAlign=e,this.textVerticalAlign=t};var Hl=ja;var Tr=`@export ecgl.lines3D.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec3 position: POSITION;
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;

void main()
{
 gl_Position = worldViewProjection * vec4(position, 1.0);
 v_Color = a_Color;
}

@end

@export ecgl.lines3D.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

varying vec4 v_Color;

@import clay.util.srgb

void main()
{
#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color * v_Color);
#else
 gl_FragColor = color * v_Color;
#endif
}
@end



@export ecgl.lines3D.clipNear

vec4 clipNear(vec4 p1, vec4 p2) {
 float n = (p1.w - near) / (p1.w - p2.w);
 return vec4(mix(p1.xy, p2.xy, n), -near, near);
}

@end

@export ecgl.lines3D.expandLine
#ifdef VERTEX_ANIMATION
 vec4 prevProj = worldViewProjection * vec4(mix(prevPositionPrev, positionPrev, percent), 1.0);
 vec4 currProj = worldViewProjection * vec4(mix(prevPosition, position, percent), 1.0);
 vec4 nextProj = worldViewProjection * vec4(mix(prevPositionNext, positionNext, percent), 1.0);
#else
 vec4 prevProj = worldViewProjection * vec4(positionPrev, 1.0);
 vec4 currProj = worldViewProjection * vec4(position, 1.0);
 vec4 nextProj = worldViewProjection * vec4(positionNext, 1.0);
#endif

 if (currProj.w < 0.0) {
 if (nextProj.w > 0.0) {
 currProj = clipNear(currProj, nextProj);
 }
 else if (prevProj.w > 0.0) {
 currProj = clipNear(currProj, prevProj);
 }
 }

 vec2 prevScreen = (prevProj.xy / abs(prevProj.w) + 1.0) * 0.5 * viewport.zw;
 vec2 currScreen = (currProj.xy / abs(currProj.w) + 1.0) * 0.5 * viewport.zw;
 vec2 nextScreen = (nextProj.xy / abs(nextProj.w) + 1.0) * 0.5 * viewport.zw;

 vec2 dir;
 float len = offset;
 if (position == positionPrev) {
 dir = normalize(nextScreen - currScreen);
 }
 else if (position == positionNext) {
 dir = normalize(currScreen - prevScreen);
 }
 else {
 vec2 dirA = normalize(currScreen - prevScreen);
 vec2 dirB = normalize(nextScreen - currScreen);

 vec2 tanget = normalize(dirA + dirB);

 float miter = 1.0 / max(dot(tanget, dirA), 0.5);
 len *= miter;
 dir = tanget;
 }

 dir = vec2(-dir.y, dir.x) * len;
 currScreen += dir;

 currProj.xy = (currScreen / viewport.zw - 0.5) * 2.0 * abs(currProj.w);
@end


@export ecgl.meshLines3D.vertex

attribute vec3 position: POSITION;
attribute vec3 positionPrev;
attribute vec3 positionNext;
attribute float offset;
attribute vec4 a_Color : COLOR;

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
attribute vec3 prevPositionPrev;
attribute vec3 prevPositionNext;
uniform float percent : 1.0;
#endif

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform vec4 viewport : VIEWPORT;
uniform float near : NEAR;

varying vec4 v_Color;

@import ecgl.common.wireframe.vertexHeader

@import ecgl.lines3D.clipNear

void main()
{
 @import ecgl.lines3D.expandLine

 gl_Position = currProj;

 v_Color = a_Color;

 @import ecgl.common.wireframe.vertexMain
}
@end


@export ecgl.meshLines3D.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

varying vec4 v_Color;

@import ecgl.common.wireframe.fragmentHeader

@import clay.util.srgb

void main()
{
#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color * v_Color);
#else
 gl_FragColor = color * v_Color;
#endif

 @import ecgl.common.wireframe.fragmentMain
}

@end`;var kl=Z.firstNotNull;T.Shader.import(Tr);var Wr={x:0,y:2,z:1},Wl=jt.extend({type:"grid3D",__ecgl__:!0,init:function(e,t){var r=[["y","z","x",-1,"left"],["y","z","x",1,"right"],["x","y","z",-1,"bottom"],["x","y","z",1,"top"],["x","z","y",-1,"far"],["x","z","y",1,"near"]],i=["x","y","z"],n=new T.Material({shader:T.createShader("ecgl.color"),depthMask:!1,transparent:!0}),a=new T.Material({shader:T.createShader("ecgl.meshLines3D"),depthMask:!1,transparent:!0});n.define("fragment","DOUBLE_SIDED"),n.define("both","VERTEX_COLOR"),this.groupGL=new T.Node,this._control=new yr({zr:t.getZr()}),this._control.init(),this._faces=r.map(function(s){var l=new Fl(s,a,n);return this.groupGL.add(l.rootNode),l},this),this._axes=i.map(function(s){var l=new Hl(s,a);return this.groupGL.add(l.rootNode),l},this);var o=t.getDevicePixelRatio();this._axisLabelSurface=new Hi({width:256,height:256,devicePixelRatio:o}),this._axisLabelSurface.onupdate=function(){t.getZr().refresh()},this._axisPointerLineMesh=new T.Mesh({geometry:new Tt({useNativeLine:!1}),material:a,castShadow:!1,ignorePicking:!0,renderOrder:3}),this.groupGL.add(this._axisPointerLineMesh),this._axisPointerLabelsSurface=new Hi({width:128,height:128,devicePixelRatio:o}),this._axisPointerLabelsMesh=new di({ignorePicking:!0,renderOrder:4,castShadow:!1}),this._axisPointerLabelsMesh.material.set("textureAtlas",this._axisPointerLabelsSurface.getTexture()),this.groupGL.add(this._axisPointerLabelsMesh),this._lightRoot=new T.Node,this._sceneHelper=new It,this._sceneHelper.initLight(this._lightRoot)},render:function(e,t,r){this._model=e,this._api=r;var i=e.coordinateSystem;i.viewGL.add(this._lightRoot),e.get("show")?i.viewGL.add(this.groupGL):i.viewGL.remove(this.groupGL);var n=this._control;n.setViewGL(i.viewGL);var a=e.getModel("viewControl");n.setFromViewControlModel(a,0),this._axisLabelSurface.clear(),n.off("update"),e.get("show")&&(this._faces.forEach(function(o){o.update(e,t,r)},this),this._axes.forEach(function(o){o.update(e,this._axisLabelSurface,r)},this)),n.on("update",this._onCameraChange.bind(this,e,r),this),this._sceneHelper.setScene(i.viewGL.scene),this._sceneHelper.updateLight(e),i.viewGL.setPostEffect(e.getModel("postEffect"),r),i.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling")),this._initMouseHandler(e)},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r)},showAxisPointer:function(e,t,r,i){this._doShowAxisPointer(),this._updateAxisPointer(i.value)},hideAxisPointer:function(e,t,r,i){this._doHideAxisPointer()},_initMouseHandler:function(e){var t=e.coordinateSystem,r=t.viewGL;e.get("show")&&e.get("axisPointer.show")?r.on("mousemove",this._updateAxisPointerOnMousePosition,this):r.off("mousemove",this._updateAxisPointerOnMousePosition)},_updateAxisPointerOnMousePosition:function(e){if(!e.target){for(var t=this._model,r=t.coordinateSystem,i=r.viewGL,n=i.castRay(e.offsetX,e.offsetY,new T.Ray),a,o=0;o<this._faces.length;o++){var s=this._faces[o];if(!s.rootNode.invisible){s.plane.normal.dot(i.camera.worldTransform.z)<0&&s.plane.normal.negate();var l=n.intersectPlane(s.plane);if(l){var f=r.getAxis(s.faceInfo[0]),h=r.getAxis(s.faceInfo[1]),u=Wr[s.faceInfo[0]],d=Wr[s.faceInfo[1]];f.contain(l.array[u])&&h.contain(l.array[d])&&(a=l)}}}if(a){var c=r.pointToData(a.array,[],!0);this._updateAxisPointer(c),this._doShowAxisPointer()}else this._doHideAxisPointer()}},_onCameraChange:function(e,t){e.get("show")&&(this._updateFaceVisibility(),this._updateAxisLinePosition());var r=this._control;t.dispatchAction({type:"grid3DChangeCamera",alpha:r.getAlpha(),beta:r.getBeta(),distance:r.getDistance(),center:r.getCenter(),from:this.uid,grid3DId:e.id})},_updateFaceVisibility:function(){var e=this._control.getCamera(),t=new T.Vector3;e.update();for(var r=0;r<this._faces.length/2;r++){for(var i=[],n=0;n<2;n++){var a=this._faces[r*2+n];a.rootNode.getWorldPosition(t),t.transformMat4(e.viewMatrix),i[n]=t.z}var o=i[0]>i[1]?0:1,s=this._faces[r*2+o],l=this._faces[r*2+1-o];s.rootNode.invisible=!0,l.rootNode.invisible=!1}},_updateAxisLinePosition:function(){var e=this._model.coordinateSystem,t=e.getAxis("x"),r=e.getAxis("y"),i=e.getAxis("z"),n=i.getExtentMax(),a=i.getExtentMin(),o=t.getExtentMin(),s=t.getExtentMax(),l=r.getExtentMax(),f=r.getExtentMin(),h=this._axes[0].rootNode,u=this._axes[1].rootNode,d=this._axes[2].rootNode,c=this._faces,m=c[4].rootNode.invisible?f:l,p=c[2].rootNode.invisible?n:a,v=c[0].rootNode.invisible?o:s,g=c[2].rootNode.invisible?n:a,y=c[0].rootNode.invisible?s:o,x=c[4].rootNode.invisible?f:l;h.rotation.identity(),u.rotation.identity(),d.rotation.identity(),c[4].rootNode.invisible&&(this._axes[0].flipped=!0,h.rotation.rotateX(Math.PI)),c[0].rootNode.invisible&&(this._axes[1].flipped=!0,u.rotation.rotateZ(Math.PI)),c[4].rootNode.invisible&&(this._axes[2].flipped=!0,d.rotation.rotateY(Math.PI)),h.position.set(0,p,m),u.position.set(v,g,0),d.position.set(y,0,x),h.update(),u.update(),d.update(),this._updateAxisLabelAlign()},_updateAxisLabelAlign:function(){var e=this._control.getCamera(),t=[new T.Vector4,new T.Vector4],r=new T.Vector4;this.groupGL.getWorldPosition(r),r.w=1,r.transformMat4(e.viewMatrix).transformMat4(e.projectionMatrix),r.x/=r.w,r.y/=r.w,this._axes.forEach(function(i){for(var n=i.axisLineCoords,a=i.labelsMesh.geometry,o=0;o<t.length;o++)t[o].setArray(n[o]),t[o].w=1,t[o].transformMat4(i.rootNode.worldTransform).transformMat4(e.viewMatrix).transformMat4(e.projectionMatrix),t[o].x/=t[o].w,t[o].y/=t[o].w;var s=t[1].x-t[0].x,l=t[1].y-t[0].y,f=(t[1].x+t[0].x)/2,h=(t[1].y+t[0].y)/2,u,d;Math.abs(l/s)<.5?(u="center",d=h>r.y?"bottom":"top"):(d="middle",u=f>r.x?"left":"right"),i.setSpriteAlign(u,d,this._api)},this)},_doShowAxisPointer:function(){this._axisPointerLineMesh.invisible&&(this._axisPointerLineMesh.invisible=!1,this._axisPointerLabelsMesh.invisible=!1,this._api.getZr().refresh())},_doHideAxisPointer:function(){this._axisPointerLineMesh.invisible||(this._axisPointerLineMesh.invisible=!0,this._axisPointerLabelsMesh.invisible=!0,this._api.getZr().refresh())},_updateAxisPointer:function(e){var t=this._model.coordinateSystem,r=t.dataToPoint(e),i=this._axisPointerLineMesh,n=i.geometry,a=this._model.getModel("axisPointer"),o=this._api.getDevicePixelRatio();n.convertToDynamicArray(!0);function s(A){return Z.firstNotNull(A.model.get("axisPointer.show"),a.get("show"))}function l(A){var L=A.model.getModel("axisPointer",a),P=L.getModel("lineStyle"),C=T.parseColor(P.get("color")),I=kl(P.get("width"),1),B=kl(P.get("opacity"),1);return C[3]*=B,{color:C,lineWidth:I}}for(var f=0;f<this._faces.length;f++){var h=this._faces[f];if(!h.rootNode.invisible){for(var u=h.faceInfo,d=u[3]<0?t.getAxis(u[2]).getExtentMin():t.getAxis(u[2]).getExtentMax(),c=Wr[u[2]],m=0;m<2;m++){var p=u[m],v=u[1-m],g=t.getAxis(p),y=t.getAxis(v);if(s(g)){var x=[0,0,0],_=[0,0,0],S=Wr[p],E=Wr[v];x[S]=_[S]=r[S],x[c]=_[c]=d,x[E]=y.getExtentMin(),_[E]=y.getExtentMax();var b=l(g);n.addLine(x,_,b.color,b.lineWidth*o)}}if(s(t.getAxis(u[2]))){var x=r.slice(),_=r.slice();_[c]=d;var b=l(t.getAxis(u[2]));n.addLine(x,_,b.color,b.lineWidth*o)}}}n.convertToTypedArray(),this._updateAxisPointerLabelsMesh(e),this._api.getZr().refresh()},_updateAxisPointerLabelsMesh:function(e){var t=this._model,r=this._axisPointerLabelsMesh,i=this._axisPointerLabelsSurface,n=t.coordinateSystem,a=t.getModel("axisPointer");r.geometry.convertToDynamicArray(!0),i.clear();var o={x:"y",y:"x",z:"y"};this._axes.forEach(function(s,l){var f=n.getAxis(s.dim),h=f.model,u=h.getModel("axisPointer",a),d=u.getModel("label"),c=u.get("lineStyle.color");if(!(!d.get("show")||!u.get("show"))){var m=e[l],p=d.get("formatter"),v=f.scale.getLabel({value:m});if(p!=null)v=p(v,e);else if(f.scale.type==="interval"||f.scale.type==="log"){var g=wt.getPrecisionSafe(f.scale.getTicks()[0]);v=m.toFixed(g+2)}var y=d.get("color"),x=new ct.Text({style:Nr(d,{text:v,fill:y||c,align:"left",verticalAlign:"top"})}),_=i.add(x),S=x.getBoundingRect(),E=this._api.getDevicePixelRatio(),b=s.rootNode.position.toArray(),A=Wr[o[s.dim]];b[A]+=(s.flipped?-1:1)*d.get("margin"),b[Wr[s.dim]]=f.dataToCoord(e[l]),r.geometry.addSprite(b,[S.width*E,S.height*E],_,s.textAlign,s.textVerticalAlign)}},this),i.getZr().refreshImmediately(),r.material.set("uvScale",i.getCoordsScale()),r.geometry.convertToTypedArray()},dispose:function(){this.groupGL.removeAll(),this._control.dispose(),this._axisLabelSurface.dispose(),this._axisPointerLabelsSurface.dispose()}});function Gn(e){ma.call(this,e),this.type="cartesian3D",this.dimensions=["x","y","z"],this.size=[0,0,0]}Gn.prototype={constructor:Gn,model:null,containPoint:function(e){return this.getAxis("x").contain(e[0])&&this.getAxis("y").contain(e[2])&&this.getAxis("z").contain(e[1])},containData:function(e){return this.getAxis("x").containData(e[0])&&this.getAxis("y").containData(e[1])&&this.getAxis("z").containData(e[2])},dataToPoint:function(e,t,r){return t=t||[],t[0]=this.getAxis("x").dataToCoord(e[0],r),t[2]=this.getAxis("y").dataToCoord(e[1],r),t[1]=this.getAxis("z").dataToCoord(e[2],r),t},pointToData:function(e,t,r){return t=t||[],t[0]=this.getAxis("x").coordToData(e[0],r),t[1]=this.getAxis("y").coordToData(e[2],r),t[2]=this.getAxis("z").coordToData(e[1],r),t}};N.inherits(Gn,ma);var Za=Gn;function Un(e,t,r){Rr.call(this,e,t,r)}Un.prototype={constructor:Un,getExtentMin:function(){var e=this._extent;return Math.min(e[0],e[1])},getExtentMax:function(){var e=this._extent;return Math.max(e[0],e[1])},calculateCategoryInterval:function(){return Math.floor(this.scale.count()/8)}};N.inherits(Un,Rr);var Xl=Un;var qa=function(){this._pool={},this._allocatedTextures=[]};qa.prototype={constructor:qa,get:function(e){var t=jl(e);this._pool.hasOwnProperty(t)||(this._pool[t]=[]);var r=this._pool[t];if(!r.length){var i=new j(e);return this._allocatedTextures.push(i),i}return r.pop()},put:function(e){var t=jl(e);this._pool.hasOwnProperty(t)||(this._pool[t]=[]);var r=this._pool[t];r.push(e)},clear:function(e){for(var t=0;t<this._allocatedTextures.length;t++)this._allocatedTextures[t].dispose(e);this._pool={},this._allocatedTextures=[]}};var Zl={width:512,height:512,type:D.UNSIGNED_BYTE,format:D.RGBA,wrapS:D.CLAMP_TO_EDGE,wrapT:D.CLAMP_TO_EDGE,minFilter:D.LINEAR_MIPMAP_LINEAR,magFilter:D.LINEAR,useMipmap:!0,anisotropic:1,flipY:!0,unpackAlignment:4,premultiplyAlpha:!1},Ya=Object.keys(Zl);function jl(e){Ne.defaultsWithPropList(e,Zl,Ya),Dd(e);for(var t="",r=0;r<Ya.length;r++){var i=Ya[r],n=e[i].toString();t+=n}return t}function Dd(e){var t=Cd(e.width,e.height);e.format===D.DEPTH_COMPONENT&&(e.useMipmap=!1),(!t||!e.useMipmap)&&(e.minFilter==D.NEAREST_MIPMAP_NEAREST||e.minFilter==D.NEAREST_MIPMAP_LINEAR?e.minFilter=D.NEAREST:(e.minFilter==D.LINEAR_MIPMAP_LINEAR||e.minFilter==D.LINEAR_MIPMAP_NEAREST)&&(e.minFilter=D.LINEAR)),t||(e.wrapS=D.CLAMP_TO_EDGE,e.wrapT=D.CLAMP_TO_EDGE)}function Cd(e,t){return(e&e-1)===0&&(t&t-1)===0}var zn=qa;var Yl=`@export clay.sm.depth.vertex
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
attribute vec3 position : POSITION;
attribute vec2 texcoord : TEXCOORD_0;
uniform vec2 uvRepeat = vec2(1.0, 1.0);
uniform vec2 uvOffset = vec2(0.0, 0.0);
@import clay.chunk.skinning_header
@import clay.chunk.instancing_header
varying vec4 v_ViewPosition;
varying vec2 v_Texcoord;
void main(){
 vec4 P = vec4(position, 1.0);
#ifdef SKINNING
 @import clay.chunk.skin_matrix
 P = skinMatrixWS * P;
#endif
#ifdef INSTANCING
 @import clay.chunk.instancing_matrix
 P = instanceMat * P;
#endif
 v_ViewPosition = worldViewProjection * P;
 gl_Position = v_ViewPosition;
 v_Texcoord = texcoord * uvRepeat + uvOffset;
}
@end
@export clay.sm.depth.fragment
varying vec4 v_ViewPosition;
varying vec2 v_Texcoord;
uniform float bias : 0.001;
uniform float slopeScale : 1.0;
uniform sampler2D alphaMap;
uniform float alphaCutoff: 0.0;
@import clay.util.encode_float
void main(){
 float depth = v_ViewPosition.z / v_ViewPosition.w;
 if (alphaCutoff > 0.0) {
 if (texture2D(alphaMap, v_Texcoord).a <= alphaCutoff) {
 discard;
 }
 }
#ifdef USE_VSM
 depth = depth * 0.5 + 0.5;
 float moment1 = depth;
 float moment2 = depth * depth;
 #ifdef SUPPORT_STANDARD_DERIVATIVES
 float dx = dFdx(depth);
 float dy = dFdy(depth);
 moment2 += 0.25*(dx*dx+dy*dy);
 #endif
 gl_FragColor = vec4(moment1, moment2, 0.0, 1.0);
#else
 #ifdef SUPPORT_STANDARD_DERIVATIVES
 float dx = dFdx(depth);
 float dy = dFdy(depth);
 depth += sqrt(dx*dx + dy*dy) * slopeScale + bias;
 #else
 depth += bias;
 #endif
 gl_FragColor = encodeFloat(depth * 0.5 + 0.5);
#endif
}
@end
@export clay.sm.debug_depth
uniform sampler2D depthMap;
varying vec2 v_Texcoord;
@import clay.util.decode_float
void main() {
 vec4 tex = texture2D(depthMap, v_Texcoord);
#ifdef USE_VSM
 gl_FragColor = vec4(tex.rgb, 1.0);
#else
 float depth = decodeFloat(tex);
 gl_FragColor = vec4(depth, depth, depth, 1.0);
#endif
}
@end
@export clay.sm.distance.vertex
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform mat4 world : WORLD;
attribute vec3 position : POSITION;
@import clay.chunk.skinning_header
varying vec3 v_WorldPosition;
void main (){
 vec4 P = vec4(position, 1.0);
#ifdef SKINNING
 @import clay.chunk.skin_matrix
 P = skinMatrixWS * P;
#endif
#ifdef INSTANCING
 @import clay.chunk.instancing_matrix
 P = instanceMat * P;
#endif
 gl_Position = worldViewProjection * P;
 v_WorldPosition = (world * P).xyz;
}
@end
@export clay.sm.distance.fragment
uniform vec3 lightPosition;
uniform float range : 100;
varying vec3 v_WorldPosition;
@import clay.util.encode_float
void main(){
 float dist = distance(lightPosition, v_WorldPosition);
#ifdef USE_VSM
 gl_FragColor = vec4(dist, dist * dist, 0.0, 0.0);
#else
 dist = dist / range;
 gl_FragColor = encodeFloat(dist);
#endif
}
@end
@export clay.plugin.shadow_map_common
@import clay.util.decode_float
float tapShadowMap(sampler2D map, vec2 uv, float z){
 vec4 tex = texture2D(map, uv);
 return step(z, decodeFloat(tex) * 2.0 - 1.0);
}
float pcf(sampler2D map, vec2 uv, float z, float textureSize, vec2 scale) {
 float shadowContrib = tapShadowMap(map, uv, z);
 vec2 offset = vec2(1.0 / textureSize) * scale;
#ifdef PCF_KERNEL_SIZE
 for (int _idx_ = 0; _idx_ < PCF_KERNEL_SIZE; _idx_++) {{
 shadowContrib += tapShadowMap(map, uv + offset * pcfKernel[_idx_], z);
 }}
 return shadowContrib / float(PCF_KERNEL_SIZE + 1);
#else
 shadowContrib += tapShadowMap(map, uv+vec2(offset.x, 0.0), z);
 shadowContrib += tapShadowMap(map, uv+vec2(offset.x, offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(0.0, offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, 0.0), z);
 shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, -offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(offset.x, -offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(0.0, -offset.y), z);
 return shadowContrib / 9.0;
#endif
}
float pcf(sampler2D map, vec2 uv, float z, float textureSize) {
 return pcf(map, uv, z, textureSize, vec2(1.0));
}
float chebyshevUpperBound(vec2 moments, float z){
 float p = 0.0;
 z = z * 0.5 + 0.5;
 if (z <= moments.x) {
 p = 1.0;
 }
 float variance = moments.y - moments.x * moments.x;
 variance = max(variance, 0.0000001);
 float mD = moments.x - z;
 float pMax = variance / (variance + mD * mD);
 pMax = clamp((pMax-0.4)/(1.0-0.4), 0.0, 1.0);
 return max(p, pMax);
}
float computeShadowContrib(
 sampler2D map, mat4 lightVPM, vec3 position, float textureSize, vec2 scale, vec2 offset
) {
 vec4 posInLightSpace = lightVPM * vec4(position, 1.0);
 posInLightSpace.xyz /= posInLightSpace.w;
 float z = posInLightSpace.z;
 if(all(greaterThan(posInLightSpace.xyz, vec3(-0.99, -0.99, -1.0))) &&
 all(lessThan(posInLightSpace.xyz, vec3(0.99, 0.99, 1.0)))){
 vec2 uv = (posInLightSpace.xy+1.0) / 2.0;
 #ifdef USE_VSM
 vec2 moments = texture2D(map, uv * scale + offset).xy;
 return chebyshevUpperBound(moments, z);
 #else
 return pcf(map, uv * scale + offset, z, textureSize, scale);
 #endif
 }
 return 1.0;
}
float computeShadowContrib(sampler2D map, mat4 lightVPM, vec3 position, float textureSize) {
 return computeShadowContrib(map, lightVPM, position, textureSize, vec2(1.0), vec2(0.0));
}
float computeShadowContribOmni(samplerCube map, vec3 direction, float range)
{
 float dist = length(direction);
 vec4 shadowTex = textureCube(map, direction);
#ifdef USE_VSM
 vec2 moments = shadowTex.xy;
 float variance = moments.y - moments.x * moments.x;
 float mD = moments.x - dist;
 float p = variance / (variance + mD * mD);
 if(moments.x + 0.001 < dist){
 return clamp(p, 0.0, 1.0);
 }else{
 return 1.0;
 }
#else
 return step(dist, (decodeFloat(shadowTex) + 0.0002) * range);
#endif
}
@end
@export clay.plugin.compute_shadow_map
#if defined(SPOT_LIGHT_SHADOWMAP_COUNT) || defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT) || defined(POINT_LIGHT_SHADOWMAP_COUNT)
#ifdef SPOT_LIGHT_SHADOWMAP_COUNT
uniform sampler2D spotLightShadowMaps[SPOT_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
uniform mat4 spotLightMatrices[SPOT_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
uniform float spotLightShadowMapSizes[SPOT_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
#endif
#ifdef DIRECTIONAL_LIGHT_SHADOWMAP_COUNT
#if defined(SHADOW_CASCADE)
uniform sampler2D directionalLightShadowMaps[1]:unconfigurable;
uniform mat4 directionalLightMatrices[SHADOW_CASCADE]:unconfigurable;
uniform float directionalLightShadowMapSizes[1]:unconfigurable;
uniform float shadowCascadeClipsNear[SHADOW_CASCADE]:unconfigurable;
uniform float shadowCascadeClipsFar[SHADOW_CASCADE]:unconfigurable;
#else
uniform sampler2D directionalLightShadowMaps[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
uniform mat4 directionalLightMatrices[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
uniform float directionalLightShadowMapSizes[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
#endif
#endif
#ifdef POINT_LIGHT_SHADOWMAP_COUNT
uniform samplerCube pointLightShadowMaps[POINT_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
#endif
uniform bool shadowEnabled : true;
#ifdef PCF_KERNEL_SIZE
uniform vec2 pcfKernel[PCF_KERNEL_SIZE];
#endif
@import clay.plugin.shadow_map_common
#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)
void computeShadowOfSpotLights(vec3 position, inout float shadowContribs[SPOT_LIGHT_COUNT] ) {
 float shadowContrib;
 for(int _idx_ = 0; _idx_ < SPOT_LIGHT_SHADOWMAP_COUNT; _idx_++) {{
 shadowContrib = computeShadowContrib(
 spotLightShadowMaps[_idx_], spotLightMatrices[_idx_], position,
 spotLightShadowMapSizes[_idx_]
 );
 shadowContribs[_idx_] = shadowContrib;
 }}
 for(int _idx_ = SPOT_LIGHT_SHADOWMAP_COUNT; _idx_ < SPOT_LIGHT_COUNT; _idx_++){{
 shadowContribs[_idx_] = 1.0;
 }}
}
#endif
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
#ifdef SHADOW_CASCADE
void computeShadowOfDirectionalLights(vec3 position, inout float shadowContribs[DIRECTIONAL_LIGHT_COUNT]){
 float depth = (2.0 * gl_FragCoord.z - gl_DepthRange.near - gl_DepthRange.far)
 / (gl_DepthRange.far - gl_DepthRange.near);
 float shadowContrib;
 shadowContribs[0] = 1.0;
 for (int _idx_ = 0; _idx_ < SHADOW_CASCADE; _idx_++) {{
 if (
 depth >= shadowCascadeClipsNear[_idx_] &&
 depth <= shadowCascadeClipsFar[_idx_]
 ) {
 shadowContrib = computeShadowContrib(
 directionalLightShadowMaps[0], directionalLightMatrices[_idx_], position,
 directionalLightShadowMapSizes[0],
 vec2(1.0 / float(SHADOW_CASCADE), 1.0),
 vec2(float(_idx_) / float(SHADOW_CASCADE), 0.0)
 );
 shadowContribs[0] = shadowContrib;
 }
 }}
 for(int _idx_ = DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++) {{
 shadowContribs[_idx_] = 1.0;
 }}
}
#else
void computeShadowOfDirectionalLights(vec3 position, inout float shadowContribs[DIRECTIONAL_LIGHT_COUNT]){
 float shadowContrib;
 for(int _idx_ = 0; _idx_ < DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_++) {{
 shadowContrib = computeShadowContrib(
 directionalLightShadowMaps[_idx_], directionalLightMatrices[_idx_], position,
 directionalLightShadowMapSizes[_idx_]
 );
 shadowContribs[_idx_] = shadowContrib;
 }}
 for(int _idx_ = DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++) {{
 shadowContribs[_idx_] = 1.0;
 }}
}
#endif
#endif
#if defined(POINT_LIGHT_SHADOWMAP_COUNT)
void computeShadowOfPointLights(vec3 position, inout float shadowContribs[POINT_LIGHT_COUNT] ){
 vec3 lightPosition;
 vec3 direction;
 for(int _idx_ = 0; _idx_ < POINT_LIGHT_SHADOWMAP_COUNT; _idx_++) {{
 lightPosition = pointLightPosition[_idx_];
 direction = position - lightPosition;
 shadowContribs[_idx_] = computeShadowContribOmni(pointLightShadowMaps[_idx_], direction, pointLightRange[_idx_]);
 }}
 for(int _idx_ = POINT_LIGHT_SHADOWMAP_COUNT; _idx_ < POINT_LIGHT_COUNT; _idx_++) {{
 shadowContribs[_idx_] = 1.0;
 }}
}
#endif
#endif
@end`;var Er=["px","nx","py","ny","pz","nz"];F.import(Yl);function Ka(e,t,r){if(r==="alphaMap")return e.material.get("diffuseMap");if(r==="alphaCutoff"){if(e.material.isDefined("fragment","ALPHA_TEST")&&e.material.get("diffuseMap")){var i=e.material.get("alphaCutoff");return i||0}return 0}else return r==="uvRepeat"?e.material.get("uvRepeat"):r==="uvOffset"?e.material.get("uvOffset"):t.get(r)}function ql(e,t){var r=e.material,i=t.material;return r.get("diffuseMap")!==i.get("diffuseMap")||(r.get("alphaCutoff")||0)!==(i.get("alphaCutoff")||0)}var Kt=xe.extend(function(){return{softShadow:Kt.PCF,shadowBlur:1,lightFrustumBias:"auto",kernelPCF:new Float32Array([1,0,1,1,-1,1,0,1,-1,0,-1,-1,1,-1,0,-1]),precision:"highp",_lastRenderNotCastShadow:!1,_frameBuffer:new ve,_textures:{},_shadowMapNumber:{POINT_LIGHT:0,DIRECTIONAL_LIGHT:0,SPOT_LIGHT:0},_depthMaterials:{},_distanceMaterials:{},_receivers:[],_lightsCastShadow:[],_lightCameras:{},_lightMaterials:{},_texturePool:new zn}},function(){this._gaussianPassH=new ge({fragment:F.source("clay.compositor.gaussian_blur")}),this._gaussianPassV=new ge({fragment:F.source("clay.compositor.gaussian_blur")}),this._gaussianPassH.setUniform("blurSize",this.shadowBlur),this._gaussianPassH.setUniform("blurDir",0),this._gaussianPassV.setUniform("blurSize",this.shadowBlur),this._gaussianPassV.setUniform("blurDir",1),this._outputDepthPass=new ge({fragment:F.source("clay.sm.debug_depth")})},{render:function(e,t,r,i){r||(r=t.getMainCamera()),this.trigger("beforerender",this,e,t,r),this._renderShadowPass(e,t,r,i),this.trigger("afterrender",this,e,t,r)},renderDebug:function(e,t){e.saveClear();var r=e.viewport,i=0,n=0,a=t||r.width/4,o=a;this.softShadow===Kt.VSM?this._outputDepthPass.material.define("fragment","USE_VSM"):this._outputDepthPass.material.undefine("fragment","USE_VSM");for(var s in this._textures){var l=this._textures[s];e.setViewport(i,n,a*l.width/l.height,o),this._outputDepthPass.setUniform("depthMap",l),this._outputDepthPass.render(e),i+=a*l.width/l.height}e.setViewport(r),e.restoreClear()},_updateReceivers:function(e,t){if(t.receiveShadow?(this._receivers.push(t),t.material.set("shadowEnabled",1),t.material.set("pcfKernel",this.kernelPCF)):t.material.set("shadowEnabled",0),this.softShadow===Kt.VSM)t.material.define("fragment","USE_VSM"),t.material.undefine("fragment","PCF_KERNEL_SIZE");else{t.material.undefine("fragment","USE_VSM");var r=this.kernelPCF;r&&r.length?t.material.define("fragment","PCF_KERNEL_SIZE",r.length/2):t.material.undefine("fragment","PCF_KERNEL_SIZE")}},_update:function(e,t){var r=this;t.traverse(function(a){a.isRenderable()&&r._updateReceivers(e,a)});for(var i=0;i<t.lights.length;i++){var n=t.lights[i];n.castShadow&&!n.invisible&&this._lightsCastShadow.push(n)}},_renderShadowPass:function(e,t,r,i){for(var n in this._shadowMapNumber)this._shadowMapNumber[n]=0;this._lightsCastShadow.length=0,this._receivers.length=0;var a=e.gl;if(i||t.update(),r&&r.update(),t.updateLights(),this._update(e,t),!this._lightsCastShadow.length&&this._lastRenderNotCastShadow)return;this._lastRenderNotCastShadow=this._lightsCastShadow===0,a.enable(a.DEPTH_TEST),a.depthMask(!0),a.disable(a.BLEND),a.clearColor(1,1,1,1);for(var o=[],s=[],l=[],f=[],h=[],u=[],d,c=0;c<this._lightsCastShadow.length;c++){var m=this._lightsCastShadow[c];if(m.type==="DIRECTIONAL_LIGHT"){if(d){console.warn("Only one direectional light supported with shadow cascade");continue}if(m.shadowCascade>4){console.warn("Support at most 4 cascade");continue}m.shadowCascade>1&&(d=m),this.renderDirectionalLightShadow(e,t,r,m,h,f,l)}else m.type==="SPOT_LIGHT"?this.renderSpotLightShadow(e,t,m,s,o):m.type==="POINT_LIGHT"&&this.renderPointLightShadow(e,t,m,u);this._shadowMapNumber[m.type]++}for(var p in this._shadowMapNumber)for(var v=this._shadowMapNumber[p],g=p+"_SHADOWMAP_COUNT",c=0;c<this._receivers.length;c++){var y=this._receivers[c],x=y.material;x.fragmentDefines[g]!==v&&(v>0?x.define("fragment",g,v):x.isDefined("fragment",g)&&x.undefine("fragment",g))}for(var c=0;c<this._receivers.length;c++){var y=this._receivers[c],x=y.material;d?x.define("fragment","SHADOW_CASCADE",d.shadowCascade):x.undefine("fragment","SHADOW_CASCADE")}var _=t.shadowUniforms;function S(P){return P.height}if(l.length>0){var E=l.map(S);if(_.directionalLightShadowMaps={value:l,type:"tv"},_.directionalLightMatrices={value:f,type:"m4v"},_.directionalLightShadowMapSizes={value:E,type:"1fv"},d){var b=h.slice(),A=h.slice();b.pop(),A.shift(),b.reverse(),A.reverse(),f.reverse(),_.shadowCascadeClipsNear={value:b,type:"1fv"},_.shadowCascadeClipsFar={value:A,type:"1fv"}}}if(o.length>0){var L=o.map(S),_=t.shadowUniforms;_.spotLightShadowMaps={value:o,type:"tv"},_.spotLightMatrices={value:s,type:"m4v"},_.spotLightShadowMapSizes={value:L,type:"1fv"}}u.length>0&&(_.pointLightShadowMaps={value:u,type:"tv"})},renderDirectionalLightShadow:(function(){var e=new li,t=new H,r=new Fe,i=new H,n=new H,a=new H,o=new H;return function(s,l,f,h,u,d,c){var m=this._getDepthMaterial(h),p={getMaterial:function(be){return be.shadowDepthMaterial||m},isMaterialChanged:ql,getUniform:Ka,ifRender:function(be){return be.castShadow},sortCompare:mr.opaqueSortCompare};if(!l.viewBoundingBoxLastFrame.isFinite()){var v=l.getBoundingBox();l.viewBoundingBoxLastFrame.copy(v).applyTransform(f.viewMatrix)}var g=Math.min(-l.viewBoundingBoxLastFrame.min.z,f.far),y=Math.max(-l.viewBoundingBoxLastFrame.max.z,f.near),x=this._getDirectionalLightCamera(h,l,f),_=a.array;o.copy(x.projectionMatrix),O.invert(n.array,x.worldTransform.array),O.multiply(n.array,n.array,f.worldTransform.array),O.multiply(_,o.array,n.array);for(var S=[],E=f instanceof Ge,b=(f.near+f.far)/(f.near-f.far),A=2*f.near*f.far/(f.near-f.far),L=0;L<=h.shadowCascade;L++){var P=y*Math.pow(g/y,L/h.shadowCascade),C=y+(g-y)*L/h.shadowCascade,I=P*h.cascadeSplitLogFactor+C*(1-h.cascadeSplitLogFactor);S.push(I),u.push(-(-I*b+A)/-I)}var B=this._getTexture(h,h.shadowCascade);c.push(B);var M=s.viewport,G=s.gl;this._frameBuffer.attach(B),this._frameBuffer.bind(s),G.clear(G.COLOR_BUFFER_BIT|G.DEPTH_BUFFER_BIT);for(var L=0;L<h.shadowCascade;L++){var k=S[L],Y=S[L+1];E?O.perspective(t.array,f.fov/180*Math.PI,f.aspect,k,Y):O.ortho(t.array,f.left,f.right,f.bottom,f.top,k,Y),e.setFromProjection(t),e.getTransformedBoundingBox(r,n),r.applyProjection(o);var U=r.min.array,ue=r.max.array;U[0]=Math.max(U[0],-1),U[1]=Math.max(U[1],-1),ue[0]=Math.min(ue[0],1),ue[1]=Math.min(ue[1],1),i.ortho(U[0],ue[0],U[1],ue[1],1,-1),x.projectionMatrix.multiplyLeft(i);var X=h.shadowResolution||512;s.setViewport((h.shadowCascade-L-1)*X,0,X,X,1);var _e=l.updateRenderList(x);s.renderPass(_e.opaque,x,p),this.softShadow===Kt.VSM&&this._gaussianFilter(s,B,B.width);var ce=new H;ce.copy(x.viewMatrix).multiplyLeft(x.projectionMatrix),d.push(ce.array),x.projectionMatrix.copy(o)}this._frameBuffer.unbind(s),s.setViewport(M)}})(),renderSpotLightShadow:function(e,t,r,i,n){var a=this._getTexture(r),o=this._getSpotLightCamera(r),s=e.gl;this._frameBuffer.attach(a),this._frameBuffer.bind(e),s.clear(s.COLOR_BUFFER_BIT|s.DEPTH_BUFFER_BIT);var l=this._getDepthMaterial(r),f={getMaterial:function(d){return d.shadowDepthMaterial||l},isMaterialChanged:ql,getUniform:Ka,ifRender:function(d){return d.castShadow},sortCompare:mr.opaqueSortCompare},h=t.updateRenderList(o);e.renderPass(h.opaque,o,f),this._frameBuffer.unbind(e),this.softShadow===Kt.VSM&&this._gaussianFilter(e,a,a.width);var u=new H;u.copy(o.worldTransform).invert().multiplyLeft(o.projectionMatrix),n.push(a),i.push(u.array)},renderPointLightShadow:function(e,t,r,i){var n=this._getTexture(r),a=e.gl;i.push(n);var o=this._getDepthMaterial(r),s={getMaterial:function(y){return y.shadowDepthMaterial||o},getUniform:Ka,sortCompare:mr.opaqueSortCompare},l={px:[],py:[],pz:[],nx:[],ny:[],nz:[]},f=new Fe,h=r.getWorldPosition().array,u=new Fe,d=r.range;u.min.setArray(h),u.max.setArray(h);var c=new R(d,d,d);u.max.add(c),u.min.sub(c);var m={px:!1,py:!1,pz:!1,nx:!1,ny:!1,nz:!1};t.traverse(function(y){if(y.isRenderable()&&y.castShadow){var x=y.geometry;if(!x.boundingBox){for(var _=0;_<Er.length;_++)l[Er[_]].push(y);return}if(f.transformFrom(x.boundingBox,y.worldTransform),!f.intersectBoundingBox(u))return;f.updateVertices();for(var _=0;_<Er.length;_++)m[Er[_]]=!1;for(var _=0;_<8;_++){var S=f.vertices[_],E=S[0]-h[0],b=S[1]-h[1],A=S[2]-h[2],L=Math.abs(E),P=Math.abs(b),C=Math.abs(A);L>P?L>C?m[E>0?"px":"nx"]=!0:m[A>0?"pz":"nz"]=!0:P>C?m[b>0?"py":"ny"]=!0:m[A>0?"pz":"nz"]=!0}for(var _=0;_<Er.length;_++)m[Er[_]]&&l[Er[_]].push(y)}});for(var p=0;p<6;p++){var v=Er[p],g=this._getPointLightCamera(r,v);this._frameBuffer.attach(n,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+p),this._frameBuffer.bind(e),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),e.renderPass(l[v],g,s)}this._frameBuffer.unbind(e)},_getDepthMaterial:function(e){var t=this._lightMaterials[e.__uid__],r=e.type==="POINT_LIGHT";if(!t){var i=r?"clay.sm.distance.":"clay.sm.depth.";t=new Ye({precision:this.precision,shader:new F(F.source(i+"vertex"),F.source(i+"fragment"))}),this._lightMaterials[e.__uid__]=t}return e.shadowSlopeScale!=null&&t.setUniform("slopeScale",e.shadowSlopeScale),e.shadowBias!=null&&t.setUniform("bias",e.shadowBias),this.softShadow===Kt.VSM?t.define("fragment","USE_VSM"):t.undefine("fragment","USE_VSM"),r&&(t.set("lightPosition",e.getWorldPosition().array),t.set("range",e.range)),t},_gaussianFilter:function(e,t,r){var i={width:r,height:r,type:V.FLOAT},n=this._texturePool.get(i);this._frameBuffer.attach(n),this._frameBuffer.bind(e),this._gaussianPassH.setUniform("texture",t),this._gaussianPassH.setUniform("textureWidth",r),this._gaussianPassH.render(e),this._frameBuffer.attach(t),this._gaussianPassV.setUniform("texture",n),this._gaussianPassV.setUniform("textureHeight",r),this._gaussianPassV.render(e),this._frameBuffer.unbind(e),this._texturePool.put(n)},_getTexture:function(e,t){var r=e.__uid__,i=this._textures[r],n=e.shadowResolution||512;return t=t||1,i||(e.type==="POINT_LIGHT"?i=new tr:i=new j,i.width=n*t,i.height=n,this.softShadow===Kt.VSM?(i.type=V.FLOAT,i.anisotropic=4):(i.minFilter=D.NEAREST,i.magFilter=D.NEAREST,i.useMipmap=!1),this._textures[r]=i),i},_getPointLightCamera:function(e,t){this._lightCameras.point||(this._lightCameras.point={px:new Ge,nx:new Ge,py:new Ge,ny:new Ge,pz:new Ge,nz:new Ge});var r=this._lightCameras.point[t];switch(r.far=e.range,r.fov=90,r.position.set(0,0,0),t){case"px":r.lookAt(R.POSITIVE_X,R.NEGATIVE_Y);break;case"nx":r.lookAt(R.NEGATIVE_X,R.NEGATIVE_Y);break;case"py":r.lookAt(R.POSITIVE_Y,R.POSITIVE_Z);break;case"ny":r.lookAt(R.NEGATIVE_Y,R.NEGATIVE_Z);break;case"pz":r.lookAt(R.POSITIVE_Z,R.NEGATIVE_Y);break;case"nz":r.lookAt(R.NEGATIVE_Z,R.NEGATIVE_Y);break}return e.getWorldPosition(r.position),r.update(),r},_getDirectionalLightCamera:(function(){var e=new H,t=new Fe,r=new Fe;return function(i,n,a){this._lightCameras.directional||(this._lightCameras.directional=new kt);var o=this._lightCameras.directional;t.copy(n.viewBoundingBoxLastFrame),t.intersection(a.frustum.boundingBox),o.position.copy(t.min).add(t.max).scale(.5).transformMat4(a.worldTransform),o.rotation.copy(i.rotation),o.scale.copy(i.scale),o.updateWorldTransform(),H.invert(e,o.worldTransform),H.multiply(e,e,a.worldTransform),r.copy(t).applyTransform(e);var s=r.min.array,l=r.max.array;return o.position.set((s[0]+l[0])/2,(s[1]+l[1])/2,l[2]).transformMat4(o.worldTransform),o.near=0,o.far=-s[2]+l[2],isNaN(this.lightFrustumBias)?o.far*=4:o.far+=this.lightFrustumBias,o.left=s[0],o.right=l[0],o.top=l[1],o.bottom=s[1],o.update(!0),o}})(),_getSpotLightCamera:function(e){this._lightCameras.spot||(this._lightCameras.spot=new Ge);var t=this._lightCameras.spot;return t.fov=e.penumbraAngle*2,t.far=e.range,t.worldTransform.copy(e.worldTransform),t.updateProjectionMatrix(),O.invert(t.viewMatrix.array,t.worldTransform.array),t},dispose:function(e){var t=e.gl||e;this._frameBuffer&&this._frameBuffer.dispose(t);for(var r in this._textures)this._textures[r].dispose(t);this._texturePool.clear(e.gl),this._depthMaterials={},this._distanceMaterials={},this._textures={},this._lightCameras={},this._shadowMapNumber={POINT_LIGHT:0,DIRECTIONAL_LIGHT:0,SPOT_LIGHT:0},this._meshMaterials={};for(var i=0;i<this._receivers.length;i++){var n=this._receivers[i];if(n.material){var a=n.material;a.undefine("fragment","POINT_LIGHT_SHADOW_COUNT"),a.undefine("fragment","DIRECTIONAL_LIGHT_SHADOW_COUNT"),a.undefine("fragment","AMBIENT_LIGHT_SHADOW_COUNT"),a.set("shadowEnabled",0)}}this._receivers=[],this._lightsCastShadow=[]}});Kt.VSM=1;Kt.PCF=2;var Kl=Kt;var Md=xe.extend(function(){return{name:"",inputLinks:{},outputLinks:{},_prevOutputTextures:{},_outputTextures:{},_outputReferences:{},_rendering:!1,_rendered:!1,_compositor:null}},{updateParameter:function(e,t){var r=this.outputs[e],i=r.parameters,n=r._parametersCopy;if(n||(n=r._parametersCopy={}),i)for(var a in i)a!=="width"&&a!=="height"&&(n[a]=i[a]);var o,s;return i.width instanceof Function?o=i.width.call(this,t):o=i.width,i.height instanceof Function?s=i.height.call(this,t):s=i.height,(n.width!==o||n.height!==s)&&this._outputTextures[e]&&this._outputTextures[e].dispose(t.gl),n.width=o,n.height=s,n},setParameter:function(e,t){},getParameter:function(e){},setParameters:function(e){for(var t in e)this.setParameter(t,e[t])},render:function(){},getOutput:function(e,t){if(t==null)return t=e,this._outputTextures[t];var r=this.outputs[t];if(r)return this._rendered?r.outputLastFrame?this._prevOutputTextures[t]:this._outputTextures[t]:this._rendering?(this._prevOutputTextures[t]||(this._prevOutputTextures[t]=this._compositor.allocateTexture(r.parameters||{})),this._prevOutputTextures[t]):(this.render(e),this._outputTextures[t])},removeReference:function(e){if(this._outputReferences[e]--,this._outputReferences[e]===0){var t=this.outputs[e];t.keepLastFrame?(this._prevOutputTextures[e]&&this._compositor.releaseTexture(this._prevOutputTextures[e]),this._prevOutputTextures[e]=this._outputTextures[e]):this._compositor.releaseTexture(this._outputTextures[e])}},link:function(e,t,r){this.inputLinks[e]={node:t,pin:r},t.outputLinks[r]||(t.outputLinks[r]=[]),t.outputLinks[r].push({node:this,pin:e}),this.pass.material.enableTexture(e)},clear:function(){this.inputLinks={},this.outputLinks={}},updateReference:function(e){if(!this._rendering){this._rendering=!0;for(var t in this.inputLinks){var r=this.inputLinks[t];r.node.updateReference(r.pin)}this._rendering=!1}e&&this._outputReferences[e]++},beforeFrame:function(){this._rendered=!1;for(var e in this.outputLinks)this._outputReferences[e]=0},afterFrame:function(){for(var e in this.outputLinks)if(this._outputReferences[e]>0){var t=this.outputs[e];t.keepLastFrame?(this._prevOutputTextures[e]&&this._compositor.releaseTexture(this._prevOutputTextures[e]),this._prevOutputTextures[e]=this._outputTextures[e]):this._compositor.releaseTexture(this._outputTextures[e])}}}),ir=Md;var Pd=xe.extend(function(){return{nodes:[]}},{dirty:function(){this._dirty=!0},addNode:function(e){this.nodes.indexOf(e)>=0||(this.nodes.push(e),this._dirty=!0)},removeNode:function(e){typeof e=="string"&&(e=this.getNodeByName(e));var t=this.nodes.indexOf(e);t>=0&&(this.nodes.splice(t,1),this._dirty=!0)},getNodeByName:function(e){for(var t=0;t<this.nodes.length;t++)if(this.nodes[t].name===e)return this.nodes[t]},update:function(){for(var e=0;e<this.nodes.length;e++)this.nodes[e].clear();for(var e=0;e<this.nodes.length;e++){var t=this.nodes[e];if(t.inputs){for(var r in t.inputs)if(t.inputs[r]){if(t.pass&&!t.pass.material.isUniformEnabled(r)){console.warn("Pin "+t.name+"."+r+" not used.");continue}var i=t.inputs[r],n=this.findPin(i);n?t.link(r,n.node,n.pin):console.warn(typeof i=="string"?"Node "+i+" not exist":"Pin of "+i.node+"."+i.pin+" not exist")}}}},findPin:function(e){var t;if((typeof e=="string"||e instanceof ir)&&(e={node:e}),typeof e.node=="string")for(var r=0;r<this.nodes.length;r++){var i=this.nodes[r];i.name===e.node&&(t=i)}else t=e.node;if(t){var n=e.pin;if(n||t.outputs&&(n=Object.keys(t.outputs)[0]),t.outputs[n])return{node:t,pin:n}}}}),Qa=Pd;var Nd=Qa.extend(function(){return{_outputs:[],_texturePool:new zn,_frameBuffer:new ve({depthBuffer:!1})}},{addNode:function(e){Qa.prototype.addNode.call(this,e),e._compositor=this},render:function(e,t){if(this._dirty){this.update(),this._dirty=!1,this._outputs.length=0;for(var r=0;r<this.nodes.length;r++)this.nodes[r].outputs||this._outputs.push(this.nodes[r])}for(var r=0;r<this.nodes.length;r++)this.nodes[r].beforeFrame();for(var r=0;r<this._outputs.length;r++)this._outputs[r].updateReference();for(var r=0;r<this._outputs.length;r++)this._outputs[r].render(e,t);for(var r=0;r<this.nodes.length;r++)this.nodes[r].afterFrame()},allocateTexture:function(e){return this._texturePool.get(e)},releaseTexture:function(e){this._texturePool.put(e)},getFrameBuffer:function(){return this._frameBuffer},dispose:function(e){this._texturePool.clear(e)}}),Ql=Nd;var Rd=ir.extend({name:"scene",scene:null,camera:null,autoUpdateScene:!0,preZ:!1},function(){this.frameBuffer=new ve},{render:function(e){this._rendering=!0;var t=e.gl;this.trigger("beforerender");var r;if(!this.outputs)r=e.render(this.scene,this.camera,!this.autoUpdateScene,this.preZ);else{var i=this.frameBuffer;for(var n in this.outputs){var a=this.updateParameter(n,e),o=this.outputs[n],s=this._compositor.allocateTexture(a);this._outputTextures[n]=s;var l=o.attachment||t.COLOR_ATTACHMENT0;typeof l=="string"&&(l=t[l]),i.attach(s,l)}i.bind(e);var f=e.getGLExtension("EXT_draw_buffers");if(f){var h=[];for(var l in this.outputs)l=parseInt(l),l>=t.COLOR_ATTACHMENT0&&l<=t.COLOR_ATTACHMENT0+8&&h.push(l);f.drawBuffersEXT(h)}e.saveClear(),e.clearBit=D.DEPTH_BUFFER_BIT|D.COLOR_BUFFER_BIT,r=e.render(this.scene,this.camera,!this.autoUpdateScene,this.preZ),e.restoreClear(),i.unbind(e)}this.trigger("afterrender",r),this._rendering=!1,this._rendered=!0}}),Jl=Rd;var Id=ir.extend(function(){return{texture:null,outputs:{color:{}}}},function(){},{getOutput:function(e,t){return this.texture},beforeFrame:function(){},afterFrame:function(){}}),$l=Id;var Od=ir.extend(function(){return{name:"",inputs:{},outputs:null,shader:"",inputLinks:{},outputLinks:{},pass:null,_prevOutputTextures:{},_outputTextures:{},_outputReferences:{},_rendering:!1,_rendered:!1,_compositor:null}},function(){var e=new ge({fragment:this.shader});this.pass=e},{render:function(e,t){this.trigger("beforerender",e),this._rendering=!0;var r=e.gl;for(var i in this.inputLinks){var n=this.inputLinks[i],a=n.node.getOutput(e,n.pin);this.pass.setUniform(i,a)}if(!this.outputs)this.pass.outputs=null,this._compositor.getFrameBuffer().unbind(e),this.pass.render(e,t);else{this.pass.outputs={};var o={};for(var s in this.outputs){var l=this.updateParameter(s,e);isNaN(l.width)&&this.updateParameter(s,e);var f=this.outputs[s],h=this._compositor.allocateTexture(l);this._outputTextures[s]=h;var u=f.attachment||r.COLOR_ATTACHMENT0;typeof u=="string"&&(u=r[u]),o[u]=h}this._compositor.getFrameBuffer().bind(e);for(var u in o)this._compositor.getFrameBuffer().attach(o[u],u);this.pass.render(e),this._compositor.getFrameBuffer().updateMipmap(e)}for(var i in this.inputLinks){var n=this.inputLinks[i];n.node.removeReference(n.pin)}this._rendering=!1,this._rendered=!0,this.trigger("afterrender",e)},updateParameter:function(e,t){var r=this.outputs[e],i=r.parameters,n=r._parametersCopy;if(n||(n=r._parametersCopy={}),i)for(var a in i)a!=="width"&&a!=="height"&&(n[a]=i[a]);var o,s;return typeof i.width=="function"?o=i.width.call(this,t):o=i.width,typeof i.height=="function"?s=i.height.call(this,t):s=i.height,o=Math.ceil(o),s=Math.ceil(s),(n.width!==o||n.height!==s)&&this._outputTextures[e]&&this._outputTextures[e].dispose(t),n.width=o,n.height=s,n},setParameter:function(e,t){this.pass.setUniform(e,t)},getParameter:function(e){return this.pass.getUniform(e)},setParameters:function(e){for(var t in e)this.setParameter(t,e[t])},define:function(e,t){this.pass.material.define("fragment",e,t)},undefine:function(e){this.pass.material.undefine("fragment",e)},removeReference:function(e){if(this._outputReferences[e]--,this._outputReferences[e]===0){var t=this.outputs[e];t.keepLastFrame?(this._prevOutputTextures[e]&&this._compositor.releaseTexture(this._prevOutputTextures[e]),this._prevOutputTextures[e]=this._outputTextures[e]):this._compositor.releaseTexture(this._outputTextures[e])}},clear:function(){ir.prototype.clear.call(this),this.pass.material.disableTexturesAll()}}),ef=Od;var tf=`@export clay.compositor.coloradjust
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float brightness : 0.0;
uniform float contrast : 1.0;
uniform float exposure : 0.0;
uniform float gamma : 1.0;
uniform float saturation : 1.0;
const vec3 w = vec3(0.2125, 0.7154, 0.0721);
void main()
{
 vec4 tex = texture2D( texture, v_Texcoord);
 vec3 color = clamp(tex.rgb + vec3(brightness), 0.0, 1.0);
 color = clamp( (color-vec3(0.5))*contrast+vec3(0.5), 0.0, 1.0);
 color = clamp( color * pow(2.0, exposure), 0.0, 1.0);
 color = clamp( pow(color, vec3(gamma)), 0.0, 1.0);
 float luminance = dot( color, w );
 color = mix(vec3(luminance), color, saturation);
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.brightness
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float brightness : 0.0;
void main()
{
 vec4 tex = texture2D( texture, v_Texcoord);
 vec3 color = tex.rgb + vec3(brightness);
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.contrast
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float contrast : 1.0;
void main()
{
 vec4 tex = texture2D( texture, v_Texcoord);
 vec3 color = (tex.rgb-vec3(0.5))*contrast+vec3(0.5);
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.exposure
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float exposure : 0.0;
void main()
{
 vec4 tex = texture2D(texture, v_Texcoord);
 vec3 color = tex.rgb * pow(2.0, exposure);
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.gamma
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float gamma : 1.0;
void main()
{
 vec4 tex = texture2D(texture, v_Texcoord);
 vec3 color = pow(tex.rgb, vec3(gamma));
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.saturation
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float saturation : 1.0;
const vec3 w = vec3(0.2125, 0.7154, 0.0721);
void main()
{
 vec4 tex = texture2D(texture, v_Texcoord);
 vec3 color = tex.rgb;
 float luminance = dot(color, w);
 color = mix(vec3(luminance), color, saturation);
 gl_FragColor = vec4(color, tex.a);
}
@end`;var Vn=`@export clay.compositor.kernel.gaussian_9
float gaussianKernel[9];
gaussianKernel[0] = 0.07;
gaussianKernel[1] = 0.09;
gaussianKernel[2] = 0.12;
gaussianKernel[3] = 0.14;
gaussianKernel[4] = 0.16;
gaussianKernel[5] = 0.14;
gaussianKernel[6] = 0.12;
gaussianKernel[7] = 0.09;
gaussianKernel[8] = 0.07;
@end
@export clay.compositor.kernel.gaussian_13
float gaussianKernel[13];
gaussianKernel[0] = 0.02;
gaussianKernel[1] = 0.03;
gaussianKernel[2] = 0.06;
gaussianKernel[3] = 0.08;
gaussianKernel[4] = 0.11;
gaussianKernel[5] = 0.13;
gaussianKernel[6] = 0.14;
gaussianKernel[7] = 0.13;
gaussianKernel[8] = 0.11;
gaussianKernel[9] = 0.08;
gaussianKernel[10] = 0.06;
gaussianKernel[11] = 0.03;
gaussianKernel[12] = 0.02;
@end
@export clay.compositor.gaussian_blur
#define SHADER_NAME gaussian_blur
uniform sampler2D texture;varying vec2 v_Texcoord;
uniform float blurSize : 2.0;
uniform vec2 textureSize : [512.0, 512.0];
uniform float blurDir : 0.0;
@import clay.util.rgbm
@import clay.util.clamp_sample
void main (void)
{
 @import clay.compositor.kernel.gaussian_9
 vec2 off = blurSize / textureSize;
 off *= vec2(1.0 - blurDir, blurDir);
 vec4 sum = vec4(0.0);
 float weightAll = 0.0;
 for (int i = 0; i < 9; i++) {
 float w = gaussianKernel[i];
 vec4 texel = decodeHDR(clampSample(texture, v_Texcoord + float(i - 4) * off));
 sum += texel * w;
 weightAll += w;
 }
 gl_FragColor = encodeHDR(sum / max(weightAll, 0.01));
}
@end
`;var rf=`@export clay.compositor.hdr.log_lum
varying vec2 v_Texcoord;
uniform sampler2D texture;
const vec3 w = vec3(0.2125, 0.7154, 0.0721);
@import clay.util.rgbm
void main()
{
 vec4 tex = decodeHDR(texture2D(texture, v_Texcoord));
 float luminance = dot(tex.rgb, w);
 luminance = log(luminance + 0.001);
 gl_FragColor = encodeHDR(vec4(vec3(luminance), 1.0));
}
@end
@export clay.compositor.hdr.lum_adaption
varying vec2 v_Texcoord;
uniform sampler2D adaptedLum;
uniform sampler2D currentLum;
uniform float frameTime : 0.02;
@import clay.util.rgbm
void main()
{
 float fAdaptedLum = decodeHDR(texture2D(adaptedLum, vec2(0.5, 0.5))).r;
 float fCurrentLum = exp(encodeHDR(texture2D(currentLum, vec2(0.5, 0.5))).r);
 fAdaptedLum += (fCurrentLum - fAdaptedLum) * (1.0 - pow(0.98, 30.0 * frameTime));
 gl_FragColor = encodeHDR(vec4(vec3(fAdaptedLum), 1.0));
}
@end
@export clay.compositor.lum
varying vec2 v_Texcoord;
uniform sampler2D texture;
const vec3 w = vec3(0.2125, 0.7154, 0.0721);
void main()
{
 vec4 tex = texture2D( texture, v_Texcoord );
 float luminance = dot(tex.rgb, w);
 gl_FragColor = vec4(vec3(luminance), 1.0);
}
@end`;var Hn=`
@export clay.compositor.lut
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform sampler2D lookup;
void main()
{
 vec4 tex = texture2D(texture, v_Texcoord);
 float blueColor = tex.b * 63.0;
 vec2 quad1;
 quad1.y = floor(floor(blueColor) / 8.0);
 quad1.x = floor(blueColor) - (quad1.y * 8.0);
 vec2 quad2;
 quad2.y = floor(ceil(blueColor) / 8.0);
 quad2.x = ceil(blueColor) - (quad2.y * 8.0);
 vec2 texPos1;
 texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.r);
 texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.g);
 vec2 texPos2;
 texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.r);
 texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.g);
 vec4 newColor1 = texture2D(lookup, texPos1);
 vec4 newColor2 = texture2D(lookup, texPos2);
 vec4 newColor = mix(newColor1, newColor2, fract(blueColor));
 gl_FragColor = vec4(newColor.rgb, tex.w);
}
@end`;var nf=`@export clay.compositor.vignette
#define OUTPUT_ALPHA
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float darkness: 1;
uniform float offset: 1;
@import clay.util.rgbm
void main()
{
 vec4 texel = decodeHDR(texture2D(texture, v_Texcoord));
 gl_FragColor.rgb = texel.rgb;
 vec2 uv = (v_Texcoord - vec2(0.5)) * vec2(offset);
 gl_FragColor = encodeHDR(vec4(mix(texel.rgb, vec3(1.0 - darkness), dot(uv, uv)), texel.a));
}
@end`;var kn=`@export clay.compositor.output
#define OUTPUT_ALPHA
varying vec2 v_Texcoord;
uniform sampler2D texture;
@import clay.util.rgbm
void main()
{
 vec4 tex = decodeHDR(texture2D(texture, v_Texcoord));
 gl_FragColor.rgb = tex.rgb;
#ifdef OUTPUT_ALPHA
 gl_FragColor.a = tex.a;
#else
 gl_FragColor.a = 1.0;
#endif
 gl_FragColor = encodeHDR(gl_FragColor);
#ifdef PREMULTIPLY_ALPHA
 gl_FragColor.rgb *= gl_FragColor.a;
#endif
}
@end`;var Wn=`@export clay.compositor.bright
uniform sampler2D texture;
uniform float threshold : 1;
uniform float scale : 1.0;
uniform vec2 textureSize: [512, 512];
varying vec2 v_Texcoord;
const vec3 lumWeight = vec3(0.2125, 0.7154, 0.0721);
@import clay.util.rgbm
vec4 median(vec4 a, vec4 b, vec4 c)
{
 return a + b + c - min(min(a, b), c) - max(max(a, b), c);
}
void main()
{
 vec4 texel = decodeHDR(texture2D(texture, v_Texcoord));
#ifdef ANTI_FLICKER
 vec3 d = 1.0 / textureSize.xyx * vec3(1.0, 1.0, 0.0);
 vec4 s1 = decodeHDR(texture2D(texture, v_Texcoord - d.xz));
 vec4 s2 = decodeHDR(texture2D(texture, v_Texcoord + d.xz));
 vec4 s3 = decodeHDR(texture2D(texture, v_Texcoord - d.zy));
 vec4 s4 = decodeHDR(texture2D(texture, v_Texcoord + d.zy));
 texel = median(median(texel, s1, s2), s3, s4);
#endif
 float lum = dot(texel.rgb , lumWeight);
 vec4 color;
 if (lum > threshold && texel.a > 0.0)
 {
 color = vec4(texel.rgb * scale, texel.a * scale);
 }
 else
 {
 color = vec4(0.0);
 }
 gl_FragColor = encodeHDR(color);
}
@end
`;var Xn=`@export clay.compositor.downsample
uniform sampler2D texture;
uniform vec2 textureSize : [512, 512];
varying vec2 v_Texcoord;
@import clay.util.rgbm
float brightness(vec3 c)
{
 return max(max(c.r, c.g), c.b);
}
@import clay.util.clamp_sample
void main()
{
 vec4 d = vec4(-1.0, -1.0, 1.0, 1.0) / textureSize.xyxy;
#ifdef ANTI_FLICKER
 vec3 s1 = decodeHDR(clampSample(texture, v_Texcoord + d.xy)).rgb;
 vec3 s2 = decodeHDR(clampSample(texture, v_Texcoord + d.zy)).rgb;
 vec3 s3 = decodeHDR(clampSample(texture, v_Texcoord + d.xw)).rgb;
 vec3 s4 = decodeHDR(clampSample(texture, v_Texcoord + d.zw)).rgb;
 float s1w = 1.0 / (brightness(s1) + 1.0);
 float s2w = 1.0 / (brightness(s2) + 1.0);
 float s3w = 1.0 / (brightness(s3) + 1.0);
 float s4w = 1.0 / (brightness(s4) + 1.0);
 float oneDivideSum = 1.0 / (s1w + s2w + s3w + s4w);
 vec4 color = vec4(
 (s1 * s1w + s2 * s2w + s3 * s3w + s4 * s4w) * oneDivideSum,
 1.0
 );
#else
 vec4 color = decodeHDR(clampSample(texture, v_Texcoord + d.xy));
 color += decodeHDR(clampSample(texture, v_Texcoord + d.zy));
 color += decodeHDR(clampSample(texture, v_Texcoord + d.xw));
 color += decodeHDR(clampSample(texture, v_Texcoord + d.zw));
 color *= 0.25;
#endif
 gl_FragColor = encodeHDR(color);
}
@end`;var jn=`
@export clay.compositor.upsample
#define HIGH_QUALITY
uniform sampler2D texture;
uniform vec2 textureSize : [512, 512];
uniform float sampleScale: 0.5;
varying vec2 v_Texcoord;
@import clay.util.rgbm
@import clay.util.clamp_sample
void main()
{
#ifdef HIGH_QUALITY
 vec4 d = vec4(1.0, 1.0, -1.0, 0.0) / textureSize.xyxy * sampleScale;
 vec4 s;
 s = decodeHDR(clampSample(texture, v_Texcoord - d.xy));
 s += decodeHDR(clampSample(texture, v_Texcoord - d.wy)) * 2.0;
 s += decodeHDR(clampSample(texture, v_Texcoord - d.zy));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.zw)) * 2.0;
 s += decodeHDR(clampSample(texture, v_Texcoord )) * 4.0;
 s += decodeHDR(clampSample(texture, v_Texcoord + d.xw)) * 2.0;
 s += decodeHDR(clampSample(texture, v_Texcoord + d.zy));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.wy)) * 2.0;
 s += decodeHDR(clampSample(texture, v_Texcoord + d.xy));
 gl_FragColor = encodeHDR(s / 16.0);
#else
 vec4 d = vec4(-1.0, -1.0, +1.0, +1.0) / textureSize.xyxy;
 vec4 s;
 s = decodeHDR(clampSample(texture, v_Texcoord + d.xy));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.zy));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.xw));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.zw));
 gl_FragColor = encodeHDR(s / 4.0);
#endif
}
@end`;var Zn=`@export clay.compositor.hdr.composite
#define TONEMAPPING
uniform sampler2D texture;
#ifdef BLOOM_ENABLED
uniform sampler2D bloom;
#endif
#ifdef LENSFLARE_ENABLED
uniform sampler2D lensflare;
uniform sampler2D lensdirt;
#endif
#ifdef LUM_ENABLED
uniform sampler2D lum;
#endif
#ifdef LUT_ENABLED
uniform sampler2D lut;
#endif
#ifdef COLOR_CORRECTION
uniform float brightness : 0.0;
uniform float contrast : 1.0;
uniform float saturation : 1.0;
#endif
#ifdef VIGNETTE
uniform float vignetteDarkness: 1.0;
uniform float vignetteOffset: 1.0;
#endif
uniform float exposure : 1.0;
uniform float bloomIntensity : 0.25;
uniform float lensflareIntensity : 1;
varying vec2 v_Texcoord;
@import clay.util.srgb
vec3 ACESToneMapping(vec3 color)
{
 const float A = 2.51;
 const float B = 0.03;
 const float C = 2.43;
 const float D = 0.59;
 const float E = 0.14;
 return (color * (A * color + B)) / (color * (C * color + D) + E);
}
float eyeAdaption(float fLum)
{
 return mix(0.2, fLum, 0.5);
}
#ifdef LUT_ENABLED
vec3 lutTransform(vec3 color) {
 float blueColor = color.b * 63.0;
 vec2 quad1;
 quad1.y = floor(floor(blueColor) / 8.0);
 quad1.x = floor(blueColor) - (quad1.y * 8.0);
 vec2 quad2;
 quad2.y = floor(ceil(blueColor) / 8.0);
 quad2.x = ceil(blueColor) - (quad2.y * 8.0);
 vec2 texPos1;
 texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.r);
 texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.g);
 vec2 texPos2;
 texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.r);
 texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.g);
 vec4 newColor1 = texture2D(lut, texPos1);
 vec4 newColor2 = texture2D(lut, texPos2);
 vec4 newColor = mix(newColor1, newColor2, fract(blueColor));
 return newColor.rgb;
}
#endif
@import clay.util.rgbm
void main()
{
 vec4 texel = vec4(0.0);
 vec4 originalTexel = vec4(0.0);
#ifdef TEXTURE_ENABLED
 texel = decodeHDR(texture2D(texture, v_Texcoord));
 originalTexel = texel;
#endif
#ifdef BLOOM_ENABLED
 vec4 bloomTexel = decodeHDR(texture2D(bloom, v_Texcoord));
 texel.rgb += bloomTexel.rgb * bloomIntensity;
 texel.a += bloomTexel.a * bloomIntensity;
#endif
#ifdef LENSFLARE_ENABLED
 texel += decodeHDR(texture2D(lensflare, v_Texcoord)) * texture2D(lensdirt, v_Texcoord) * lensflareIntensity;
#endif
 texel.a = min(texel.a, 1.0);
#ifdef LUM_ENABLED
 float fLum = texture2D(lum, vec2(0.5, 0.5)).r;
 float adaptedLumDest = 3.0 / (max(0.1, 1.0 + 10.0*eyeAdaption(fLum)));
 float exposureBias = adaptedLumDest * exposure;
#else
 float exposureBias = exposure;
#endif
#ifdef TONEMAPPING
 texel.rgb *= exposureBias;
 texel.rgb = ACESToneMapping(texel.rgb);
#endif
 texel = linearTosRGB(texel);
#ifdef LUT_ENABLED
 texel.rgb = lutTransform(clamp(texel.rgb,vec3(0.0),vec3(1.0)));
#endif
#ifdef COLOR_CORRECTION
 texel.rgb = clamp(texel.rgb + vec3(brightness), 0.0, 1.0);
 texel.rgb = clamp((texel.rgb - vec3(0.5))*contrast+vec3(0.5), 0.0, 1.0);
 float lum = dot(texel.rgb, vec3(0.2125, 0.7154, 0.0721));
 texel.rgb = mix(vec3(lum), texel.rgb, saturation);
#endif
#ifdef VIGNETTE
 vec2 uv = (v_Texcoord - vec2(0.5)) * vec2(vignetteOffset);
 texel.rgb = mix(texel.rgb, vec3(1.0 - vignetteDarkness), dot(uv, uv));
#endif
 gl_FragColor = encodeHDR(texel);
#ifdef DEBUG
 #if DEBUG == 1
 gl_FragColor = encodeHDR(decodeHDR(texture2D(texture, v_Texcoord)));
 #elif DEBUG == 2
 gl_FragColor = encodeHDR(decodeHDR(texture2D(bloom, v_Texcoord)) * bloomIntensity);
 #elif DEBUG == 3
 gl_FragColor = encodeHDR(decodeHDR(texture2D(lensflare, v_Texcoord) * lensflareIntensity));
 #endif
#endif
 if (originalTexel.a <= 0.01 && gl_FragColor.a > 1e-5) {
 gl_FragColor.a = dot(gl_FragColor.rgb, vec3(0.2125, 0.7154, 0.0721));
 }
#ifdef PREMULTIPLY_ALPHA
 gl_FragColor.rgb *= gl_FragColor.a;
#endif
}
@end`;var af=`@export clay.compositor.lensflare
#define SAMPLE_NUMBER 8
uniform sampler2D texture;
uniform sampler2D lenscolor;
uniform vec2 textureSize : [512, 512];
uniform float dispersal : 0.3;
uniform float haloWidth : 0.4;
uniform float distortion : 1.0;
varying vec2 v_Texcoord;
@import clay.util.rgbm
vec4 textureDistorted(
 in vec2 texcoord,
 in vec2 direction,
 in vec3 distortion
) {
 return vec4(
 decodeHDR(texture2D(texture, texcoord + direction * distortion.r)).r,
 decodeHDR(texture2D(texture, texcoord + direction * distortion.g)).g,
 decodeHDR(texture2D(texture, texcoord + direction * distortion.b)).b,
 1.0
 );
}
void main()
{
 vec2 texcoord = -v_Texcoord + vec2(1.0); vec2 textureOffset = 1.0 / textureSize;
 vec2 ghostVec = (vec2(0.5) - texcoord) * dispersal;
 vec2 haloVec = normalize(ghostVec) * haloWidth;
 vec3 distortion = vec3(-textureOffset.x * distortion, 0.0, textureOffset.x * distortion);
 vec4 result = vec4(0.0);
 for (int i = 0; i < SAMPLE_NUMBER; i++)
 {
 vec2 offset = fract(texcoord + ghostVec * float(i));
 float weight = length(vec2(0.5) - offset) / length(vec2(0.5));
 weight = pow(1.0 - weight, 10.0);
 result += textureDistorted(offset, normalize(ghostVec), distortion) * weight;
 }
 result *= texture2D(lenscolor, vec2(length(vec2(0.5) - texcoord)) / length(vec2(0.5)));
 float weight = length(vec2(0.5) - fract(texcoord + haloVec)) / length(vec2(0.5));
 weight = pow(1.0 - weight, 10.0);
 vec2 offset = fract(texcoord + haloVec);
 result += textureDistorted(offset, normalize(ghostVec), distortion) * weight;
 gl_FragColor = result;
}
@end`;var Yn=`@export clay.compositor.blend
#define SHADER_NAME blend
#ifdef TEXTURE1_ENABLED
uniform sampler2D texture1;
uniform float weight1 : 1.0;
#endif
#ifdef TEXTURE2_ENABLED
uniform sampler2D texture2;
uniform float weight2 : 1.0;
#endif
#ifdef TEXTURE3_ENABLED
uniform sampler2D texture3;
uniform float weight3 : 1.0;
#endif
#ifdef TEXTURE4_ENABLED
uniform sampler2D texture4;
uniform float weight4 : 1.0;
#endif
#ifdef TEXTURE5_ENABLED
uniform sampler2D texture5;
uniform float weight5 : 1.0;
#endif
#ifdef TEXTURE6_ENABLED
uniform sampler2D texture6;
uniform float weight6 : 1.0;
#endif
varying vec2 v_Texcoord;
@import clay.util.rgbm
void main()
{
 vec4 tex = vec4(0.0);
#ifdef TEXTURE1_ENABLED
 tex += decodeHDR(texture2D(texture1, v_Texcoord)) * weight1;
#endif
#ifdef TEXTURE2_ENABLED
 tex += decodeHDR(texture2D(texture2, v_Texcoord)) * weight2;
#endif
#ifdef TEXTURE3_ENABLED
 tex += decodeHDR(texture2D(texture3, v_Texcoord)) * weight3;
#endif
#ifdef TEXTURE4_ENABLED
 tex += decodeHDR(texture2D(texture4, v_Texcoord)) * weight4;
#endif
#ifdef TEXTURE5_ENABLED
 tex += decodeHDR(texture2D(texture5, v_Texcoord)) * weight5;
#endif
#ifdef TEXTURE6_ENABLED
 tex += decodeHDR(texture2D(texture6, v_Texcoord)) * weight6;
#endif
 gl_FragColor = encodeHDR(tex);
}
@end`;var qn=`@export clay.compositor.fxaa
uniform sampler2D texture;
uniform vec4 viewport : VIEWPORT;
varying vec2 v_Texcoord;
#define FXAA_REDUCE_MIN (1.0/128.0)
#define FXAA_REDUCE_MUL (1.0/8.0)
#define FXAA_SPAN_MAX 8.0
@import clay.util.rgbm
void main()
{
 vec2 resolution = 1.0 / viewport.zw;
 vec3 rgbNW = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ) ).xyz;
 vec3 rgbNE = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ) ).xyz;
 vec3 rgbSW = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ) ).xyz;
 vec3 rgbSE = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ) ).xyz;
 vec4 rgbaM = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution ) );
 vec3 rgbM = rgbaM.xyz;
 float opacity = rgbaM.w;
 vec3 luma = vec3( 0.299, 0.587, 0.114 );
 float lumaNW = dot( rgbNW, luma );
 float lumaNE = dot( rgbNE, luma );
 float lumaSW = dot( rgbSW, luma );
 float lumaSE = dot( rgbSE, luma );
 float lumaM = dot( rgbM, luma );
 float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );
 float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );
 vec2 dir;
 dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
 dir.y = ((lumaNW + lumaSW) - (lumaNE + lumaSE));
 float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );
 float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );
 dir = min( vec2( FXAA_SPAN_MAX, FXAA_SPAN_MAX),
 max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
 dir * rcpDirMin)) * resolution;
 vec3 rgbA = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * ( 1.0 / 3.0 - 0.5 ) ) ).xyz;
 rgbA += decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * ( 2.0 / 3.0 - 0.5 ) ) ).xyz;
 rgbA *= 0.5;
 vec3 rgbB = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * -0.5 ) ).xyz;
 rgbB += decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * 0.5 ) ).xyz;
 rgbB *= 0.25;
 rgbB += rgbA * 0.5;
 float lumaB = dot( rgbB, luma );
 if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) )
 {
 gl_FragColor = vec4( rgbA, opacity );
 }
 else {
 gl_FragColor = vec4( rgbB, opacity );
 }
}
@end`;function Ja(e){e.import(tf),e.import(Vn),e.import(rf),e.import(Hn),e.import(nf),e.import(kn),e.import(Wn),e.import(Xn),e.import(jn),e.import(Zn),e.import(af),e.import(Yn),e.import(qn)}Ja(F);var Bd=/^#source\((.*?)\)/;function Fd(e,t){var r=new Ql;t=t||{};var i={textures:{},parameters:{}},n=function(s,l){for(var f=0;f<e.nodes.length;f++){var h=e.nodes[f],u=Gd(h,i,t);u&&r.addNode(u)}};for(var a in e.parameters){var o=e.parameters[a];i.parameters[a]=$a(o)}return Vd(e,i,t,function(s){i.textures=s,n()}),r}function Gd(e,t,r){var i=e.type||"filter",n,a,o;if(i==="filter"){var s=e.shader.trim(),l=Bd.exec(s);if(l?n=F.source(l[1].trim()):s.charAt(0)==="#"&&(n=t.shaders[s.substr(1)]),n||(n=s),!n)return}if(e.inputs){a={};for(var f in e.inputs)typeof e.inputs[f]=="string"?a[f]=e.inputs[f]:a[f]={node:e.inputs[f].node,pin:e.inputs[f].pin}}if(e.outputs){o={};for(var f in e.outputs){var h=e.outputs[f];o[f]={},h.attachment!=null&&(o[f].attachment=h.attachment),h.keepLastFrame!=null&&(o[f].keepLastFrame=h.keepLastFrame),h.outputLastFrame!=null&&(o[f].outputLastFrame=h.outputLastFrame),h.parameters&&(o[f].parameters=$a(h.parameters))}}var u;if(i==="scene"?u=new Jl({name:e.name,scene:r.scene,camera:r.camera,outputs:o}):i==="texture"?u=new $l({name:e.name,outputs:o}):u=new ef({name:e.name,shader:n,inputs:a,outputs:o}),u){if(e.parameters)for(var f in e.parameters){var d=e.parameters[f];typeof d=="string"?(d=d.trim(),d.charAt(0)==="#"?d=t.textures[d.substr(1)]:u.on("beforerender",Hd(f,of(d)))):typeof d=="function"&&u.on("beforerender",d),u.setParameter(f,d)}if(e.defines&&u.pass)for(var f in e.defines){var d=e.defines[f];u.pass.material.define("fragment",f,d)}}return u}function Ud(e,t){return e}function zd(e,t){return t}function $a(e){var t={};if(!e)return t;["type","minFilter","magFilter","wrapS","wrapT","flipY","useMipmap"].forEach(function(i){var n=e[i];n!=null&&(typeof n=="string"&&(n=V[n]),t[i]=n)});var r=e.scale||1;return["width","height"].forEach(function(i){if(e[i]!=null){var n=e[i];typeof n=="string"?(n=n.trim(),t[i]=kd(i,of(n),r)):t[i]=n}}),t.width||(t.width=Ud),t.height||(t.height=zd),e.useMipmap!=null&&(t.useMipmap=e.useMipmap),t}function Vd(e,t,r,i){if(!e.textures){i({});return}var n={},a=0,o=!1,s=r.textureRootPath;Ne.each(e.textures,function(l,f){var h,u=l.path,d=$a(l.parameters);if(Array.isArray(u)&&u.length===6)s&&(u=u.map(function(c){return Ne.relative2absolute(c,s)})),h=new tr(d);else if(typeof u=="string")s&&(u=Ne.relative2absolute(u,s)),h=new j(d);else return;h.load(u),a++,h.once("success",function(){n[f]=h,a--,a===0&&(i(n),o=!0)})}),a===0&&!o&&i(n)}function Hd(e,t){return function(r){var i=r.getDevicePixelRatio(),n=r.getWidth(),a=r.getHeight(),o=t(n,a,i);this.setParameter(e,o)}}function kd(e,t,r){return r=r||1,function(i){var n=i.getDevicePixelRatio(),a=i.getWidth()*r,o=i.getHeight()*r;return t(a,o,n)}}function of(e){var t=/^expr\((.*)\)$/.exec(e);if(t)try{var r=new Function("width","height","dpr","return "+t[1]);return r(1,1),r}catch{throw new Error("Invalid expression.")}}var sf=Fd;var lf=sf;function Wd(e,t){for(var r=0,i=1/t,n=e;n>0;)r=r+i*(n%t),n=Math.floor(n/t),i=i/t;return r}var nr=Wd;var ff=`@export ecgl.ssao.estimate

uniform sampler2D depthTex;

uniform sampler2D normalTex;

uniform sampler2D noiseTex;

uniform vec2 depthTexSize;

uniform vec2 noiseTexSize;

uniform mat4 projection;

uniform mat4 projectionInv;

uniform mat4 viewInverseTranspose;

uniform vec3 kernel[KERNEL_SIZE];

uniform float radius : 1;

uniform float power : 1;

uniform float bias: 1e-2;

uniform float intensity: 1.0;

varying vec2 v_Texcoord;

float ssaoEstimator(in vec3 originPos, in mat3 kernelBasis) {
 float occlusion = 0.0;

 for (int i = 0; i < KERNEL_SIZE; i++) {
 vec3 samplePos = kernel[i];
#ifdef NORMALTEX_ENABLED
 samplePos = kernelBasis * samplePos;
#endif
 samplePos = samplePos * radius + originPos;

 vec4 texCoord = projection * vec4(samplePos, 1.0);
 texCoord.xy /= texCoord.w;

 vec4 depthTexel = texture2D(depthTex, texCoord.xy * 0.5 + 0.5);

 float sampleDepth = depthTexel.r * 2.0 - 1.0;
 if (projection[3][3] == 0.0) {
 sampleDepth = projection[3][2] / (sampleDepth * projection[2][3] - projection[2][2]);
 }
 else {
 sampleDepth = (sampleDepth - projection[3][2]) / projection[2][2];
 }
 
 float rangeCheck = smoothstep(0.0, 1.0, radius / abs(originPos.z - sampleDepth));
 occlusion += rangeCheck * step(samplePos.z, sampleDepth - bias);
 }
#ifdef NORMALTEX_ENABLED
 occlusion = 1.0 - occlusion / float(KERNEL_SIZE);
#else
 occlusion = 1.0 - clamp((occlusion / float(KERNEL_SIZE) - 0.6) * 2.5, 0.0, 1.0);
#endif
 return pow(occlusion, power);
}

void main()
{

 vec4 depthTexel = texture2D(depthTex, v_Texcoord);

#ifdef NORMALTEX_ENABLED
 vec4 tex = texture2D(normalTex, v_Texcoord);
 if (dot(tex.rgb, tex.rgb) == 0.0) {
 gl_FragColor = vec4(1.0);
 return;
 }
 vec3 N = tex.rgb * 2.0 - 1.0;
 N = (viewInverseTranspose * vec4(N, 0.0)).xyz;

 vec2 noiseTexCoord = depthTexSize / vec2(noiseTexSize) * v_Texcoord;
 vec3 rvec = texture2D(noiseTex, noiseTexCoord).rgb * 2.0 - 1.0;
 vec3 T = normalize(rvec - N * dot(rvec, N));
 vec3 BT = normalize(cross(N, T));
 mat3 kernelBasis = mat3(T, BT, N);
#else
 if (depthTexel.r > 0.99999) {
 gl_FragColor = vec4(1.0);
 return;
 }
 mat3 kernelBasis;
#endif

 float z = depthTexel.r * 2.0 - 1.0;

 vec4 projectedPos = vec4(v_Texcoord * 2.0 - 1.0, z, 1.0);
 vec4 p4 = projectionInv * projectedPos;

 vec3 position = p4.xyz / p4.w;

 float ao = ssaoEstimator(position, kernelBasis);
 ao = clamp(1.0 - (1.0 - ao) * intensity, 0.0, 1.0);
 gl_FragColor = vec4(vec3(ao), 1.0);
}

@end


@export ecgl.ssao.blur
#define SHADER_NAME SSAO_BLUR

uniform sampler2D ssaoTexture;

#ifdef NORMALTEX_ENABLED
uniform sampler2D normalTex;
#endif

varying vec2 v_Texcoord;

uniform vec2 textureSize;
uniform float blurSize : 1.0;

uniform int direction: 0.0;

#ifdef DEPTHTEX_ENABLED
uniform sampler2D depthTex;
uniform mat4 projection;
uniform float depthRange : 0.5;

float getLinearDepth(vec2 coord)
{
 float depth = texture2D(depthTex, coord).r * 2.0 - 1.0;
 return projection[3][2] / (depth * projection[2][3] - projection[2][2]);
}
#endif

void main()
{
 float kernel[5];
 kernel[0] = 0.122581;
 kernel[1] = 0.233062;
 kernel[2] = 0.288713;
 kernel[3] = 0.233062;
 kernel[4] = 0.122581;

 vec2 off = vec2(0.0);
 if (direction == 0) {
 off[0] = blurSize / textureSize.x;
 }
 else {
 off[1] = blurSize / textureSize.y;
 }

 vec2 coord = v_Texcoord;

 float sum = 0.0;
 float weightAll = 0.0;

#ifdef NORMALTEX_ENABLED
 vec3 centerNormal = texture2D(normalTex, v_Texcoord).rgb * 2.0 - 1.0;
#endif
#if defined(DEPTHTEX_ENABLED)
 float centerDepth = getLinearDepth(v_Texcoord);
#endif

 for (int i = 0; i < 5; i++) {
 vec2 coord = clamp(v_Texcoord + vec2(float(i) - 2.0) * off, vec2(0.0), vec2(1.0));

 float w = kernel[i];
#ifdef NORMALTEX_ENABLED
 vec3 normal = texture2D(normalTex, coord).rgb * 2.0 - 1.0;
 w *= clamp(dot(normal, centerNormal), 0.0, 1.0);
#endif
#ifdef DEPTHTEX_ENABLED
 float d = getLinearDepth(coord);
 w *= (1.0 - smoothstep(abs(centerDepth - d) / depthRange, 0.0, 1.0));
#endif

 weightAll += w;
 sum += texture2D(ssaoTexture, coord).r * w;
 }

 gl_FragColor = vec4(vec3(sum / weightAll), 1.0);
}

@end
`;F.import(ff);function uf(e){for(var t=new Uint8Array(e*e*4),r=0,i=new R,n=0;n<e;n++)for(var a=0;a<e;a++)i.set(Math.random()*2-1,Math.random()*2-1,0).normalize(),t[r++]=(i.x*.5+.5)*255,t[r++]=(i.y*.5+.5)*255,t[r++]=0,t[r++]=255;return t}function hf(e){return new j({pixels:uf(e),wrapS:V.REPEAT,wrapT:V.REPEAT,width:e,height:e})}function Xd(e,t,r){var i=new Float32Array(e*3);t=t||0;for(var n=0;n<e;n++){var a=nr(n+t,2)*(r?1:2)*Math.PI,o=nr(n+t,3)*Math.PI,s=Math.random(),l=Math.cos(a)*Math.sin(o)*s,f=Math.cos(o)*s,h=Math.sin(a)*Math.sin(o)*s;i[n*3]=l,i[n*3+1]=f,i[n*3+2]=h}return i}function ar(e){e=e||{},this._ssaoPass=new ge({fragment:F.source("ecgl.ssao.estimate")}),this._blurPass=new ge({fragment:F.source("ecgl.ssao.blur")}),this._framebuffer=new ve({depthBuffer:!1}),this._ssaoTexture=new j,this._blurTexture=new j,this._blurTexture2=new j,this._depthTex=e.depthTexture,this._normalTex=e.normalTexture,this.setNoiseSize(4),this.setKernelSize(e.kernelSize||12),e.radius!=null&&this.setParameter("radius",e.radius),e.power!=null&&this.setParameter("power",e.power),this._normalTex||(this._ssaoPass.material.disableTexture("normalTex"),this._blurPass.material.disableTexture("normalTex")),this._depthTex||this._blurPass.material.disableTexture("depthTex"),this._blurPass.material.setUniform("normalTex",this._normalTex),this._blurPass.material.setUniform("depthTex",this._depthTex)}ar.prototype.setDepthTexture=function(e){this._depthTex=e};ar.prototype.setNormalTexture=function(e){this._normalTex=e,this._ssaoPass.material[e?"enableTexture":"disableTexture"]("normalTex"),this.setKernelSize(this._kernelSize)};ar.prototype.update=function(e,t,r){var i=e.getWidth(),n=e.getHeight(),a=this._ssaoPass,o=this._blurPass;a.setUniform("kernel",this._kernels[r%this._kernels.length]),a.setUniform("depthTex",this._depthTex),this._normalTex!=null&&a.setUniform("normalTex",this._normalTex),a.setUniform("depthTexSize",[this._depthTex.width,this._depthTex.height]);var s=new H;H.transpose(s,t.worldTransform),a.setUniform("projection",t.projectionMatrix.array),a.setUniform("projectionInv",t.invProjectionMatrix.array),a.setUniform("viewInverseTranspose",s.array);var l=this._ssaoTexture,f=this._blurTexture,h=this._blurTexture2;l.width=i/2,l.height=n/2,f.width=i,f.height=n,h.width=i,h.height=n,this._framebuffer.attach(l),this._framebuffer.bind(e),e.gl.clearColor(1,1,1,1),e.gl.clear(e.gl.COLOR_BUFFER_BIT),a.render(e),o.setUniform("textureSize",[i/2,n/2]),o.setUniform("projection",t.projectionMatrix.array),this._framebuffer.attach(f),o.setUniform("direction",0),o.setUniform("ssaoTexture",l),o.render(e),this._framebuffer.attach(h),o.setUniform("textureSize",[i,n]),o.setUniform("direction",1),o.setUniform("ssaoTexture",f),o.render(e),this._framebuffer.unbind(e);var u=e.clearColor;e.gl.clearColor(u[0],u[1],u[2],u[3])};ar.prototype.getTargetTexture=function(){return this._blurTexture2};ar.prototype.setParameter=function(e,t){e==="noiseTexSize"?this.setNoiseSize(t):e==="kernelSize"?this.setKernelSize(t):e==="intensity"?this._ssaoPass.material.set("intensity",t):this._ssaoPass.setUniform(e,t)};ar.prototype.setKernelSize=function(e){this._kernelSize=e,this._ssaoPass.material.define("fragment","KERNEL_SIZE",e),this._kernels=this._kernels||[];for(var t=0;t<30;t++)this._kernels[t]=Xd(e,t*e,!!this._normalTex)};ar.prototype.setNoiseSize=function(e){var t=this._ssaoPass.getUniform("noiseTex");t?(t.data=uf(e),t.width=t.height=e,t.dirty()):(t=hf(e),this._ssaoPass.setUniform("noiseTex",hf(e))),this._ssaoPass.setUniform("noiseTexSize",[e,e])};ar.prototype.dispose=function(e){this._blurTexture.dispose(e),this._ssaoTexture.dispose(e),this._blurTexture2.dispose(e)};var cf=ar;var df=`@export ecgl.ssr.main

#define SHADER_NAME SSR
#define MAX_ITERATION 20;
#define SAMPLE_PER_FRAME 5;
#define TOTAL_SAMPLES 128;

uniform sampler2D sourceTexture;
uniform sampler2D gBufferTexture1;
uniform sampler2D gBufferTexture2;
uniform sampler2D gBufferTexture3;
uniform samplerCube specularCubemap;
uniform float specularIntensity: 1;

uniform mat4 projection;
uniform mat4 projectionInv;
uniform mat4 toViewSpace;
uniform mat4 toWorldSpace;

uniform float maxRayDistance: 200;

uniform float pixelStride: 16;
uniform float pixelStrideZCutoff: 50; 
uniform float screenEdgeFadeStart: 0.9; 
uniform float eyeFadeStart : 0.2; uniform float eyeFadeEnd: 0.8; 
uniform float minGlossiness: 0.2; uniform float zThicknessThreshold: 1;

uniform float nearZ;
uniform vec2 viewportSize : VIEWPORT_SIZE;

uniform float jitterOffset: 0;

varying vec2 v_Texcoord;

#ifdef DEPTH_DECODE
@import clay.util.decode_float
#endif

#ifdef PHYSICALLY_CORRECT
uniform sampler2D normalDistribution;
uniform float sampleOffset: 0;
uniform vec2 normalDistributionSize;

vec3 transformNormal(vec3 H, vec3 N) {
 vec3 upVector = N.y > 0.999 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
 vec3 tangentX = normalize(cross(N, upVector));
 vec3 tangentZ = cross(N, tangentX);
 return normalize(tangentX * H.x + N * H.y + tangentZ * H.z);
}
vec3 importanceSampleNormalGGX(float i, float roughness, vec3 N) {
 float p = fract((i + sampleOffset) / float(TOTAL_SAMPLES));
 vec3 H = texture2D(normalDistribution,vec2(roughness, p)).rgb;
 return transformNormal(H, N);
}
float G_Smith(float g, float ndv, float ndl) {
 float roughness = 1.0 - g;
 float k = roughness * roughness / 2.0;
 float G1V = ndv / (ndv * (1.0 - k) + k);
 float G1L = ndl / (ndl * (1.0 - k) + k);
 return G1L * G1V;
}
vec3 F_Schlick(float ndv, vec3 spec) {
 return spec + (1.0 - spec) * pow(1.0 - ndv, 5.0);
}
#endif

float fetchDepth(sampler2D depthTexture, vec2 uv)
{
 vec4 depthTexel = texture2D(depthTexture, uv);
 return depthTexel.r * 2.0 - 1.0;
}

float linearDepth(float depth)
{
 if (projection[3][3] == 0.0) {
 return projection[3][2] / (depth * projection[2][3] - projection[2][2]);
 }
 else {
 return (depth - projection[3][2]) / projection[2][2];
 }
}

bool rayIntersectDepth(float rayZNear, float rayZFar, vec2 hitPixel)
{
 if (rayZFar > rayZNear)
 {
 float t = rayZFar; rayZFar = rayZNear; rayZNear = t;
 }
 float cameraZ = linearDepth(fetchDepth(gBufferTexture2, hitPixel));
 return rayZFar <= cameraZ && rayZNear >= cameraZ - zThicknessThreshold;
}


bool traceScreenSpaceRay(
 vec3 rayOrigin, vec3 rayDir, float jitter,
 out vec2 hitPixel, out vec3 hitPoint, out float iterationCount
)
{
 float rayLength = ((rayOrigin.z + rayDir.z * maxRayDistance) > -nearZ)
 ? (-nearZ - rayOrigin.z) / rayDir.z : maxRayDistance;

 vec3 rayEnd = rayOrigin + rayDir * rayLength;

 vec4 H0 = projection * vec4(rayOrigin, 1.0);
 vec4 H1 = projection * vec4(rayEnd, 1.0);

 float k0 = 1.0 / H0.w, k1 = 1.0 / H1.w;

 vec3 Q0 = rayOrigin * k0, Q1 = rayEnd * k1;

 vec2 P0 = (H0.xy * k0 * 0.5 + 0.5) * viewportSize;
 vec2 P1 = (H1.xy * k1 * 0.5 + 0.5) * viewportSize;

 P1 += dot(P1 - P0, P1 - P0) < 0.0001 ? 0.01 : 0.0;
 vec2 delta = P1 - P0;

 bool permute = false;
 if (abs(delta.x) < abs(delta.y)) {
 permute = true;
 delta = delta.yx;
 P0 = P0.yx;
 P1 = P1.yx;
 }
 float stepDir = sign(delta.x);
 float invdx = stepDir / delta.x;

 vec3 dQ = (Q1 - Q0) * invdx;
 float dk = (k1 - k0) * invdx;

 vec2 dP = vec2(stepDir, delta.y * invdx);

 float strideScaler = 1.0 - min(1.0, -rayOrigin.z / pixelStrideZCutoff);
 float pixStride = 1.0 + strideScaler * pixelStride;

 dP *= pixStride; dQ *= pixStride; dk *= pixStride;

 vec4 pqk = vec4(P0, Q0.z, k0);
 vec4 dPQK = vec4(dP, dQ.z, dk);

 pqk += dPQK * jitter;
 float rayZFar = (dPQK.z * 0.5 + pqk.z) / (dPQK.w * 0.5 + pqk.w);
 float rayZNear;

 bool intersect = false;

 vec2 texelSize = 1.0 / viewportSize;

 iterationCount = 0.0;

 for (int i = 0; i < MAX_ITERATION; i++)
 {
 pqk += dPQK;

 rayZNear = rayZFar;
 rayZFar = (dPQK.z * 0.5 + pqk.z) / (dPQK.w * 0.5 + pqk.w);

 hitPixel = permute ? pqk.yx : pqk.xy;
 hitPixel *= texelSize;

 intersect = rayIntersectDepth(rayZNear, rayZFar, hitPixel);

 iterationCount += 1.0;

 dPQK *= 1.2;

 if (intersect) {
 break;
 }
 }

 Q0.xy += dQ.xy * iterationCount;
 Q0.z = pqk.z;
 hitPoint = Q0 / pqk.w;

 return intersect;
}

float calculateAlpha(
 float iterationCount, float reflectivity,
 vec2 hitPixel, vec3 hitPoint, float dist, vec3 rayDir
)
{
 float alpha = clamp(reflectivity, 0.0, 1.0);
 alpha *= 1.0 - (iterationCount / float(MAX_ITERATION));
 vec2 hitPixelNDC = hitPixel * 2.0 - 1.0;
 float maxDimension = min(1.0, max(abs(hitPixelNDC.x), abs(hitPixelNDC.y)));
 alpha *= 1.0 - max(0.0, maxDimension - screenEdgeFadeStart) / (1.0 - screenEdgeFadeStart);

 float _eyeFadeStart = eyeFadeStart;
 float _eyeFadeEnd = eyeFadeEnd;
 if (_eyeFadeStart > _eyeFadeEnd) {
 float tmp = _eyeFadeEnd;
 _eyeFadeEnd = _eyeFadeStart;
 _eyeFadeStart = tmp;
 }

 float eyeDir = clamp(rayDir.z, _eyeFadeStart, _eyeFadeEnd);
 alpha *= 1.0 - (eyeDir - _eyeFadeStart) / (_eyeFadeEnd - _eyeFadeStart);

 alpha *= 1.0 - clamp(dist / maxRayDistance, 0.0, 1.0);

 return alpha;
}

@import clay.util.rand

@import clay.util.rgbm

void main()
{
 vec4 normalAndGloss = texture2D(gBufferTexture1, v_Texcoord);

 if (dot(normalAndGloss.rgb, vec3(1.0)) == 0.0) {
 discard;
 }

 float g = normalAndGloss.a;
#if !defined(PHYSICALLY_CORRECT)
 if (g <= minGlossiness) {
 discard;
 }
#endif

 float reflectivity = (g - minGlossiness) / (1.0 - minGlossiness);

 vec3 N = normalize(normalAndGloss.rgb * 2.0 - 1.0);
 N = normalize((toViewSpace * vec4(N, 0.0)).xyz);

 vec4 projectedPos = vec4(v_Texcoord * 2.0 - 1.0, fetchDepth(gBufferTexture2, v_Texcoord), 1.0);
 vec4 pos = projectionInv * projectedPos;
 vec3 rayOrigin = pos.xyz / pos.w;
 vec3 V = -normalize(rayOrigin);

 float ndv = clamp(dot(N, V), 0.0, 1.0);
 float iterationCount;
 float jitter = rand(fract(v_Texcoord + jitterOffset));

#ifdef PHYSICALLY_CORRECT
 vec4 color = vec4(vec3(0.0), 1.0);
 vec4 albedoMetalness = texture2D(gBufferTexture3, v_Texcoord);
 vec3 albedo = albedoMetalness.rgb;
 float m = albedoMetalness.a;
 vec3 diffuseColor = albedo * (1.0 - m);
 vec3 spec = mix(vec3(0.04), albedo, m);

 float jitter2 = rand(fract(v_Texcoord)) * float(TOTAL_SAMPLES);

 for (int i = 0; i < SAMPLE_PER_FRAME; i++) {
 vec3 H = importanceSampleNormalGGX(float(i) + jitter2, 1.0 - g, N);
 vec3 rayDir = normalize(reflect(-V, H));
#else
 vec3 rayDir = normalize(reflect(-V, N));
#endif
 vec2 hitPixel;
 vec3 hitPoint;

 bool intersect = traceScreenSpaceRay(rayOrigin, rayDir, jitter, hitPixel, hitPoint, iterationCount);

 float dist = distance(rayOrigin, hitPoint);

 vec3 hitNormal = texture2D(gBufferTexture1, hitPixel).rgb * 2.0 - 1.0;
 hitNormal = normalize((toViewSpace * vec4(hitNormal, 0.0)).xyz);
#ifdef PHYSICALLY_CORRECT
 float ndl = clamp(dot(N, rayDir), 0.0, 1.0);
 float vdh = clamp(dot(V, H), 0.0, 1.0);
 float ndh = clamp(dot(N, H), 0.0, 1.0);
 vec3 litTexel = vec3(0.0);
 if (dot(hitNormal, rayDir) < 0.0 && intersect) {
 litTexel = texture2D(sourceTexture, hitPixel).rgb;
 litTexel *= pow(clamp(1.0 - dist / 200.0, 0.0, 1.0), 3.0);

 }
 else {
 #ifdef SPECULARCUBEMAP_ENABLED
 vec3 rayDirW = normalize(toWorldSpace * vec4(rayDir, 0.0)).rgb;
 litTexel = RGBMDecode(textureCubeLodEXT(specularCubemap, rayDirW, 0.0), 8.12).rgb * specularIntensity;
#endif
 }
 color.rgb += ndl * litTexel * (
 F_Schlick(ndl, spec) * G_Smith(g, ndv, ndl) * vdh / (ndh * ndv + 0.001)
 );
 }
 color.rgb /= float(SAMPLE_PER_FRAME);
#else
 #if !defined(SPECULARCUBEMAP_ENABLED)
 if (dot(hitNormal, rayDir) >= 0.0) {
 discard;
 }
 if (!intersect) {
 discard;
 }
#endif
 float alpha = clamp(calculateAlpha(iterationCount, reflectivity, hitPixel, hitPoint, dist, rayDir), 0.0, 1.0);
 vec4 color = texture2D(sourceTexture, hitPixel);
 color.rgb *= alpha;

#ifdef SPECULARCUBEMAP_ENABLED
 vec3 rayDirW = normalize(toWorldSpace * vec4(rayDir, 0.0)).rgb;
 alpha = alpha * (intersect ? 1.0 : 0.0);
 float bias = (1.0 -g) * 5.0;
 color.rgb += (1.0 - alpha)
 * RGBMDecode(textureCubeLodEXT(specularCubemap, rayDirW, bias), 8.12).rgb
 * specularIntensity;
#endif

#endif

 gl_FragColor = encodeHDR(color);
}
@end

@export ecgl.ssr.blur

uniform sampler2D texture;
uniform sampler2D gBufferTexture1;
uniform sampler2D gBufferTexture2;
uniform mat4 projection;
uniform float depthRange : 0.05;

varying vec2 v_Texcoord;

uniform vec2 textureSize;
uniform float blurSize : 1.0;

#ifdef BLEND
 #ifdef SSAOTEX_ENABLED
uniform sampler2D ssaoTex;
 #endif
uniform sampler2D sourceTexture;
#endif

float getLinearDepth(vec2 coord)
{
 float depth = texture2D(gBufferTexture2, coord).r * 2.0 - 1.0;
 return projection[3][2] / (depth * projection[2][3] - projection[2][2]);
}

@import clay.util.rgbm


void main()
{
 @import clay.compositor.kernel.gaussian_9

 vec4 centerNTexel = texture2D(gBufferTexture1, v_Texcoord);
 float g = centerNTexel.a;
 float maxBlurSize = clamp(1.0 - g, 0.0, 1.0) * blurSize;
#ifdef VERTICAL
 vec2 off = vec2(0.0, maxBlurSize / textureSize.y);
#else
 vec2 off = vec2(maxBlurSize / textureSize.x, 0.0);
#endif

 vec2 coord = v_Texcoord;

 vec4 sum = vec4(0.0);
 float weightAll = 0.0;

 vec3 cN = centerNTexel.rgb * 2.0 - 1.0;
 float cD = getLinearDepth(v_Texcoord);
 for (int i = 0; i < 9; i++) {
 vec2 coord = clamp((float(i) - 4.0) * off + v_Texcoord, vec2(0.0), vec2(1.0));
 float w = gaussianKernel[i]
 * clamp(dot(cN, texture2D(gBufferTexture1, coord).rgb * 2.0 - 1.0), 0.0, 1.0);
 float d = getLinearDepth(coord);
 w *= (1.0 - smoothstep(abs(cD - d) / depthRange, 0.0, 1.0));

 weightAll += w;
 sum += decodeHDR(texture2D(texture, coord)) * w;
 }

#ifdef BLEND
 float aoFactor = 1.0;
 #ifdef SSAOTEX_ENABLED
 aoFactor = texture2D(ssaoTex, v_Texcoord).r;
 #endif
 gl_FragColor = encodeHDR(
 sum / weightAll * aoFactor + decodeHDR(texture2D(sourceTexture, v_Texcoord))
 );
#else
 gl_FragColor = encodeHDR(sum / weightAll);
#endif
}

@end`;F.import(df);function or(e){e=e||{},this._ssrPass=new ge({fragment:F.source("ecgl.ssr.main"),clearColor:[0,0,0,0]}),this._blurPass1=new ge({fragment:F.source("ecgl.ssr.blur"),clearColor:[0,0,0,0]}),this._blurPass2=new ge({fragment:F.source("ecgl.ssr.blur"),clearColor:[0,0,0,0]}),this._blendPass=new ge({fragment:F.source("clay.compositor.blend")}),this._blendPass.material.disableTexturesAll(),this._blendPass.material.enableTexture(["texture1","texture2"]),this._ssrPass.setUniform("gBufferTexture1",e.normalTexture),this._ssrPass.setUniform("gBufferTexture2",e.depthTexture),this._blurPass1.setUniform("gBufferTexture1",e.normalTexture),this._blurPass1.setUniform("gBufferTexture2",e.depthTexture),this._blurPass2.setUniform("gBufferTexture1",e.normalTexture),this._blurPass2.setUniform("gBufferTexture2",e.depthTexture),this._blurPass2.material.define("fragment","VERTICAL"),this._blurPass2.material.define("fragment","BLEND"),this._ssrTexture=new j({type:V.HALF_FLOAT}),this._texture2=new j({type:V.HALF_FLOAT}),this._texture3=new j({type:V.HALF_FLOAT}),this._prevTexture=new j({type:V.HALF_FLOAT}),this._currentTexture=new j({type:V.HALF_FLOAT}),this._frameBuffer=new ve({depthBuffer:!1}),this._normalDistribution=null,this._totalSamples=256,this._samplePerFrame=4,this._ssrPass.material.define("fragment","SAMPLE_PER_FRAME",this._samplePerFrame),this._ssrPass.material.define("fragment","TOTAL_SAMPLES",this._totalSamples),this._downScale=1}or.prototype.setAmbientCubemap=function(e,t){this._ssrPass.material.set("specularCubemap",e),this._ssrPass.material.set("specularIntensity",t);var r=e&&t;this._ssrPass.material[r?"enableTexture":"disableTexture"]("specularCubemap")};or.prototype.update=function(e,t,r,i){var n=e.getWidth(),a=e.getHeight(),o=this._ssrTexture,s=this._texture2,l=this._texture3;o.width=this._prevTexture.width=this._currentTexture.width=n/this._downScale,o.height=this._prevTexture.height=this._currentTexture.height=a/this._downScale,s.width=l.width=n,s.height=l.height=a;var f=this._frameBuffer,h=this._ssrPass,u=this._blurPass1,d=this._blurPass2,c=this._blendPass,m=new H,p=new H;H.transpose(m,t.worldTransform),H.transpose(p,t.viewMatrix),h.setUniform("sourceTexture",r),h.setUniform("projection",t.projectionMatrix.array),h.setUniform("projectionInv",t.invProjectionMatrix.array),h.setUniform("toViewSpace",m.array),h.setUniform("toWorldSpace",p.array),h.setUniform("nearZ",t.near);var v=i/this._totalSamples*this._samplePerFrame;if(h.setUniform("jitterOffset",v),h.setUniform("sampleOffset",i*this._samplePerFrame),u.setUniform("textureSize",[o.width,o.height]),d.setUniform("textureSize",[n,a]),d.setUniform("sourceTexture",r),u.setUniform("projection",t.projectionMatrix.array),d.setUniform("projection",t.projectionMatrix.array),f.attach(o),f.bind(e),h.render(e),this._physicallyCorrect&&(f.attach(this._currentTexture),c.setUniform("texture1",this._prevTexture),c.setUniform("texture2",o),c.material.set({weight1:i>=1?.95:0,weight2:i>=1?.05:1}),c.render(e)),f.attach(s),u.setUniform("texture",this._physicallyCorrect?this._currentTexture:o),u.render(e),f.attach(l),d.setUniform("texture",s),d.render(e),f.unbind(e),this._physicallyCorrect){var g=this._prevTexture;this._prevTexture=this._currentTexture,this._currentTexture=g}};or.prototype.getTargetTexture=function(){return this._texture3};or.prototype.setParameter=function(e,t){e==="maxIteration"?this._ssrPass.material.define("fragment","MAX_ITERATION",t):this._ssrPass.setUniform(e,t)};or.prototype.setPhysicallyCorrect=function(e){e?(this._normalDistribution||(this._normalDistribution=ci.generateNormalDistribution(64,this._totalSamples)),this._ssrPass.material.define("fragment","PHYSICALLY_CORRECT"),this._ssrPass.material.set("normalDistribution",this._normalDistribution),this._ssrPass.material.set("normalDistributionSize",[64,this._totalSamples])):this._ssrPass.material.undefine("fragment","PHYSICALLY_CORRECT"),this._physicallyCorrect=e};or.prototype.setSSAOTexture=function(e){var t=this._blurPass2;e?(t.material.enableTexture("ssaoTex"),t.material.set("ssaoTex",e)):t.material.disableTexture("ssaoTex")};or.prototype.isFinished=function(e){return this._physicallyCorrect?e>this._totalSamples/this._samplePerFrame:!0};or.prototype.dispose=function(e){this._ssrTexture.dispose(e),this._texture2.dispose(e),this._texture3.dispose(e),this._prevTexture.dispose(e),this._currentTexture.dispose(e),this._frameBuffer.dispose(e)};var mf=or;var eo=[0,0,-.321585265978,-.154972575841,.458126042375,.188473391593,.842080129861,.527766490688,.147304551086,-.659453822776,-.331943915203,-.940619700594,.0479226680259,.54812163202,.701581552186,-.709825561388,-.295436780218,.940589268233,-.901489676764,.237713156085,.973570876096,-.109899459384,-.866792314779,-.451805525005,.330975007087,.800048655954,-.344275183665,.381779221166,-.386139432542,-.437418421534,-.576478634965,-.0148463392551,.385798197415,-.262426961053,-.666302061145,.682427250835,-.628010632582,-.732836215494,.10163141741,-.987658134403,.711995289051,-.320024291314,.0296005138058,.950296523438,.0130612307608,-.351024443122,-.879596633704,-.10478487883,.435712737232,.504254490347,.779203817497,.206477676721,.388264289969,-.896736162545,-.153106280781,-.629203242522,-.245517550697,.657969239148,.126830499058,.26862328493,-.634888119007,-.302301223431,.617074219636,.779817204925];var pf=`@export ecgl.normal.vertex

@import ecgl.common.transformUniforms

@import ecgl.common.uv.header

@import ecgl.common.attributes

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

@import ecgl.common.normalMap.vertexHeader

@import ecgl.common.vertexAnimation.header

void main()
{

 @import ecgl.common.vertexAnimation.main

 @import ecgl.common.uv.main

 v_Normal = normalize((worldInverseTranspose * vec4(normal, 0.0)).xyz);
 v_WorldPosition = (world * vec4(pos, 1.0)).xyz;

 @import ecgl.common.normalMap.vertexMain

 gl_Position = worldViewProjection * vec4(pos, 1.0);

}


@end


@export ecgl.normal.fragment

#define ROUGHNESS_CHANEL 0

uniform bool useBumpMap;
uniform bool useRoughnessMap;
uniform bool doubleSide;
uniform float roughness;

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform mat4 viewInverse : VIEWINVERSE;

@import ecgl.common.normalMap.fragmentHeader
@import ecgl.common.bumpMap.header

uniform sampler2D roughnessMap;

void main()
{
 vec3 N = v_Normal;
 
 bool flipNormal = false;
 if (doubleSide) {
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(eyePos - v_WorldPosition);

 if (dot(N, V) < 0.0) {
 flipNormal = true;
 }
 }

 @import ecgl.common.normalMap.fragmentMain

 if (useBumpMap) {
 N = bumpNormal(v_WorldPosition, v_Normal, N);
 }

 float g = 1.0 - roughness;

 if (useRoughnessMap) {
 float g2 = 1.0 - texture2D(roughnessMap, v_DetailTexcoord)[ROUGHNESS_CHANEL];
 g = clamp(g2 + (g - 0.5) * 2.0, 0.0, 1.0);
 }

 if (flipNormal) {
 N = -N;
 }

 gl_FragColor.rgb = (N.xyz + 1.0) * 0.5;
 gl_FragColor.a = g;
}
@end`;F.import(pf);function to(e,t,r,i,n){var a=e.gl;t.setUniform(a,"1i",r,n),a.activeTexture(a.TEXTURE0+n),i.isRenderable()?i.bind(e):i.unbind(e)}function jd(e,t,r,i,n){var a,o,s,l,f=e.gl;return function(h,u,d){if(!(l&&l.material===h.material)){var c=h.material,m=h.__program,p=c.get("roughness");p==null&&(p=1);var v=c.get("normalMap")||t,g=c.get("roughnessMap"),y=c.get("bumpMap"),x=c.get("uvRepeat"),_=c.get("uvOffset"),S=c.get("detailUvRepeat"),E=c.get("detailUvOffset"),b=!!y&&c.isTextureEnabled("bumpMap"),A=!!g&&c.isTextureEnabled("roughnessMap"),L=c.isDefined("fragment","DOUBLE_SIDED");y=y||r,g=g||i,d!==u?(u.set("normalMap",v),u.set("bumpMap",y),u.set("roughnessMap",g),u.set("useBumpMap",b),u.set("useRoughnessMap",A),u.set("doubleSide",L),x!=null&&u.set("uvRepeat",x),_!=null&&u.set("uvOffset",_),S!=null&&u.set("detailUvRepeat",S),E!=null&&u.set("detailUvOffset",E),u.set("roughness",p)):(m.setUniform(f,"1f","roughness",p),a!==v&&to(e,m,"normalMap",v,0),o!==y&&y&&to(e,m,"bumpMap",y,1),s!==g&&g&&to(e,m,"roughnessMap",g,2),x!=null&&m.setUniform(f,"2f","uvRepeat",x),_!=null&&m.setUniform(f,"2f","uvOffset",_),S!=null&&m.setUniform(f,"2f","detailUvRepeat",S),E!=null&&m.setUniform(f,"2f","detailUvOffset",E),m.setUniform(f,"1i","useBumpMap",+b),m.setUniform(f,"1i","useRoughnessMap",+A),m.setUniform(f,"1i","doubleSide",+L)),a=v,o=y,s=g,l=h}}}function mi(e){e=e||{},this._depthTex=new j({format:V.DEPTH_COMPONENT,type:V.UNSIGNED_INT}),this._normalTex=new j({type:V.HALF_FLOAT}),this._framebuffer=new ve,this._framebuffer.attach(this._normalTex),this._framebuffer.attach(this._depthTex,ve.DEPTH_ATTACHMENT),this._normalMaterial=new Ye({shader:new F(F.source("ecgl.normal.vertex"),F.source("ecgl.normal.fragment"))}),this._normalMaterial.enableTexture(["normalMap","bumpMap","roughnessMap"]),this._defaultNormalMap=Yt.createBlank("#000"),this._defaultBumpMap=Yt.createBlank("#000"),this._defaultRoughessMap=Yt.createBlank("#000"),this._debugPass=new ge({fragment:F.source("clay.compositor.output")}),this._debugPass.setUniform("texture",this._normalTex),this._debugPass.material.undefine("fragment","OUTPUT_ALPHA")}mi.prototype.getDepthTexture=function(){return this._depthTex};mi.prototype.getNormalTexture=function(){return this._normalTex};mi.prototype.update=function(e,t,r){var i=e.getWidth(),n=e.getHeight(),a=this._depthTex,o=this._normalTex,s=this._normalMaterial;a.width=i,a.height=n,o.width=i,o.height=n;var l=t.getRenderList(r).opaque;this._framebuffer.bind(e),e.gl.clearColor(0,0,0,0),e.gl.clear(e.gl.COLOR_BUFFER_BIT|e.gl.DEPTH_BUFFER_BIT),e.gl.disable(e.gl.BLEND),e.renderPass(l,r,{getMaterial:function(){return s},ifRender:function(f){return f.renderNormal},beforeRender:jd(e,this._defaultNormalMap,this._defaultBumpMap,this._defaultRoughessMap,this._normalMaterial),sort:e.opaqueSortCompare}),this._framebuffer.unbind(e)};mi.prototype.renderDebug=function(e){this._debugPass.render(e)};mi.prototype.dispose=function(e){this._depthTex.dispose(e),this._normalTex.dispose(e)};var vf=mi;function ki(e){e=e||{},this._edgePass=new ge({fragment:F.source("ecgl.edge")}),this._edgePass.setUniform("normalTexture",e.normalTexture),this._edgePass.setUniform("depthTexture",e.depthTexture),this._targetTexture=new j({type:V.HALF_FLOAT}),this._frameBuffer=new ve,this._frameBuffer.attach(this._targetTexture)}ki.prototype.update=function(e,t,r,i){var n=e.getWidth(),a=e.getHeight(),o=this._targetTexture;o.width=n,o.height=a;var s=this._frameBuffer;s.bind(e),this._edgePass.setUniform("projectionInv",t.invProjectionMatrix.array),this._edgePass.setUniform("textureSize",[n,a]),this._edgePass.setUniform("texture",r),this._edgePass.render(e),s.unbind(e)};ki.prototype.getTargetTexture=function(){return this._targetTexture};ki.prototype.setParameter=function(e,t){this._edgePass.setUniform(e,t)};ki.prototype.dispose=function(e){this._targetTexture.dispose(e),this._frameBuffer.dispose(e)};var gf=ki;var _f={type:"compositor",nodes:[{name:"source",type:"texture",outputs:{color:{}}},{name:"source_half",shader:"#source(clay.compositor.downsample)",inputs:{texture:"source"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0, height * 1.0] )"}},{name:"bright",shader:"#source(clay.compositor.bright)",inputs:{texture:"source_half"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{threshold:2,scale:4,textureSize:"expr([width * 1.0 / 2, height / 2])"}},{name:"bright_downsample_4",shader:"#source(clay.compositor.downsample)",inputs:{texture:"bright"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 4)",height:"expr(height * 1.0 / 4)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0 / 2, height / 2] )"}},{name:"bright_downsample_8",shader:"#source(clay.compositor.downsample)",inputs:{texture:"bright_downsample_4"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 8)",height:"expr(height * 1.0 / 8)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0 / 4, height / 4] )"}},{name:"bright_downsample_16",shader:"#source(clay.compositor.downsample)",inputs:{texture:"bright_downsample_8"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 16)",height:"expr(height * 1.0 / 16)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0 / 8, height / 8] )"}},{name:"bright_downsample_32",shader:"#source(clay.compositor.downsample)",inputs:{texture:"bright_downsample_16"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 32)",height:"expr(height * 1.0 / 32)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0 / 16, height / 16] )"}},{name:"bright_upsample_16_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_downsample_32"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 16)",height:"expr(height * 1.0 / 16)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 32, height / 32] )"}},{name:"bright_upsample_16_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_16_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 16)",height:"expr(height * 1.0 / 16)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0 / 16, height * 1.0 / 16] )"}},{name:"bright_upsample_8_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_downsample_16"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 8)",height:"expr(height * 1.0 / 8)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 16, height * 1.0 / 16] )"}},{name:"bright_upsample_8_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_8_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 8)",height:"expr(height * 1.0 / 8)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0 / 8, height * 1.0 / 8] )"}},{name:"bright_upsample_8_blend",shader:"#source(clay.compositor.blend)",inputs:{texture1:"bright_upsample_8_blur_v",texture2:"bright_upsample_16_blur_v"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 8)",height:"expr(height * 1.0 / 8)",type:"HALF_FLOAT"}}},parameters:{weight1:.3,weight2:.7}},{name:"bright_upsample_4_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_downsample_8"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 4)",height:"expr(height * 1.0 / 4)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 8, height * 1.0 / 8] )"}},{name:"bright_upsample_4_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_4_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 4)",height:"expr(height * 1.0 / 4)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0 / 4, height * 1.0 / 4] )"}},{name:"bright_upsample_4_blend",shader:"#source(clay.compositor.blend)",inputs:{texture1:"bright_upsample_4_blur_v",texture2:"bright_upsample_8_blend"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 4)",height:"expr(height * 1.0 / 4)",type:"HALF_FLOAT"}}},parameters:{weight1:.3,weight2:.7}},{name:"bright_upsample_2_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_downsample_4"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 4, height * 1.0 / 4] )"}},{name:"bright_upsample_2_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_2_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0 / 2, height * 1.0 / 2] )"}},{name:"bright_upsample_2_blend",shader:"#source(clay.compositor.blend)",inputs:{texture1:"bright_upsample_2_blur_v",texture2:"bright_upsample_4_blend"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{weight1:.3,weight2:.7}},{name:"bright_upsample_full_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 2, height * 1.0 / 2] )"}},{name:"bright_upsample_full_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_full_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0, height * 1.0] )"}},{name:"bloom_composite",shader:"#source(clay.compositor.blend)",inputs:{texture1:"bright_upsample_full_blur_v",texture2:"bright_upsample_2_blend"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{weight1:.3,weight2:.7}},{name:"coc",shader:"#source(ecgl.dof.coc)",outputs:{color:{parameters:{minFilter:"NEAREST",magFilter:"NEAREST",width:"expr(width * 1.0)",height:"expr(height * 1.0)"}}},parameters:{focalDist:50,focalRange:30}},{name:"dof_far_blur",shader:"#source(ecgl.dof.diskBlur)",inputs:{texture:"source",coc:"coc"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0, height * 1.0] )"}},{name:"dof_near_blur",shader:"#source(ecgl.dof.diskBlur)",inputs:{texture:"source",coc:"coc"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0, height * 1.0] )"},defines:{BLUR_NEARFIELD:null}},{name:"dof_coc_blur",shader:"#source(ecgl.dof.diskBlur)",inputs:{texture:"coc"},outputs:{color:{parameters:{minFilter:"NEAREST",magFilter:"NEAREST",width:"expr(width * 1.0)",height:"expr(height * 1.0)"}}},parameters:{textureSize:"expr( [width * 1.0, height * 1.0] )"},defines:{BLUR_COC:null}},{name:"dof_composite",shader:"#source(ecgl.dof.composite)",inputs:{original:"source",blurred:"dof_far_blur",nearfield:"dof_near_blur",coc:"coc",nearcoc:"dof_coc_blur"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}}},{name:"composite",shader:"#source(clay.compositor.hdr.composite)",inputs:{texture:"source",bloom:"bloom_composite"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)"}}},defines:{}},{name:"FXAA",shader:"#source(clay.compositor.fxaa)",inputs:{texture:"composite"}}]};var xf=`@export ecgl.dof.coc

uniform sampler2D depth;

uniform float zNear: 0.1;
uniform float zFar: 2000;

uniform float focalDistance: 3;
uniform float focalRange: 1;
uniform float focalLength: 30;
uniform float fstop: 2.8;

varying vec2 v_Texcoord;

@import clay.util.encode_float

void main()
{
 float z = texture2D(depth, v_Texcoord).r * 2.0 - 1.0;

 float dist = 2.0 * zNear * zFar / (zFar + zNear - z * (zFar - zNear));

 float aperture = focalLength / fstop;

 float coc;

 float uppper = focalDistance + focalRange;
 float lower = focalDistance - focalRange;
 if (dist <= uppper && dist >= lower) {
 coc = 0.5;
 }
 else {
 float focalAdjusted = dist > uppper ? uppper : lower;

 coc = abs(aperture * (focalLength * (dist - focalAdjusted)) / (dist * (focalAdjusted - focalLength)));
 coc = clamp(coc, 0.0, 2.0) / 2.00001;

 if (dist < lower) {
 coc = -coc;
 }
 coc = coc * 0.5 + 0.5;
 }

 gl_FragColor = encodeFloat(coc);
}
@end


@export ecgl.dof.composite

#define DEBUG 0

uniform sampler2D original;
uniform sampler2D blurred;
uniform sampler2D nearfield;
uniform sampler2D coc;
uniform sampler2D nearcoc;
varying vec2 v_Texcoord;

@import clay.util.rgbm
@import clay.util.float

void main()
{
 vec4 blurredColor = texture2D(blurred, v_Texcoord);
 vec4 originalColor = texture2D(original, v_Texcoord);

 float fCoc = decodeFloat(texture2D(coc, v_Texcoord));

 fCoc = abs(fCoc * 2.0 - 1.0);

 float weight = smoothstep(0.0, 1.0, fCoc);
 
#ifdef NEARFIELD_ENABLED
 vec4 nearfieldColor = texture2D(nearfield, v_Texcoord);
 float fNearCoc = decodeFloat(texture2D(nearcoc, v_Texcoord));
 fNearCoc = abs(fNearCoc * 2.0 - 1.0);

 gl_FragColor = encodeHDR(
 mix(
 nearfieldColor, mix(originalColor, blurredColor, weight),
 pow(1.0 - fNearCoc, 4.0)
 )
 );
#else
 gl_FragColor = encodeHDR(mix(originalColor, blurredColor, weight));
#endif

}

@end



@export ecgl.dof.diskBlur

#define POISSON_KERNEL_SIZE 16;

uniform sampler2D texture;
uniform sampler2D coc;
varying vec2 v_Texcoord;

uniform float blurRadius : 10.0;
uniform vec2 textureSize : [512.0, 512.0];

uniform vec2 poissonKernel[POISSON_KERNEL_SIZE];

uniform float percent;

float nrand(const in vec2 n) {
 return fract(sin(dot(n.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

@import clay.util.rgbm
@import clay.util.float


void main()
{
 vec2 offset = blurRadius / textureSize;

 float rnd = 6.28318 * nrand(v_Texcoord + 0.07 * percent );
 float cosa = cos(rnd);
 float sina = sin(rnd);
 vec4 basis = vec4(cosa, -sina, sina, cosa);

#if !defined(BLUR_NEARFIELD) && !defined(BLUR_COC)
 offset *= abs(decodeFloat(texture2D(coc, v_Texcoord)) * 2.0 - 1.0);
#endif

#ifdef BLUR_COC
 float cocSum = 0.0;
#else
 vec4 color = vec4(0.0);
#endif


 float weightSum = 0.0;

 for (int i = 0; i < POISSON_KERNEL_SIZE; i++) {
 vec2 ofs = poissonKernel[i];

 ofs = vec2(dot(ofs, basis.xy), dot(ofs, basis.zw));

 vec2 uv = v_Texcoord + ofs * offset;
 vec4 texel = texture2D(texture, uv);

 float w = 1.0;
#ifdef BLUR_COC
 float fCoc = decodeFloat(texel) * 2.0 - 1.0;
 cocSum += clamp(fCoc, -1.0, 0.0) * w;
#else
 texel = texel;
 #if !defined(BLUR_NEARFIELD)
 float fCoc = decodeFloat(texture2D(coc, uv)) * 2.0 - 1.0;
 w *= abs(fCoc);
 #endif
 texel.rgb *= texel.a;
 color += texel * w;
#endif

 weightSum += w;
 }

#ifdef BLUR_COC
 gl_FragColor = encodeFloat(clamp(cocSum / weightSum, -1.0, 0.0) * 0.5 + 0.5);
#else
 color /= weightSum;
 color.rgb /= (color.a + 0.0001);
 gl_FragColor = color;
#endif
}

@end`;var yf=`@export ecgl.edge

uniform sampler2D texture;

uniform sampler2D normalTexture;
uniform sampler2D depthTexture;

uniform mat4 projectionInv;

uniform vec2 textureSize;

uniform vec4 edgeColor: [0,0,0,0.8];

varying vec2 v_Texcoord;

vec3 packColor(vec2 coord) {
 float z = texture2D(depthTexture, coord).r * 2.0 - 1.0;
 vec4 p = vec4(v_Texcoord * 2.0 - 1.0, z, 1.0);
 vec4 p4 = projectionInv * p;

 return vec3(
 texture2D(normalTexture, coord).rg,
 -p4.z / p4.w / 5.0
 );
}

void main() {
 vec2 cc = v_Texcoord;
 vec3 center = packColor(cc);

 float size = clamp(1.0 - (center.z - 10.0) / 100.0, 0.0, 1.0) * 0.5;
 float dx = size / textureSize.x;
 float dy = size / textureSize.y;

 vec2 coord;
 vec3 topLeft = packColor(cc+vec2(-dx, -dy));
 vec3 top = packColor(cc+vec2(0.0, -dy));
 vec3 topRight = packColor(cc+vec2(dx, -dy));
 vec3 left = packColor(cc+vec2(-dx, 0.0));
 vec3 right = packColor(cc+vec2(dx, 0.0));
 vec3 bottomLeft = packColor(cc+vec2(-dx, dy));
 vec3 bottom = packColor(cc+vec2(0.0, dy));
 vec3 bottomRight = packColor(cc+vec2(dx, dy));

 vec3 v = -topLeft-2.0*top-topRight+bottomLeft+2.0*bottom+bottomRight;
 vec3 h = -bottomLeft-2.0*left-topLeft+bottomRight+2.0*right+topRight;

 float edge = sqrt(dot(h, h) + dot(v, v));

 edge = smoothstep(0.8, 1.0, edge);

 gl_FragColor = mix(texture2D(texture, v_Texcoord), vec4(edgeColor.rgb, 1.0), edgeColor.a * edge);
}
@end`;F.import(Vn);F.import(Hn);F.import(kn);F.import(Wn);F.import(Xn);F.import(jn);F.import(Zn);F.import(Yn);F.import(qn);F.import(xf);F.import(yf);function Tf(e,t){return{color:{parameters:{width:e,height:t}}}}var ro=["composite","FXAA"];function se(){this._width,this._height,this._dpr,this._sourceTexture=new j({type:V.HALF_FLOAT}),this._depthTexture=new j({format:V.DEPTH_COMPONENT,type:V.UNSIGNED_INT}),this._framebuffer=new ve,this._framebuffer.attach(this._sourceTexture),this._framebuffer.attach(this._depthTexture,ve.DEPTH_ATTACHMENT),this._normalPass=new vf,this._compositor=lf(_f);var e=this._compositor.getNodeByName("source");e.texture=this._sourceTexture;var t=this._compositor.getNodeByName("coc");this._sourceNode=e,this._cocNode=t,this._compositeNode=this._compositor.getNodeByName("composite"),this._fxaaNode=this._compositor.getNodeByName("FXAA"),this._dofBlurNodes=["dof_far_blur","dof_near_blur","dof_coc_blur"].map(function(i){return this._compositor.getNodeByName(i)},this),this._dofBlurKernel=0,this._dofBlurKernelSize=new Float32Array(0),this._finalNodesChain=ro.map(function(i){return this._compositor.getNodeByName(i)},this);var r={normalTexture:this._normalPass.getNormalTexture(),depthTexture:this._normalPass.getDepthTexture()};this._ssaoPass=new cf(r),this._ssrPass=new mf(r),this._edgePass=new gf(r)}se.prototype.resize=function(i,n,r){r=r||1;var i=i*r,n=n*r,a=this._sourceTexture,o=this._depthTexture;a.width=i,a.height=n,o.width=i,o.height=n;var s={getWidth:function(){return i},getHeight:function(){return n},getDevicePixelRatio:function(){return r}};function l(f,h){if(typeof f[h]=="function"){var u=f[h].__original||f[h];f[h]=function(d){return u.call(this,s)},f[h].__original=u}}this._compositor.nodes.forEach(function(f){for(var h in f.outputs){var u=f.outputs[h].parameters;u&&(l(u,"width"),l(u,"height"))}for(var d in f.parameters)l(f.parameters,d)}),this._width=i,this._height=n,this._dpr=r};se.prototype.getWidth=function(){return this._width};se.prototype.getHeight=function(){return this._height};se.prototype._ifRenderNormalPass=function(){return this._enableSSAO||this._enableEdge||this._enableSSR};se.prototype._getPrevNode=function(e){for(var t=ro.indexOf(e.name)-1,r=this._finalNodesChain[t];r&&!this._compositor.getNodeByName(r.name);)t-=1,r=this._finalNodesChain[t];return r};se.prototype._getNextNode=function(e){for(var t=ro.indexOf(e.name)+1,r=this._finalNodesChain[t];r&&!this._compositor.getNodeByName(r.name);)t+=1,r=this._finalNodesChain[t];return r};se.prototype._addChainNode=function(e){var t=this._getPrevNode(e),r=this._getNextNode(e);t&&(e.inputs.texture=t.name,r?(e.outputs=Tf(this.getWidth.bind(this),this.getHeight.bind(this)),r.inputs.texture=e.name):e.outputs=null,this._compositor.addNode(e))};se.prototype._removeChainNode=function(e){var t=this._getPrevNode(e),r=this._getNextNode(e);t&&(r?(t.outputs=Tf(this.getWidth.bind(this),this.getHeight.bind(this)),r.inputs.texture=t.name):t.outputs=null,this._compositor.removeNode(e))};se.prototype.updateNormal=function(e,t,r,i){this._ifRenderNormalPass()&&this._normalPass.update(e,t,r)};se.prototype.updateSSAO=function(e,t,r,i){this._ssaoPass.update(e,r,i)};se.prototype.enableSSAO=function(){this._enableSSAO=!0};se.prototype.disableSSAO=function(){this._enableSSAO=!1};se.prototype.enableSSR=function(){this._enableSSR=!0};se.prototype.disableSSR=function(){this._enableSSR=!1};se.prototype.getSSAOTexture=function(){return this._ssaoPass.getTargetTexture()};se.prototype.getSourceFrameBuffer=function(){return this._framebuffer};se.prototype.getSourceTexture=function(){return this._sourceTexture};se.prototype.disableFXAA=function(){this._removeChainNode(this._fxaaNode)};se.prototype.enableFXAA=function(){this._addChainNode(this._fxaaNode)};se.prototype.enableBloom=function(){this._compositeNode.inputs.bloom="bloom_composite",this._compositor.dirty()};se.prototype.disableBloom=function(){this._compositeNode.inputs.bloom=null,this._compositor.dirty()};se.prototype.enableDOF=function(){this._compositeNode.inputs.texture="dof_composite",this._compositor.dirty()};se.prototype.disableDOF=function(){this._compositeNode.inputs.texture="source",this._compositor.dirty()};se.prototype.enableColorCorrection=function(){this._compositeNode.define("COLOR_CORRECTION"),this._enableColorCorrection=!0};se.prototype.disableColorCorrection=function(){this._compositeNode.undefine("COLOR_CORRECTION"),this._enableColorCorrection=!1};se.prototype.enableEdge=function(){this._enableEdge=!0};se.prototype.disableEdge=function(){this._enableEdge=!1};se.prototype.setBloomIntensity=function(e){this._compositeNode.setParameter("bloomIntensity",e)};se.prototype.setSSAOParameter=function(e,t){switch(e){case"quality":var r={low:6,medium:12,high:32,ultra:62}[t]||12;this._ssaoPass.setParameter("kernelSize",r);break;case"radius":this._ssaoPass.setParameter(e,t),this._ssaoPass.setParameter("bias",t/200);break;case"intensity":this._ssaoPass.setParameter(e,t);break;default:}};se.prototype.setDOFParameter=function(e,t){switch(e){case"focalDistance":case"focalRange":case"fstop":this._cocNode.setParameter(e,t);break;case"blurRadius":for(var r=0;r<this._dofBlurNodes.length;r++)this._dofBlurNodes[r].setParameter("blurRadius",t);break;case"quality":var i={low:4,medium:8,high:16,ultra:32}[t]||8;this._dofBlurKernelSize=i;for(var r=0;r<this._dofBlurNodes.length;r++)this._dofBlurNodes[r].pass.material.define("POISSON_KERNEL_SIZE",i);this._dofBlurKernel=new Float32Array(i*2);break;default:}};se.prototype.setSSRParameter=function(e,t){if(t!=null)switch(e){case"quality":var r={low:10,medium:15,high:30,ultra:80}[t]||20,i={low:32,medium:16,high:8,ultra:4}[t]||16;this._ssrPass.setParameter("maxIteration",r),this._ssrPass.setParameter("pixelStride",i);break;case"maxRoughness":this._ssrPass.setParameter("minGlossiness",Math.max(Math.min(1-t,1),0));break;case"physical":this.setPhysicallyCorrectSSR(t);break;default:console.warn("Unkown SSR parameter "+e)}};se.prototype.setPhysicallyCorrectSSR=function(e){this._ssrPass.setPhysicallyCorrect(e)};se.prototype.setEdgeColor=function(e){var t=T.parseColor(e);this._edgePass.setParameter("edgeColor",t)};se.prototype.setExposure=function(e){this._compositeNode.setParameter("exposure",Math.pow(2,e))};se.prototype.setColorLookupTexture=function(e,t){this._compositeNode.pass.material.setTextureImage("lut",this._enableColorCorrection?e:"none",t,{minFilter:T.Texture.NEAREST,magFilter:T.Texture.NEAREST,flipY:!1})};se.prototype.setColorCorrection=function(e,t){this._compositeNode.setParameter(e,t)};se.prototype.isSSREnabled=function(){return this._enableSSR};se.prototype.composite=function(e,t,r,i,n){var a=this._sourceTexture,o=a;this._enableEdge&&(this._edgePass.update(e,r,a,n),a=o=this._edgePass.getTargetTexture()),this._enableSSR&&(this._ssrPass.update(e,r,a,n),o=this._ssrPass.getTargetTexture(),this._ssrPass.setSSAOTexture(this._enableSSAO?this._ssaoPass.getTargetTexture():null)),this._sourceNode.texture=o,this._cocNode.setParameter("depth",this._depthTexture);for(var s=this._dofBlurKernel,l=this._dofBlurKernelSize,f=Math.floor(eo.length/2/l),h=n%f,u=0;u<l*2;u++)s[u]=eo[u+h*l*2];for(var u=0;u<this._dofBlurNodes.length;u++)this._dofBlurNodes[u].setParameter("percent",n/30),this._dofBlurNodes[u].setParameter("poissonKernel",s);this._cocNode.setParameter("zNear",r.near),this._cocNode.setParameter("zFar",r.far),this._compositor.render(e,i)};se.prototype.dispose=function(e){this._sourceTexture.dispose(e),this._depthTexture.dispose(e),this._framebuffer.dispose(e),this._compositor.dispose(e),this._normalPass.dispose(e),this._ssaoPass.dispose(e)};var Ef=se;function io(e){for(var t=[],r=0;r<30;r++)t.push([nr(r,2),nr(r,3)]);this._haltonSequence=t,this._frame=0,this._sourceTex=new j,this._sourceFb=new ve,this._sourceFb.attach(this._sourceTex),this._prevFrameTex=new j,this._outputTex=new j;var i=this._blendPass=new ge({fragment:F.source("clay.compositor.blend")});i.material.disableTexturesAll(),i.material.enableTexture(["texture1","texture2"]),this._blendFb=new ve({depthBuffer:!1}),this._outputPass=new ge({fragment:F.source("clay.compositor.output"),blendWithPrevious:!0}),this._outputPass.material.define("fragment","OUTPUT_ALPHA"),this._outputPass.material.blend=function(n){n.blendEquationSeparate(n.FUNC_ADD,n.FUNC_ADD),n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA)}}io.prototype={constructor:io,jitterProjection:function(e,t){var r=e.viewport,i=r.devicePixelRatio||e.getDevicePixelRatio(),n=r.width*i,a=r.height*i,o=this._haltonSequence[this._frame%this._haltonSequence.length],s=new H;s.array[12]=(o[0]*2-1)/n,s.array[13]=(o[1]*2-1)/a,H.mul(t.projectionMatrix,s,t.projectionMatrix),H.invert(t.invProjectionMatrix,t.projectionMatrix)},resetFrame:function(){this._frame=0},getFrame:function(){return this._frame},getSourceFrameBuffer:function(){return this._sourceFb},getOutputTexture:function(){return this._outputTex},resize:function(e,t){this._prevFrameTex.width=e,this._prevFrameTex.height=t,this._outputTex.width=e,this._outputTex.height=t,this._sourceTex.width=e,this._sourceTex.height=t,this._prevFrameTex.dirty(),this._outputTex.dirty(),this._sourceTex.dirty()},isFinished:function(){return this._frame>=this._haltonSequence.length},render:function(e,t,r){var i=this._blendPass;this._frame===0?(i.setUniform("weight1",0),i.setUniform("weight2",1)):(i.setUniform("weight1",.9),i.setUniform("weight2",.1)),i.setUniform("texture1",this._prevFrameTex),i.setUniform("texture2",t||this._sourceTex),this._blendFb.attach(this._outputTex),this._blendFb.bind(e),i.render(e),this._blendFb.unbind(e),r||(this._outputPass.setUniform("texture",this._outputTex),this._outputPass.render(e));var n=this._prevFrameTex;this._prevFrameTex=this._outputTex,this._outputTex=n,this._frame++},dispose:function(e){this._sourceFb.dispose(e),this._blendFb.dispose(e),this._prevFrameTex.dispose(e),this._outputTex.dispose(e),this._sourceTex.dispose(e),this._outputPass.dispose(e),this._blendPass.dispose(e)}};var Sf=io;function Oe(e){e=e||"perspective",this.layer=null,this.scene=new Lt,this.rootNode=this.scene,this.viewport={x:0,y:0,width:0,height:0},this.setProjection(e),this._compositor=new Ef,this._temporalSS=new Sf,this._shadowMapPass=new Kl;for(var t=[],r=0,i=0;i<30;i++){for(var n=[],a=0;a<6;a++)n.push(nr(r,2)*4-2),n.push(nr(r,3)*4-2),r++;t.push(n)}this._pcfKernels=t,this.scene.on("beforerender",function(o,s,l){this.needsTemporalSS()&&this._temporalSS.jitterProjection(o,l)},this)}Oe.prototype.setProjection=function(e){var t=this.camera;t&&t.update(),e==="perspective"?this.camera instanceof Ge||(this.camera=new Ge,t&&this.camera.setLocalTransform(t.localTransform)):this.camera instanceof kt||(this.camera=new kt,t&&this.camera.setLocalTransform(t.localTransform)),this.camera.near=.1,this.camera.far=2e3};Oe.prototype.setViewport=function(e,t,r,i,n){this.camera instanceof Ge&&(this.camera.aspect=r/i),n=n||1,this.viewport.x=e,this.viewport.y=t,this.viewport.width=r,this.viewport.height=i,this.viewport.devicePixelRatio=n,this._compositor.resize(r*n,i*n),this._temporalSS.resize(r*n,i*n)};Oe.prototype.containPoint=function(e,t){var r=this.viewport,i=this.layer.renderer.getHeight();return t=i-t,e>=r.x&&t>=r.y&&e<=r.x+r.width&&t<=r.y+r.height};var wf=new nt;Oe.prototype.castRay=function(e,t,r){var i=this.layer.renderer,n=i.viewport;return i.viewport=this.viewport,i.screenToNDC(e,t,wf),this.camera.castRay(wf,r),i.viewport=n,r};Oe.prototype.prepareRender=function(){this.scene.update(),this.camera.update(),this.scene.updateLights();var e=this.scene.updateRenderList(this.camera);this._needsSortProgressively=!1;for(var t=0;t<e.transparent.length;t++){var r=e.transparent[t],i=r.geometry;i.needsSortVerticesProgressively&&i.needsSortVerticesProgressively()&&(this._needsSortProgressively=!0),i.needsSortTrianglesProgressively&&i.needsSortTrianglesProgressively()&&(this._needsSortProgressively=!0)}this._frame=0,this._temporalSS.resetFrame()};Oe.prototype.render=function(e,t){this._doRender(e,t,this._frame),this._frame++};Oe.prototype.needsAccumulate=function(){return this.needsTemporalSS()||this._needsSortProgressively};Oe.prototype.needsTemporalSS=function(){var e=this._enableTemporalSS;return e==="auto"&&(e=this._enablePostEffect),e};Oe.prototype.hasDOF=function(){return this._enableDOF};Oe.prototype.isAccumulateFinished=function(){return this.needsTemporalSS()?this._temporalSS.isFinished():this._frame>30};Oe.prototype._doRender=function(e,t,r){var i=this.scene,n=this.camera;r=r||0,this._updateTransparent(e,i,n,r),t||(this._shadowMapPass.kernelPCF=this._pcfKernels[0],this._shadowMapPass.render(e,i,n,!0)),this._updateShadowPCFKernel(r);var a=e.clearColor;if(e.gl.clearColor(a[0],a[1],a[2],a[3]),this._enablePostEffect&&(this.needsTemporalSS()&&this._temporalSS.jitterProjection(e,n),this._compositor.updateNormal(e,i,n,this._temporalSS.getFrame())),this._updateSSAO(e,i,n,this._temporalSS.getFrame()),this._enablePostEffect){var o=this._compositor.getSourceFrameBuffer();o.bind(e),e.gl.clear(e.gl.DEPTH_BUFFER_BIT|e.gl.COLOR_BUFFER_BIT),e.render(i,n,!0,!0),o.unbind(e),this.needsTemporalSS()&&t?(this._compositor.composite(e,i,n,this._temporalSS.getSourceFrameBuffer(),this._temporalSS.getFrame()),e.setViewport(this.viewport),this._temporalSS.render(e)):(e.setViewport(this.viewport),this._compositor.composite(e,i,n,null,0))}else if(this.needsTemporalSS()&&t){var o=this._temporalSS.getSourceFrameBuffer();o.bind(e),e.saveClear(),e.clearBit=e.gl.DEPTH_BUFFER_BIT|e.gl.COLOR_BUFFER_BIT,e.render(i,n,!0,!0),e.restoreClear(),o.unbind(e),e.setViewport(this.viewport),this._temporalSS.render(e)}else e.setViewport(this.viewport),e.render(i,n,!0,!0)};Oe.prototype._updateTransparent=function(e,t,r,i){for(var n=new R,a=new H,o=r.getWorldPosition(),s=t.getRenderList(r).transparent,l=0;l<s.length;l++){var f=s[l],h=f.geometry;H.invert(a,f.worldTransform),R.transformMat4(n,o,a),h.needsSortTriangles&&h.needsSortTriangles()&&h.doSortTriangles(n,i),h.needsSortVertices&&h.needsSortVertices()&&h.doSortVertices(n,i)}};Oe.prototype._updateSSAO=function(e,t,r){var i=this._enableSSAO&&this._enablePostEffect;i&&this._compositor.updateSSAO(e,t,r,this._temporalSS.getFrame());for(var n=t.getRenderList(r),a=0;a<n.opaque.length;a++){var o=n.opaque[a];o.renderNormal&&o.material[i?"enableTexture":"disableTexture"]("ssaoMap"),i&&o.material.set("ssaoMap",this._compositor.getSSAOTexture())}};Oe.prototype._updateShadowPCFKernel=function(e){for(var t=this._pcfKernels[e%this._pcfKernels.length],r=this.scene.getRenderList(this.camera),i=r.opaque,n=0;n<i.length;n++)i[n].receiveShadow&&(i[n].material.set("pcfKernel",t),i[n].material.define("fragment","PCF_KERNEL_SIZE",t.length/2))};Oe.prototype.dispose=function(e){this._compositor.dispose(e.gl),this._temporalSS.dispose(e.gl),this._shadowMapPass.dispose(e)};Oe.prototype.setPostEffect=function(e,t){var r=this._compositor;this._enablePostEffect=e.get("enable");var i=e.getModel("bloom"),n=e.getModel("edge"),a=e.getModel("DOF",e.getModel("depthOfField")),o=e.getModel("SSAO",e.getModel("screenSpaceAmbientOcclusion")),s=e.getModel("SSR",e.getModel("screenSpaceReflection")),l=e.getModel("FXAA"),f=e.getModel("colorCorrection");i.get("enable")?r.enableBloom():r.disableBloom(),a.get("enable")?r.enableDOF():r.disableDOF(),s.get("enable")?r.enableSSR():r.disableSSR(),f.get("enable")?r.enableColorCorrection():r.disableColorCorrection(),n.get("enable")?r.enableEdge():r.disableEdge(),l.get("enable")?r.enableFXAA():r.disableFXAA(),this._enableDOF=a.get("enable"),this._enableSSAO=o.get("enable"),this._enableSSAO?r.enableSSAO():r.disableSSAO(),r.setBloomIntensity(i.get("intensity")),r.setEdgeColor(n.get("color")),r.setColorLookupTexture(f.get("lookupTexture"),t),r.setExposure(f.get("exposure")),["radius","quality","intensity"].forEach(function(h){r.setSSAOParameter(h,o.get(h))}),["quality","maxRoughness","physical"].forEach(function(h){r.setSSRParameter(h,s.get(h))}),["quality","focalDistance","focalRange","blurRadius","fstop"].forEach(function(h){r.setDOFParameter(h,a.get(h))}),["brightness","contrast","saturation"].forEach(function(h){r.setColorCorrection(h,f.get(h))})};Oe.prototype.setDOFFocusOnPoint=function(e){if(this._enablePostEffect)return e>this.camera.far||e<this.camera.near?void 0:(this._compositor.setDOFParameter("focalDistance",e),!0)};Oe.prototype.setTemporalSuperSampling=function(e){this._enableTemporalSS=e.get("enable")};Oe.prototype.isLinearSpace=function(){return this._enablePostEffect};Oe.prototype.setRootNode=function(e){if(this.rootNode!==e){for(var t=this.rootNode.children(),r=0;r<t.length;r++)e.add(t[r]);e!==this.scene&&this.scene.add(e),this.rootNode=e}};Oe.prototype.add=function(e){this.rootNode.add(e)};Oe.prototype.remove=function(e){this.rootNode.remove(e)};Oe.prototype.removeAll=function(e){this.rootNode.removeAll(e)};Object.assign(Oe.prototype,Qr);var ut=Oe;function Zd(e,t){var r=e.getBoxLayoutParams(),i=hr(r,{width:t.getWidth(),height:t.getHeight()});i.y=t.getHeight()-i.y-i.height,this.viewGL.setViewport(i.x,i.y,i.width,i.height,t.getDevicePixelRatio());var n=e.get("boxWidth"),a=e.get("boxHeight"),o=e.get("boxDepth");this.getAxis("x").setExtent(-n/2,n/2),this.getAxis("y").setExtent(o/2,-o/2),this.getAxis("z").setExtent(-a/2,a/2),this.size=[n,a,o]}function Yd(e,t){var r={};function i(n,a){r[n]=r[n]||[1/0,-1/0],r[n][0]=Math.min(a[0],r[n][0]),r[n][1]=Math.max(a[1],r[n][1])}e.eachSeries(function(n){if(n.coordinateSystem===this){var a=n.getData();["x","y","z"].forEach(function(o){a.mapDimensionsAll(o,!0).forEach(function(s){i(o,a.getDataExtent(s,!0))})})}},this),["xAxis3D","yAxis3D","zAxis3D"].forEach(function(n){e.eachComponent(n,function(a){var o=n.charAt(0),s=a.getReferringComponents("grid3D").models[0],l=s.coordinateSystem;if(l===this){var f=l.getAxis(o);if(!f){var h=Ee.createScale(r[o]||[1/0,-1/0],a);f=new Xl(o,h),f.type=a.get("type");var u=f.type==="category";f.onBand=u&&a.get("boundaryGap"),f.inverse=a.get("inverse"),a.axis=f,f.model=a,f.getLabelModel=function(){return a.getModel("axisLabel",s.getModel("axisLabel"))},f.getTickModel=function(){return a.getModel("axisTick",s.getModel("axisTick"))},l.addAxis(f)}}},this)},this),this.resize(this.model,t)}var qd={dimensions:Za.prototype.dimensions,create:function(e,t){var r=[];e.eachComponent("grid3D",function(a){a.__viewGL=a.__viewGL||new ut;var o=new Za;o.model=a,o.viewGL=a.__viewGL,a.coordinateSystem=o,r.push(o),o.resize=Zd,o.update=Yd});var i=["xAxis3D","yAxis3D","zAxis3D"];function n(a,o){return i.map(function(s){var l=a.getReferringComponents(s).models[0];return l==null&&(l=o.getComponent(s)),l})}return e.eachSeries(function(a){if(a.get("coordinateSystem")==="cartesian3D"){var o=a.getReferringComponents("grid3D").models[0];if(o==null){var s=n(a,e),o=s[0].getCoordSysModel();s.forEach(function(h){var u=h.getCoordSysModel()})}var l=o.coordinateSystem;a.coordinateSystem=l}}),r}},Af=qd;var bf=Ct.extend({type:"cartesian3DAxis",axis:null,getCoordSysModel:function(){return this.ecModel.queryComponents({mainType:"grid3D",index:this.option.gridIndex,id:this.option.gridId})[0]}});Ee.mixinAxisModelCommonMethods(bf);var Lf=bf;var Df={show:!0,grid3DIndex:0,inverse:!1,name:"",nameLocation:"middle",nameTextStyle:{fontSize:16},nameGap:20,axisPointer:{},axisLine:{},axisTick:{},axisLabel:{},splitArea:{}},Kd=N.merge({boundaryGap:!0,axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"},axisPointer:{label:{show:!1}}},Df),no=N.merge({boundaryGap:[0,0],splitNumber:5,axisPointer:{label:{}}},Df),Qd=N.defaults({scale:!0,min:"dataMin",max:"dataMax"},no),Cf=N.defaults({logBase:10},no);Cf.scale=!0;var Mf={categoryAxis3D:Kd,valueAxis3D:no,timeAxis3D:Qd,logAxis3D:Cf};var Jd=["value","category","time","log"];function Pf(e,t,r,i,n){Jd.forEach(function(a){var o=r.extend({type:t+"Axis3D."+a,__ordinalMeta:null,mergeDefaultAndTheme:function(s,l){var f=l.getTheme();N.merge(s,f.get(a+"Axis3D")),N.merge(s,this.getDefaultOption()),s.type=i(t,s)},optionUpdated:function(){var s=this.option;s.type==="category"&&(this.__ordinalMeta=Xo.createByAxisModel(this))},getCategories:function(){if(this.option.type==="category")return this.__ordinalMeta.categories},getOrdinalMeta:function(){return this.__ordinalMeta},defaultOption:N.merge(N.clone(Mf[a+"Axis3D"]),n||{},!0)});e.registerComponentModel(o)}),e.registerSubTypeDefaulter(t+"Axis3D",N.curry(i,t))}function $d(e,t){return t.type||(t.data?"category":"value")}function Nf(e){e.registerComponentModel(Ll),e.registerComponentView(Wl),e.registerCoordinateSystem("grid3D",Af),["x","y","z"].forEach(function(t){Pf(e,t,Lf,$d,{name:t.toUpperCase()});let r=e.ComponentView.extend({type:t+"Axis3D"});e.registerComponentView(r)}),e.registerAction({type:"grid3DChangeCamera",event:"grid3dcamerachanged",update:"series:updateCamera"},function(t,r){r.eachComponent({mainType:"grid3D",query:t},function(i){i.setView(t)})}),e.registerAction({type:"grid3DShowAxisPointer",event:"grid3dshowaxispointer",update:"grid3D:showAxisPointer"},function(t,r){}),e.registerAction({type:"grid3DHideAxisPointer",event:"grid3dhideaxispointer",update:"grid3D:hideAxisPointer"},function(t,r){})}de(Nf);var Ot={defaultOption:{shading:null,realisticMaterial:{textureTiling:1,textureOffset:0,detailTexture:null},lambertMaterial:{textureTiling:1,textureOffset:0,detailTexture:null},colorMaterial:{textureTiling:1,textureOffset:0,detailTexture:null},hatchingMaterial:{textureTiling:1,textureOffset:0,paperColor:"#fff"}}};var Kn={getFilledRegions:function(e,t){var r=(e||[]).slice(),i;if(typeof t=="string"?(t=bi(t),i=t&&t.geoJson):t&&t.features&&(i=t),!i)return[];for(var n={},a=i.features,o=0;o<r.length;o++)n[r[o].name]=r[o];for(var o=0;o<a.length;o++){var s=a[o].properties.name;n[s]||r.push({name:s})}return r},defaultOption:{show:!0,zlevel:-10,map:"",left:0,top:0,width:"100%",height:"100%",boxWidth:100,boxHeight:10,boxDepth:"auto",regionHeight:3,environment:"auto",groundPlane:{show:!1,color:"#aaa"},shading:"lambert",light:{main:{alpha:40,beta:30}},viewControl:{alpha:40,beta:0,distance:100,orthographicSize:60,minAlpha:5,minBeta:-80,maxBeta:80},label:{show:!1,distance:2,textStyle:{fontSize:20,color:"#000",backgroundColor:"rgba(255,255,255,0.7)",padding:3,borderRadius:4}},itemStyle:{color:"#fff",borderWidth:0,borderColor:"#333"},emphasis:{itemStyle:{color:"#639fc0"},label:{show:!0}}}};var pi=Ct.extend({type:"geo3D",layoutMode:"box",coordinateSystem:null,optionUpdated:function(){var e=this.option;e.regions=this.getFilledRegions(e.regions,e.map);var t=Ee.createDimensions(e.data||[],{coordDimensions:["value"],encodeDefine:this.get("encode"),dimensionsDefine:this.get("dimensions")}),r=new rt(t,this);r.initData(e.regions);var i={};r.each(function(n){var a=r.getName(n),o=r.getItemModel(n);i[a]=o}),this._regionModelMap=i,this._data=r},getData:function(){return this._data},getRegionModel:function(e){var t=this.getData().getName(e);return this._regionModelMap[t]||new fr(null,this)},getRegionPolygonCoords:function(e){var t=this.getData().getName(e),r=this.coordinateSystem.getRegion(t);return r?r.geometries:[]},getFormattedLabel:function(e,t){var r=this._data.getName(e),i=this.getRegionModel(e),n=i.get(t==="normal"?["label","formatter"]:["emphasis","label","formatter"]);n==null&&(n=i.get(["label","formatter"]));var a={name:r};if(typeof n=="function")return a.status=t,n(a);if(typeof n=="string"){var o=a.seriesName;return n.replace("{a}",o??"")}else return r},defaultOption:{regions:[]}});N.merge(pi.prototype,Kn);N.merge(pi.prototype,xr);N.merge(pi.prototype,Nt);N.merge(pi.prototype,Rt);N.merge(pi.prototype,Ot);var Rf=pi;var Of=Bf;function Bf(e,t,r){r=r||2;var i=t&&t.length,n=i?t[0]*r:e.length,a=Ff(e,0,n,r,!0),o=[];if(!a)return o;var s,l,f,h,u,d,c;if(i&&(a=nm(e,t,a,r)),e.length>80*r){s=f=e[0],l=h=e[1];for(var m=r;m<n;m+=r)u=e[m],d=e[m+1],u<s&&(s=u),d<l&&(l=d),u>f&&(f=u),d>h&&(h=d);c=Math.max(f-s,h-l)}return Xi(a,o,r,s,l,c),o}function Ff(e,t,r,i,n){var a,o;if(n===so(e,t,r,i)>0)for(a=t;a<r;a+=i)o=If(a,e[a],e[a+1],o);else for(a=r-i;a>=t;a-=i)o=If(a,e[a],e[a+1],o);return o&&Xr(o,o.next)&&(Zi(o),o=o.next),o}function Wi(e,t){if(!e)return e;t||(t=e);var r=e,i;do if(i=!1,!r.steiner&&(Xr(r,r.next)||gt(r.prev,r,r.next)===0)){if(Zi(r),r=t=r.prev,r===r.next)return null;i=!0}else r=r.next;while(i||r!==t);return t}function Xi(e,t,r,i,n,a,o){if(e){!o&&a&&lm(e,i,n,a);for(var s=e,l,f;e.prev!==e.next;){if(l=e.prev,f=e.next,a?tm(e,i,n,a):em(e)){t.push(l.i/r),t.push(e.i/r),t.push(f.i/r),Zi(e),e=f.next,s=f.next;continue}if(e=f,e===s){o?o===1?(e=rm(e,t,r),Xi(e,t,r,i,n,a,2)):o===2&&im(e,t,r,i,n,a):Xi(Wi(e),t,r,i,n,a,1);break}}}}function em(e){var t=e.prev,r=e,i=e.next;if(gt(t,r,i)>=0)return!1;for(var n=e.next.next;n!==e.prev;){if(Qn(t.x,t.y,r.x,r.y,i.x,i.y,n.x,n.y)&&gt(n.prev,n,n.next)>=0)return!1;n=n.next}return!0}function tm(e,t,r,i){var n=e.prev,a=e,o=e.next;if(gt(n,a,o)>=0)return!1;for(var s=n.x<a.x?n.x<o.x?n.x:o.x:a.x<o.x?a.x:o.x,l=n.y<a.y?n.y<o.y?n.y:o.y:a.y<o.y?a.y:o.y,f=n.x>a.x?n.x>o.x?n.x:o.x:a.x>o.x?a.x:o.x,h=n.y>a.y?n.y>o.y?n.y:o.y:a.y>o.y?a.y:o.y,u=ao(s,l,t,r,i),d=ao(f,h,t,r,i),c=e.nextZ;c&&c.z<=d;){if(c!==e.prev&&c!==e.next&&Qn(n.x,n.y,a.x,a.y,o.x,o.y,c.x,c.y)&&gt(c.prev,c,c.next)>=0)return!1;c=c.nextZ}for(c=e.prevZ;c&&c.z>=u;){if(c!==e.prev&&c!==e.next&&Qn(n.x,n.y,a.x,a.y,o.x,o.y,c.x,c.y)&&gt(c.prev,c,c.next)>=0)return!1;c=c.prevZ}return!0}function rm(e,t,r){var i=e;do{var n=i.prev,a=i.next.next;!Xr(n,a)&&Gf(n,i,i.next,a)&&ji(n,a)&&ji(a,n)&&(t.push(n.i/r),t.push(i.i/r),t.push(a.i/r),Zi(i),Zi(i.next),i=e=a),i=i.next}while(i!==e);return i}function im(e,t,r,i,n,a){var o=e;do{for(var s=o.next.next;s!==o.prev;){if(o.i!==s.i&&um(o,s)){var l=Uf(o,s);o=Wi(o,o.next),l=Wi(l,l.next),Xi(o,t,r,i,n,a),Xi(l,t,r,i,n,a);return}s=s.next}o=o.next}while(o!==e)}function nm(e,t,r,i){var n=[],a,o,s,l,f;for(a=0,o=t.length;a<o;a++)s=t[a]*i,l=a<o-1?t[a+1]*i:e.length,f=Ff(e,s,l,i,!1),f===f.next&&(f.steiner=!0),n.push(hm(f));for(n.sort(am),a=0;a<n.length;a++)om(n[a],r),r=Wi(r,r.next);return r}function am(e,t){return e.x-t.x}function om(e,t){if(t=sm(e,t),t){var r=Uf(t,e);Wi(r,r.next)}}function sm(e,t){var r=t,i=e.x,n=e.y,a=-1/0,o;do{if(n<=r.y&&n>=r.next.y&&r.next.y!==r.y){var s=r.x+(n-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(s<=i&&s>a){if(a=s,s===i){if(n===r.y)return r;if(n===r.next.y)return r.next}o=r.x<r.next.x?r:r.next}}r=r.next}while(r!==t);if(!o)return null;if(i===a)return o.prev;var l=o,f=o.x,h=o.y,u=1/0,d;for(r=o.next;r!==l;)i>=r.x&&r.x>=f&&i!==r.x&&Qn(n<h?i:a,n,f,h,n<h?a:i,n,r.x,r.y)&&(d=Math.abs(n-r.y)/(i-r.x),(d<u||d===u&&r.x>o.x)&&ji(r,e)&&(o=r,u=d)),r=r.next;return o}function lm(e,t,r,i){var n=e;do n.z===null&&(n.z=ao(n.x,n.y,t,r,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==e);n.prevZ.nextZ=null,n.prevZ=null,fm(n)}function fm(e){var t,r,i,n,a,o,s,l,f=1;do{for(r=e,e=null,a=null,o=0;r;){for(o++,i=r,s=0,t=0;t<f&&(s++,i=i.nextZ,!!i);t++);for(l=f;s>0||l>0&&i;)s!==0&&(l===0||!i||r.z<=i.z)?(n=r,r=r.nextZ,s--):(n=i,i=i.nextZ,l--),a?a.nextZ=n:e=n,n.prevZ=a,a=n;r=i}a.nextZ=null,f*=2}while(o>1);return e}function ao(e,t,r,i,n){return e=32767*(e-r)/n,t=32767*(t-i)/n,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function hm(e){var t=e,r=e;do t.x<r.x&&(r=t),t=t.next;while(t!==e);return r}function Qn(e,t,r,i,n,a,o,s){return(n-o)*(t-s)-(e-o)*(a-s)>=0&&(e-o)*(i-s)-(r-o)*(t-s)>=0&&(r-o)*(a-s)-(n-o)*(i-s)>=0}function um(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!cm(e,t)&&ji(e,t)&&ji(t,e)&&dm(e,t)}function gt(e,t,r){return(t.y-e.y)*(r.x-t.x)-(t.x-e.x)*(r.y-t.y)}function Xr(e,t){return e.x===t.x&&e.y===t.y}function Gf(e,t,r,i){return Xr(e,t)&&Xr(r,i)||Xr(e,i)&&Xr(r,t)?!0:gt(e,t,r)>0!=gt(e,t,i)>0&&gt(r,i,e)>0!=gt(r,i,t)>0}function cm(e,t){var r=e;do{if(r.i!==e.i&&r.next.i!==e.i&&r.i!==t.i&&r.next.i!==t.i&&Gf(r,r.next,e,t))return!0;r=r.next}while(r!==e);return!1}function ji(e,t){return gt(e.prev,e,e.next)<0?gt(e,t,e.next)>=0&&gt(e,e.prev,t)>=0:gt(e,t,e.prev)<0||gt(e,e.next,t)<0}function dm(e,t){var r=e,i=!1,n=(e.x+t.x)/2,a=(e.y+t.y)/2;do r.y>a!=r.next.y>a&&r.next.y!==r.y&&n<(r.next.x-r.x)*(a-r.y)/(r.next.y-r.y)+r.x&&(i=!i),r=r.next;while(r!==e);return i}function Uf(e,t){var r=new oo(e.i,e.x,e.y),i=new oo(t.i,t.x,t.y),n=e.next,a=t.prev;return e.next=t,t.prev=e,r.next=n,n.prev=r,i.next=r,r.prev=i,a.next=i,i.prev=a,i}function If(e,t,r,i){var n=new oo(e,t,r);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Zi(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function oo(e,t,r){this.i=e,this.x=t,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}Bf.deviation=function(e,t,r,i){var n=t&&t.length,a=n?t[0]*r:e.length,o=Math.abs(so(e,0,a,r));if(n)for(var s=0,l=t.length;s<l;s++){var f=t[s]*r,h=s<l-1?t[s+1]*r:e.length;o-=Math.abs(so(e,f,h,r))}var u=0;for(s=0;s<i.length;s+=3){var d=i[s]*r,c=i[s+1]*r,m=i[s+2]*r;u+=Math.abs((e[d]-e[m])*(e[c+1]-e[d+1])-(e[d]-e[c])*(e[m+1]-e[d+1]))}return o===0&&u===0?0:Math.abs((u-o)/o)};function so(e,t,r,i){for(var n=0,a=t,o=r-i;a<r;a+=i)n+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return n}function lo(e,t,r){var i=e[t];e[t]=e[r],e[r]=i}function zf(e,t,r,i,n){var a=r,o=e[t];lo(e,t,i);for(var s=r;s<i;s++)n(e[s],o)<0&&(lo(e,s,a),a++);return lo(e,i,a),a}function Jn(e,t,r,i){if(r<i){var n=Math.floor((r+i)/2),a=zf(e,n,r,i,t);Jn(e,t,r,a-1),Jn(e,t,a+1,i)}}function fo(){this._parts=[]}fo.prototype.step=function(e,t,r){var i=e.length;if(r===0){this._parts=[],this._sorted=!1;var n=Math.floor(i/2);this._parts.push({pivot:n,left:0,right:i-1}),this._currentSortPartIdx=0}if(!this._sorted){var a=this._parts;if(a.length===0)return this._sorted=!0,!0;if(a.length<512){for(var o=0;o<a.length;o++)a[o].pivot=zf(e,a[o].pivot,a[o].left,a[o].right,t);for(var s=[],o=0;o<a.length;o++){var l=a[o].left,f=a[o].pivot-1;f>l&&s.push({pivot:Math.floor((f+l)/2),left:l,right:f});var l=a[o].pivot+1,f=a[o].right;f>l&&s.push({pivot:Math.floor((f+l)/2),left:l,right:f})}a=this._parts=s}else for(var o=0;o<Math.floor(a.length/10);o++){var h=a.length-1-this._currentSortPartIdx;if(Jn(e,t,a[h].left,a[h].right),this._currentSortPartIdx++,this._currentSortPartIdx===a.length)return this._sorted=!0,!0}return!1}};fo.sort=Jn;var vi=fo;var gi=ae.vec3,Vf=gi.create(),Hf=gi.create(),kf=gi.create(),_i={needsSortTriangles:function(){return this.indices&&this.sortTriangles},needsSortTrianglesProgressively:function(){return this.needsSortTriangles()&&this.triangleCount>=2e4},doSortTriangles:function(e,t){var r=this.indices;if(t===0){var i=this.attributes.position,e=e.array;(!this._triangleZList||this._triangleZList.length!==this.triangleCount)&&(this._triangleZList=new Float32Array(this.triangleCount),this._sortedTriangleIndices=new Uint32Array(this.triangleCount),this._indicesTmp=new r.constructor(r.length),this._triangleZListTmp=new Float32Array(this.triangleCount));for(var n=0,a,o=0;o<r.length;){i.get(r[o++],Vf),i.get(r[o++],Hf),i.get(r[o++],kf);var s=gi.sqrDist(Vf,e),l=gi.sqrDist(Hf,e),f=gi.sqrDist(kf,e),h=Math.min(s,l);h=Math.min(h,f),o===3?(a=h,h=0):h=h-a,this._triangleZList[n++]=h}}for(var u=this._sortedTriangleIndices,o=0;o<u.length;o++)u[o]=o;if(this.triangleCount<2e4)t===0&&this._simpleSort(!0);else for(var o=0;o<3;o++)this._progressiveQuickSort(t*3+o);for(var d=this._indicesTmp,c=this._triangleZListTmp,m=this._triangleZList,o=0;o<this.triangleCount;o++){var p=u[o]*3,v=o*3;d[v++]=r[p++],d[v++]=r[p++],d[v]=r[p],c[o]=m[u[o]]}var g=this._indicesTmp;this._indicesTmp=this.indices,this.indices=g;var g=this._triangleZListTmp;this._triangleZListTmp=this._triangleZList,this._triangleZList=g,this.dirtyIndices()},_simpleSort:function(e){var t=this._triangleZList,r=this._sortedTriangleIndices;function i(n,a){return t[a]-t[n]}e?Array.prototype.sort.call(r,i):vi.sort(r,i,0,r.length-1)},_progressiveQuickSort:function(e){var t=this._triangleZList,r=this._sortedTriangleIndices;this._quickSort=this._quickSort||new vi,this._quickSort.step(r,function(i,n){return t[n]-t[i]},e)}};function Wf(e){let t=e.getVisual("style");if(t){let r=e.getVisual("drawType");return t[r]}}function Xf(e){return e.getVisual("style").opacity}function Te(e,t){let r=e.getItemVisual(t,"style");if(r){let i=e.getVisual("drawType");return r[i]}}function Ae(e,t){let r=e.getItemVisual(t,"style");return r&&r.opacity}var jf=1,Zf=2;function jr(e,t,r){this._labelsMesh=new di,this._labelTextureSurface=new Hi({width:512,height:512,devicePixelRatio:r.getDevicePixelRatio(),onupdate:function(){r.getZr().refresh()}}),this._api=r,this._labelsMesh.material.set("textureAtlas",this._labelTextureSurface.getTexture())}jr.prototype.getLabelPosition=function(e,t,r){return[0,0,0]};jr.prototype.getLabelDistance=function(e,t,r){return 0};jr.prototype.getMesh=function(){return this._labelsMesh};jr.prototype.updateData=function(e,t,r){t==null&&(t=0),r==null&&(r=e.count()),(!this._labelsVisibilitiesBits||this._labelsVisibilitiesBits.length!==r-t)&&(this._labelsVisibilitiesBits=new Uint8Array(r-t));for(var i=["label","show"],n=["emphasis","label","show"],a=t;a<r;a++){var o=e.getItemModel(a),s=o.get(i),l=o.get(n);l==null&&(l=s);var f=(s?jf:0)|(l?Zf:0);this._labelsVisibilitiesBits[a-t]=f}this._start=t,this._end=r,this._data=e};jr.prototype.updateLabels=function(e){if(this._data){e=e||[];for(var t=e.length>0,r={},i=0;i<e.length;i++)r[e[i]]=!0;this._labelsMesh.geometry.convertToDynamicArray(!0),this._labelTextureSurface.clear();for(var n=["label"],a=["emphasis","label"],o=this._data.hostModel,s=this._data,l=o.getModel(n),f=o.getModel(a,l),h={left:"right",right:"left",top:"center",bottom:"center"},u={left:"middle",right:"middle",top:"bottom",bottom:"top"},d=this._start;d<this._end;d++){var c=!1;t&&r[d]&&(c=!0);var m=this._labelsVisibilitiesBits[d-this._start]&(c?Zf:jf);if(m){var p=s.getItemModel(d),v=p.getModel(c?a:n,c?f:l),g=v.get("distance")||0,y=v.get("position"),x=this._api.getDevicePixelRatio(),_=o.getFormattedLabel(d,c?"emphasis":"normal");if(_==null||_==="")return;var S=new ct.Text({style:Nr(v,{text:_,fill:v.get("color")||Te(s,d)||"#000",align:"left",verticalAlign:"top",opacity:Z.firstNotNull(v.get("opacity"),Ae(s,d),1)})}),E=S.getBoundingRect(),b=1.2;E.height*=b;var A=this._labelTextureSurface.add(S),L=h[y]||"center",P=u[y]||"bottom";this._labelsMesh.geometry.addSprite(this.getLabelPosition(d,y,g),[E.width*x,E.height*x],A,L,P,this.getLabelDistance(d,y,g)*x)}}this._labelsMesh.material.set("uvScale",this._labelTextureSurface.getCoordsScale()),this._labelTextureSurface.getZr().refreshImmediately(),this._labelsMesh.geometry.convertToTypedArray(),this._labelsMesh.geometry.dirty()}};jr.prototype.dispose=function(){this._labelTextureSurface.dispose()};var xi=jr;var Et=ae.vec3;T.Shader.import(Tr);function ho(e){this.rootNode=new T.Node,this._triangulationResults={},this._shadersMap=T.COMMON_SHADERS.filter(function(r){return r!=="shadow"}).reduce(function(r,i){return r[i]=T.createShader("ecgl."+i),r},{}),this._linesShader=T.createShader("ecgl.meshLines3D");var t={};T.COMMON_SHADERS.forEach(function(r){t[r]=new T.Material({shader:T.createShader("ecgl."+r)})}),this._groundMaterials=t,this._groundMesh=new T.Mesh({geometry:new T.PlaneGeometry({dynamic:!0}),castShadow:!1,renderNormal:!0,$ignorePicking:!0}),this._groundMesh.rotation.rotateX(-Math.PI/2),this._labelsBuilder=new xi(512,512,e),this._labelsBuilder.getMesh().renderOrder=100,this._labelsBuilder.getMesh().material.depthTest=!1,this.rootNode.add(this._labelsBuilder.getMesh()),this._initMeshes(),this._api=e}ho.prototype={constructor:ho,extrudeY:!0,update:function(e,t,r,i,n){var a=e.getData();i==null&&(i=0),n==null&&(n=a.count()),this._startIndex=i,this._endIndex=n-1,this._triangulation(e,i,n);var o=this._getShader(e.get("shading"));this._prepareMesh(e,o,r,i,n),this.rootNode.updateWorldTransform(),this._updateRegionMesh(e,r,i,n);var s=e.coordinateSystem;s.type==="geo3D"&&this._updateGroundPlane(e,s,r);var l=this;this._labelsBuilder.updateData(a,i,n),this._labelsBuilder.getLabelPosition=function(f,h,u){var d=a.getName(f),c,m=u;if(s.type==="geo3D"){var p=s.getRegion(d);if(!p)return[NaN,NaN,NaN];c=p.getCenter();var v=s.dataToPoint([c[0],c[1],m]);return v}else var g=l._triangulationResults[f-l._startIndex],c=l.extrudeY?[(g.max[0]+g.min[0])/2,g.max[1]+m,(g.max[2]+g.min[2])/2]:[(g.max[0]+g.min[0])/2,(g.max[1]+g.min[1])/2,g.max[2]+m]},this._data=a,this._labelsBuilder.updateLabels(),this._updateDebugWireframe(e),this._lastHoverDataIndex=0},_initMeshes:function(){var e=this;function t(){var n=new T.Mesh({name:"Polygon",material:new T.Material({shader:e._shadersMap.lambert}),geometry:new T.Geometry({sortTriangles:!0,dynamic:!0}),culling:!1,ignorePicking:!0,renderNormal:!0});return Object.assign(n.geometry,_i),n}var r=t(),i=new T.Mesh({material:new T.Material({shader:this._linesShader}),castShadow:!1,ignorePicking:!0,$ignorePicking:!0,geometry:new Tt({useNativeLine:!1})});this.rootNode.add(r),this.rootNode.add(i),r.material.define("both","VERTEX_COLOR"),r.material.define("fragment","DOUBLE_SIDED"),this._polygonMesh=r,this._linesMesh=i,this.rootNode.add(this._groundMesh)},_getShader:function(e){var t=this._shadersMap[e];return t||(t=this._shadersMap.lambert),t.__shading=e,t},_prepareMesh:function(e,t,r,i,n){for(var a=0,o=0,s=0,l=0,f=i;f<n;f++){var h=this._getRegionPolygonInfo(f),u=this._getRegionLinesInfo(f,e,this._linesMesh.geometry);a+=h.vertexCount,o+=h.triangleCount,s+=u.vertexCount,l+=u.triangleCount}var d=this._polygonMesh,c=d.geometry;["position","normal","texcoord0","color"].forEach(function(m){c.attributes[m].init(a)}),c.indices=a>65535?new Uint32Array(o*3):new Uint16Array(o*3),d.material.shader!==t&&d.material.attachShader(t,!0),T.setMaterialFromModel(t.__shading,d.material,e,r),s>0&&(this._linesMesh.geometry.resetOffset(),this._linesMesh.geometry.setVertexCount(s),this._linesMesh.geometry.setTriangleCount(l)),this._dataIndexOfVertex=new Uint32Array(a),this._vertexRangeOfDataIndex=new Uint32Array((n-i)*2)},_updateRegionMesh:function(e,t,r,i){for(var n=e.getData(),a=0,o=0,s=!1,E=this._polygonMesh,l=this._linesMesh,f=r;f<i;f++){var h=e.getRegionModel(f),u=h.getModel("itemStyle"),d=Z.firstNotNull(Te(n,f),u.get("color"),"#fff"),c=Z.firstNotNull(Ae(n,f),u.get("opacity"),1),m=T.parseColor(d),p=T.parseColor(u.get("borderColor"));m[3]*=c,p[3]*=c;var v=m[3]<.99;E.material.set("color",[1,1,1,1]),s=s||v;for(var g=Z.firstNotNull(h.get("height",!0),e.get("regionHeight")),y=this._updatePolygonGeometry(e,E.geometry,f,g,a,o,m),x=a;x<y.vertexOffset;x++)this._dataIndexOfVertex[x]=f;this._vertexRangeOfDataIndex[(f-r)*2]=a,this._vertexRangeOfDataIndex[(f-r)*2+1]=y.vertexOffset,a=y.vertexOffset,o=y.triangleOffset;var _=u.get("borderWidth"),S=_>0;S&&(_*=t.getDevicePixelRatio(),this._updateLinesGeometry(l.geometry,e,f,g,_,e.coordinateSystem.transform)),l.invisible=!S,l.material.set({color:p})}var E=this._polygonMesh;E.material.transparent=s,E.material.depthMask=!s,E.geometry.updateBoundingBox(),E.frontFace=this.extrudeY?T.Mesh.CCW:T.Mesh.CW,E.material.get("normalMap")&&E.geometry.generateTangents(),E.seriesIndex=e.seriesIndex,E.on("mousemove",this._onmousemove,this),E.on("mouseout",this._onmouseout,this)},_updateDebugWireframe:function(e){var t=e.getModel("debug.wireframe");if(t.get("show")){var r=T.parseColor(t.get("lineStyle.color")||"rgba(0,0,0,0.5)"),i=Z.firstNotNull(t.get("lineStyle.width"),1),n=this._polygonMesh;n.geometry.generateBarycentric(),n.material.define("both","WIREFRAME_TRIANGLE"),n.material.set("wireframeLineColor",r),n.material.set("wireframeLineWidth",i)}},_onmousemove:function(e){var t=this._dataIndexOfVertex[e.triangle[0]];t==null&&(t=-1),t!==this._lastHoverDataIndex&&(this.downplay(this._lastHoverDataIndex),this.highlight(t),this._labelsBuilder.updateLabels([t])),this._lastHoverDataIndex=t,this._polygonMesh.dataIndex=t},_onmouseout:function(e){e.target&&(this.downplay(this._lastHoverDataIndex),this._lastHoverDataIndex=-1,this._polygonMesh.dataIndex=-1),this._labelsBuilder.updateLabels([])},_updateGroundPlane:function(e,t,r){var i=e.getModel("groundPlane",e);if(this._groundMesh.invisible=!i.get("show",!0),!this._groundMesh.invisible){var n=e.get("shading"),a=this._groundMaterials[n];a||(a=this._groundMaterials.lambert),T.setMaterialFromModel(n,a,i,r),a.get("normalMap")&&this._groundMesh.geometry.generateTangents(),this._groundMesh.material=a,this._groundMesh.material.set("color",T.parseColor(i.get("color"))),this._groundMesh.scale.set(t.size[0],t.size[2],1)}},_triangulation:function(e,t,r){this._triangulationResults=[];for(var i=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],a=e.coordinateSystem,o=t;o<r;o++){for(var s=[],l=e.getRegionPolygonCoords(o),f=0;f<l.length;f++){var h=l[f].exterior,u=l[f].interiors,d=[],c=[];if(!(h.length<3)){for(var m=0,p=0;p<h.length;p++){var v=h[p];d[m++]=v[0],d[m++]=v[1]}for(var p=0;p<u.length;p++)if(!(u[p].length<3)){for(var g=d.length/2,y=0;y<u[p].length;y++){var v=u[p][y];d.push(v[0]),d.push(v[1])}c.push(g)}for(var x=Of(d,c),_=new Float64Array(d.length/2*3),S=[],E=[1/0,1/0,1/0],b=[-1/0,-1/0,-1/0],A=0,p=0;p<d.length;)Et.set(S,d[p++],0,d[p++]),a&&a.transform&&Et.transformMat4(S,S,a.transform),Et.min(E,E,S),Et.max(b,b,S),_[A++]=S[0],_[A++]=S[1],_[A++]=S[2];Et.min(i,i,E),Et.max(n,n,b),s.push({points:_,indices:x,min:E,max:b})}}this._triangulationResults.push(s)}this._geoBoundingBox=[i,n]},_getRegionPolygonInfo:function(e){for(var t=this._triangulationResults[e-this._startIndex],r=0,i=0,n=0;n<t.length;n++)r+=t[n].points.length/3,i+=t[n].indices.length/3;var a=r*2+r*4,o=i*2+r*2;return{vertexCount:a,triangleCount:o}},_updatePolygonGeometry:function(e,t,r,i,n,a,o){var s=e.get("projectUVOnGround"),l=t.attributes.position,f=t.attributes.normal,h=t.attributes.texcoord0,u=t.attributes.color,d=this._triangulationResults[r-this._startIndex],c=u.value&&o,m=t.indices,p=this.extrudeY?1:2,v=this.extrudeY?2:1,g=[this.rootNode.worldTransform.x.len(),this.rootNode.worldTransform.y.len(),this.rootNode.worldTransform.z.len()],y=Et.mul([],this._geoBoundingBox[0],g),x=Et.mul([],this._geoBoundingBox[1],g),_=Math.max(x[0]-y[0],x[2]-y[2]);function S(He,lt,et){for(var tt=He.points,wi=tt.length,Ze=[],Wt=[],ft=0;ft<wi;ft+=3)Ze[0]=tt[ft],Ze[p]=lt,Ze[v]=tt[ft+2],Wt[0]=(tt[ft]*g[0]-y[0])/_,Wt[1]=(tt[ft+2]*g[v]-y[2])/_,l.set(n,Ze),c&&u.set(n,o),h.set(n++,Wt)}function E(He,lt,et){var tt=n;S(He,lt,et);for(var wi=He.indices.length,Ze=0;Ze<wi;Ze++)m[a*3+Ze]=He.indices[Ze]+tt;a+=He.indices.length/3}for(var b=this.extrudeY?[0,1,0]:[0,0,1],A=Et.negate([],b),L=0;L<d.length;L++){var P=n,C=d[L];E(C,0,0),E(C,i,0);for(var I=C.points.length/3,B=0;B<I;B++)f.set(P+B,A),f.set(P+B+I,b);for(var M=[0,3,1,1,3,2],G=[[],[],[],[]],k=[],Y=[],U=[],ue=[],X=0,B=0;B<I;B++){for(var _e=(B+1)%I,ce=(C.points[_e*3]-C.points[B*3])*g[0],be=(C.points[_e*3+2]-C.points[B*3+2])*g[v],Le=Math.sqrt(ce*ce+be*be),oe=0;oe<4;oe++){var je=oe===0||oe===3,Be=(je?B:_e)*3;G[oe][0]=C.points[Be],G[oe][p]=oe>1?i:0,G[oe][v]=C.points[Be+2],l.set(n+oe,G[oe]),s?(ue[0]=(C.points[Be]*g[0]-y[0])/_,ue[1]=(C.points[Be+2]*g[v]-y[v])/_):(ue[0]=(je?X:X+Le)/_,ue[1]=(G[oe][p]*g[p]-y[p])/_),h.set(n+oe,ue)}Et.sub(k,G[1],G[0]),Et.sub(Y,G[3],G[0]),Et.cross(U,k,Y),Et.normalize(U,U);for(var oe=0;oe<4;oe++)f.set(n+oe,U),c&&u.set(n+oe,o);for(var oe=0;oe<6;oe++)m[a*3+oe]=M[oe]+n;n+=4,a+=2,X+=Le}}return t.dirty(),{vertexOffset:n,triangleOffset:a}},_getRegionLinesInfo:function(e,t,r){var i=0,n=0,a=t.getRegionModel(e),o=a.getModel("itemStyle"),s=o.get("borderWidth");if(s>0){var l=t.getRegionPolygonCoords(e);l.forEach(function(f){var h=f.exterior,u=f.interiors;i+=r.getPolylineVertexCount(h),n+=r.getPolylineTriangleCount(h);for(var d=0;d<u.length;d++)i+=r.getPolylineVertexCount(u[d]),n+=r.getPolylineTriangleCount(u[d])},this)}return{vertexCount:i,triangleCount:n}},_updateLinesGeometry:function(e,t,r,i,n,a){function o(f){for(var h=new Float64Array(f.length*3),u=0,d=[],c=0;c<f.length;c++)d[0]=f[c][0],d[1]=i+.1,d[2]=f[c][1],a&&Et.transformMat4(d,d,a),h[u++]=d[0],h[u++]=d[1],h[u++]=d[2];return h}var s=[1,1,1,1],l=t.getRegionPolygonCoords(r);l.forEach(function(f){var h=f.exterior,u=f.interiors;e.addPolyline(o(h),s,n);for(var d=0;d<u.length;d++)e.addPolyline(o(u[d]),s,n)})},highlight:function(e){var t=this._data;if(t){var r=t.getItemModel(e),i=r.getModel(["emphasis","itemStyle"]),n=i.get("color"),a=Z.firstNotNull(i.get("opacity"),Ae(t,e),1);if(n==null){var o=Te(t,e);n=Xt.lift(o,-.4)}a==null&&(a=Ae(t,e));var s=T.parseColor(n);s[3]*=a,this._setColorOfDataIndex(t,e,s)}},downplay:function(e){var t=this._data;if(t){var r=t.getItemModel(e),i=Z.firstNotNull(Te(t,e),r.get(["itemStyle","color"]),"#fff"),n=Z.firstNotNull(Ae(t,e),r.get(["itemStyle","opacity"]),1),a=T.parseColor(i);a[3]*=n,this._setColorOfDataIndex(t,e,a)}},dispose:function(){this._labelsBuilder.dispose()},_setColorOfDataIndex:function(e,t,r){if(!(t<this._startIndex&&t>this._endIndex)){t-=this._startIndex;for(var i=this._vertexRangeOfDataIndex[t*2];i<this._vertexRangeOfDataIndex[t*2+1];i++)this._polygonMesh.geometry.attributes.color.set(i,r);this._polygonMesh.geometry.dirty(),this._api.getZr().refresh()}}};var Zr=ho;var Yf=jt.extend({type:"geo3D",__ecgl__:!0,init:function(e,t){this._geo3DBuilder=new Zr(t),this.groupGL=new T.Node,this._lightRoot=new T.Node,this._sceneHelper=new It(this._lightRoot),this._sceneHelper.initLight(this._lightRoot),this._control=new yr({zr:t.getZr()}),this._control.init()},render:function(e,t,r){this.groupGL.add(this._geo3DBuilder.rootNode);var i=e.coordinateSystem;if(!(!i||!i.viewGL)){i.viewGL.add(this._lightRoot),e.get("show")?i.viewGL.add(this.groupGL):i.viewGL.remove(this.groupGL);var n=this._control;n.setViewGL(i.viewGL);var a=e.getModel("viewControl");n.setFromViewControlModel(a,0),this._sceneHelper.setScene(i.viewGL.scene),this._sceneHelper.updateLight(e),i.viewGL.setPostEffect(e.getModel("postEffect"),r),i.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling")),this._geo3DBuilder.update(e,t,r,0,e.getData().count());var o=i.viewGL.isLinearSpace()?"define":"undefine";this._geo3DBuilder.rootNode.traverse(function(s){s.material&&s.material[o]("fragment","SRGB_DECODE")}),n.off("update"),n.on("update",function(){r.dispatchAction({type:"geo3DChangeCamera",alpha:n.getAlpha(),beta:n.getBeta(),distance:n.getDistance(),center:n.getCenter(),from:this.uid,geo3DId:e.id})}),n.update()}},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r)},dispose:function(){this._control.dispose(),this._geo3DBuilder.dispose()}});var mm={Russia:[100,60],"United States":[-99,38],"United States of America":[-99,38]};function uo(e,t){if(e==="world"){var r=mm[t.name];if(r){var i=[r[0],r[1]];t.setCenter(i)}}}var pm=ae.vec3,yi=ae.mat4,vm=[Yo,uo];function co(e,t,r,i,n){this.name=e,this.map=t,this.regionHeight=0,this.regions=[],this._nameCoordMap={},this.loadGeoJson(r,i,n),this.transform=yi.identity(new Float64Array(16)),this.invTransform=yi.identity(new Float64Array(16)),this.extrudeY=!0,this.altitudeAxis}co.prototype={constructor:co,type:"geo3D",dimensions:["lng","lat","alt"],containPoint:function(){},loadGeoJson:function(e,t,r){var i=nn||nn;try{this.regions=e?i(e):[]}catch(f){throw`Invalid geoJson format
`+f}t=t||{},r=r||{};for(var n=this.regions,a={},o=0;o<n.length;o++){var s=n[o].name;s=r[s]||s,n[o].name=s,a[s]=n[o],this.addGeoCoord(s,n[o].getCenter());var l=t[s];l&&n[o].transformTo(l.left,l.top,l.width,l.height)}this._regionsMap=a,this._geoRect=null,vm.forEach(function(f){f(this)},this)},getGeoBoundingRect:function(){if(this._geoRect)return this._geoRect;for(var e,t=this.regions,r=0;r<t.length;r++){var i=t[r].getBoundingRect();e=e||i.clone(),e.union(i)}return this._geoRect=e||new ct.BoundingRect(0,0,0,0)},addGeoCoord:function(e,t){this._nameCoordMap[e]=t},getRegion:function(e){return this._regionsMap[e]},getRegionByCoord:function(e){for(var t=this.regions,r=0;r<t.length;r++)if(t[r].contain(e))return t[r]},setSize:function(e,t,r){this.size=[e,t,r];var i=this.getGeoBoundingRect(),n=e/i.width,a=-r/i.height,o=-e/2-i.x*n,s=r/2-i.y*a,l=this.extrudeY?[o,0,s]:[o,s,0],f=this.extrudeY?[n,1,a]:[n,a,1],h=this.transform;yi.identity(h),yi.translate(h,h,l),yi.scale(h,h,f),yi.invert(this.invTransform,h)},dataToPoint:function(e,t){t=t||[];var r=this.extrudeY?1:2,i=this.extrudeY?2:1,n=e[2];return isNaN(n)&&(n=0),t[0]=e[0],t[i]=e[1],this.altitudeAxis?t[r]=this.altitudeAxis.dataToCoord(n):t[r]=0,t[r]+=this.regionHeight,pm.transformMat4(t,t,this.transform),t},pointToData:function(e,t){}};var mo=co;function gm(e,t){var r=e.getBoxLayoutParams(),i=hr(r,{width:t.getWidth(),height:t.getHeight()});i.y=t.getHeight()-i.y-i.height,this.viewGL.setViewport(i.x,i.y,i.width,i.height,t.getDevicePixelRatio());var n=this.getGeoBoundingRect(),a=n.width/n.height*(e.get("aspectScale")||.75),o=e.get("boxWidth"),s=e.get("boxDepth"),l=e.get("boxHeight");l==null&&(l=5),isNaN(o)&&isNaN(s)&&(o=100),isNaN(s)?s=o/a:isNaN(o)&&(o=s/a),this.setSize(o,l,s),this.regionHeight=e.get("regionHeight"),this.altitudeAxis&&this.altitudeAxis.setExtent(0,Math.max(l-this.regionHeight,0))}function _m(e,t){var r=[1/0,-1/0];if(e.eachSeries(function(n){if(n.coordinateSystem===this&&n.type!=="series.map3D"){var a=n.getData(),o=n.coordDimToDataDim("alt"),s=o&&o[0];if(s){var l=a.getDataExtent(s,!0);r[0]=Math.min(r[0],l[0]),r[1]=Math.max(r[1],l[1])}}},this),r&&isFinite(r[1]-r[0])){var i=Ee.createScale(r,{type:"value",min:"dataMin",max:"dataMax"});this.altitudeAxis=new Rr("altitude",i),this.resize(this.model,t)}}var qf=0,Kf={dimensions:mo.prototype.dimensions,create:function(e,t){var r=[];if(!bi)throw new Error("geo3D component depends on geo component");function i(n,a){var o=Kf.createGeo3D(n);n.__viewGL=n.__viewGL||new ut,o.viewGL=n.__viewGL,n.coordinateSystem=o,o.model=n,r.push(o),o.resize=gm,o.resize(n,t),o.update=_m}return e.eachComponent("geo3D",function(n,a){i(n,a)}),e.eachSeriesByType("map3D",function(n,a){var o=n.get("coordinateSystem");o==null&&(o="geo3D"),o==="geo3D"&&i(n,a)}),e.eachSeries(function(n){if(n.get("coordinateSystem")==="geo3D"){if(n.type==="series.map3D")return;var a=n.getReferringComponents("geo3D").models[0];if(a||(a=e.getComponent("geo3D")),!a)throw new Error('geo "'+Z.firstNotNull(n.get("geo3DIndex"),n.get("geo3DId"),0)+'" not found');n.coordinateSystem=a.coordinateSystem}}),r},createGeo3D:function(e){var t=e.get("map"),r;return typeof t=="string"?(r=t,t=bi(t)):t&&t.features&&(t={geoJson:t}),r==null&&(r="GEO_ANONYMOUS_"+qf++),new mo(r+qf++,r,t&&t.geoJson,t&&t.specialAreas,e.get("nameMap"))}},$n=Kf;function ea(e){e.registerComponentModel(Rf),e.registerComponentView(Yf),e.registerAction({type:"geo3DChangeCamera",event:"geo3dcamerachanged",update:"series:updateCamera"},function(t,r){r.eachComponent({mainType:"geo3D",query:t},function(i){i.setView(t)})}),e.registerCoordinateSystem("geo3D",$n)}de(ea);function Qf(e,t){e.id=e.id||e.name||t+""}var Yr=Ct.extend({type:"globe",layoutMode:"box",coordinateSystem:null,init:function(){Yr.superApply(this,"init",arguments),N.each(this.option.layers,function(e,t){N.merge(e,this.defaultLayerOption),Qf(e,t)},this)},mergeOption:function(e){var t=this.option.layers;this.option.layers=null,Yr.superApply(this,"mergeOption",arguments);function r(o){return N.reduce(o,function(s,l,f){return Qf(l,f),s[l.id]=l,s},{})}if(t&&t.length){var i=r(e.layers),n=r(t);for(var a in i)n[a]?N.merge(n[a],i[a],!0):t.push(e.layers[a]);this.option.layers=t}N.each(this.option.layers,function(o){N.merge(o,this.defaultLayerOption)},this)},optionUpdated:function(){this.updateDisplacementHash()},defaultLayerOption:{show:!0,type:"overlay"},defaultOption:{show:!0,zlevel:-10,left:0,top:0,width:"100%",height:"100%",environment:"auto",baseColor:"#fff",baseTexture:"",heightTexture:"",displacementTexture:"",displacementScale:0,displacementQuality:"medium",globeRadius:100,globeOuterRadius:150,shading:"lambert",light:{main:{time:""}},atmosphere:{show:!1,offset:5,color:"#ffffff",glowPower:6,innerGlowPower:2},viewControl:{autoRotate:!0,panSensitivity:0,targetCoord:null},layers:[]},setDisplacementData:function(e,t,r){this.displacementData=e,this.displacementWidth=t,this.displacementHeight=r},getDisplacementTexture:function(){return this.get("displacementTexture")||this.get("heightTexture")},getDisplacemenScale:function(){var e=this.getDisplacementTexture(),t=this.get("displacementScale");return(!e||e==="none")&&(t=0),t},hasDisplacement:function(){return this.getDisplacemenScale()>0},_displacementChanged:!0,_displacementScale:0,updateDisplacementHash:function(){var e=this.getDisplacementTexture(),t=this.getDisplacemenScale();this._displacementChanged=this._displacementTexture!==e||this._displacementScale!==t,this._displacementTexture=e,this._displacementScale=t},isDisplacementChanged:function(){return this._displacementChanged}});N.merge(Yr.prototype,xr);N.merge(Yr.prototype,Nt);N.merge(Yr.prototype,Rt);N.merge(Yr.prototype,Ot);var Jf=Yr;var $f=Math.PI,Bt=Math.sin,sr=Math.cos,eh=Math.tan,th=Math.asin,rh=Math.atan2,qr=$f/180,xm=1e3*60*60*24,ym=2440588,Tm=2451545;function Em(e){return e.valueOf()/xm-.5+ym}function Sm(e){return Em(e)-Tm}var ta=qr*23.4397;function wm(e,t){return rh(Bt(e)*sr(ta)-eh(t)*Bt(ta),sr(e))}function Am(e,t){return th(Bt(t)*sr(ta)+sr(t)*Bt(ta)*Bt(e))}function bm(e,t,r){return rh(Bt(e),sr(e)*Bt(t)-eh(r)*sr(t))}function Lm(e,t,r){return th(Bt(t)*Bt(r)+sr(t)*sr(r)*sr(e))}function Dm(e,t){return qr*(280.16+360.9856235*e)-t}function Cm(e){return qr*(357.5291+.98560028*e)}function Mm(e){var t=qr*(1.9148*Bt(e)+.02*Bt(2*e)+3e-4*Bt(3*e)),r=qr*102.9372;return e+t+r+$f}function Pm(e){var t=Cm(e),r=Mm(t);return{dec:Am(r,0),ra:wm(r,0)}}var ih={};ih.getPosition=function(e,t,r){var i=qr*-r,n=qr*t,a=Sm(e),o=Pm(a),s=Dm(a,i)-o.ra;return{azimuth:bm(s,n,o.dec),altitude:Lm(s,n,o.dec)}};var nh=ih;var ah=`@export ecgl.atmosphere.vertex
attribute vec3 position: POSITION;
attribute vec3 normal : NORMAL;
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform mat4 normalMatrix : WORLDINVERSETRANSPOSE;

varying vec3 v_Normal;

void main() {
 v_Normal = normalize((normalMatrix * vec4(normal, 0.0)).xyz);
 gl_Position = worldViewProjection * vec4(position, 1.0);
}
@end


@export ecgl.atmosphere.fragment
uniform mat4 viewTranspose: VIEWTRANSPOSE;
uniform float glowPower;
uniform vec3 glowColor;

varying vec3 v_Normal;

void main() {
 float intensity = pow(1.0 - dot(v_Normal, (viewTranspose * vec4(0.0, 0.0, 1.0, 0.0)).xyz), glowPower);
 gl_FragColor = vec4(glowColor, intensity * intensity);
}
@end`;T.Shader.import(Cn);T.Shader.import(ah);var oh=jt.extend({type:"globe",__ecgl__:!0,_displacementScale:0,init:function(e,t){this.groupGL=new T.Node,this._sphereGeometry=new T.SphereGeometry({widthSegments:200,heightSegments:100,dynamic:!0}),this._overlayGeometry=new T.SphereGeometry({widthSegments:80,heightSegments:40}),this._planeGeometry=new T.PlaneGeometry,this._earthMesh=new T.Mesh({renderNormal:!0}),this._atmosphereMesh=new T.Mesh,this._atmosphereGeometry=new T.SphereGeometry({widthSegments:80,heightSegments:40}),this._atmosphereMaterial=new T.Material({shader:new T.Shader(T.Shader.source("ecgl.atmosphere.vertex"),T.Shader.source("ecgl.atmosphere.fragment")),transparent:!0}),this._atmosphereMesh.geometry=this._atmosphereGeometry,this._atmosphereMesh.material=this._atmosphereMaterial,this._atmosphereMesh.frontFace=T.Mesh.CW,this._lightRoot=new T.Node,this._sceneHelper=new It,this._sceneHelper.initLight(this._lightRoot),this.groupGL.add(this._atmosphereMesh),this.groupGL.add(this._earthMesh),this._control=new yr({zr:t.getZr()}),this._control.init(),this._layerMeshes={}},render:function(e,t,r){var i=e.coordinateSystem,n=e.get("shading");i.viewGL.add(this._lightRoot),e.get("show")?i.viewGL.add(this.groupGL):i.viewGL.remove(this.groupGL),this._sceneHelper.setScene(i.viewGL.scene),i.viewGL.setPostEffect(e.getModel("postEffect"),r),i.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling"));var a=this._earthMesh;a.geometry=this._sphereGeometry;var o="ecgl."+n;(!a.material||a.material.shader.name!==o)&&(a.material=T.createMaterial(o)),T.setMaterialFromModel(n,a.material,e,r),["roughnessMap","metalnessMap","detailMap","normalMap"].forEach(function(u){var d=a.material.get(u);d&&(d.flipY=!1)}),a.material.set("color",T.parseColor(e.get("baseColor")));var s=i.radius*.99;if(a.scale.set(s,s,s),e.get("atmosphere.show")){a.material.define("both","ATMOSPHERE_ENABLED"),this._atmosphereMesh.invisible=!1,this._atmosphereMaterial.setUniforms({glowPower:e.get("atmosphere.glowPower")||6,glowColor:e.get("atmosphere.color")||"#ffffff"}),a.material.setUniforms({glowPower:e.get("atmosphere.innerGlowPower")||2,glowColor:e.get("atmosphere.color")||"#ffffff"});var l=e.get("atmosphere.offset")||5;this._atmosphereMesh.scale.set(s+l,s+l,s+l)}else a.material.undefine("both","ATMOSPHERE_ENABLED"),this._atmosphereMesh.invisible=!0;var f=a.material.setTextureImage("diffuseMap",e.get("baseTexture"),r,{flipY:!1,anisotropic:8});f&&f.surface&&f.surface.attachToMesh(a);var h=a.material.setTextureImage("bumpMap",e.get("heightTexture"),r,{flipY:!1,anisotropic:8});h&&h.surface&&h.surface.attachToMesh(a),a.material[e.get("postEffect.enable")?"define":"undefine"]("fragment","SRGB_DECODE"),this._updateLight(e,r),this._displaceVertices(e,r),this._updateViewControl(e,r),this._updateLayers(e,r)},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r)},_updateLayers:function(e,t){var r=e.coordinateSystem,i=e.get("layers"),n=r.radius,a=[],o=[],s=[],l=[];N.each(i,function(c){var m=new fr(c),p=m.get("type"),v=T.loadTexture(m.get("texture"),t,{flipY:!1,anisotropic:8});if(v.surface&&v.surface.attachToMesh(this._earthMesh),p==="blend"){var g=m.get("blendTo"),y=Z.firstNotNull(m.get("intensity"),1);g==="emission"?(s.push(v),l.push(y)):(a.push(v),o.push(y))}else{var x=m.get("id"),_=this._layerMeshes[x];_||(_=this._layerMeshes[x]=new T.Mesh({geometry:this._overlayGeometry,castShadow:!1,ignorePicking:!0}));var S=m.get("shading");S==="lambert"?(_.material=_.__lambertMaterial||new T.Material({autoUpdateTextureStatus:!1,shader:T.createShader("ecgl.lambert"),transparent:!0,depthMask:!1}),_.__lambertMaterial=_.material):(_.material=_.__colorMaterial||new T.Material({autoUpdateTextureStatus:!1,shader:T.createShader("ecgl.color"),transparent:!0,depthMask:!1}),_.__colorMaterial=_.material),_.material.enableTexture("diffuseMap");var E=m.get("distance"),b=n+(E??r.radius/100);_.scale.set(b,b,b),n=b;var A=this._blankTexture||(this._blankTexture=T.createBlankTexture("rgba(255, 255, 255, 0)"));_.material.set("diffuseMap",A),T.loadTexture(m.get("texture"),t,{flipY:!1,anisotropic:8},function(L){L.surface&&L.surface.attachToMesh(_),_.material.set("diffuseMap",L),t.getZr().refresh()}),m.get("show")?this.groupGL.add(_):this.groupGL.remove(_)}},this);var f=this._earthMesh.material;f.define("fragment","LAYER_DIFFUSEMAP_COUNT",a.length),f.define("fragment","LAYER_EMISSIVEMAP_COUNT",s.length),f.set("layerDiffuseMap",a),f.set("layerDiffuseIntensity",o),f.set("layerEmissiveMap",s),f.set("layerEmissionIntensity",l);var h=e.getModel("debug.wireframe");if(h.get("show")){f.define("both","WIREFRAME_TRIANGLE");var u=T.parseColor(h.get("lineStyle.color")||"rgba(0,0,0,0.5)"),d=Z.firstNotNull(h.get("lineStyle.width"),1);f.set("wireframeLineWidth",d),f.set("wireframeLineColor",u)}else f.undefine("both","WIREFRAME_TRIANGLE")},_updateViewControl:function(e,t){var r=e.coordinateSystem,i=e.getModel("viewControl"),n=r.viewGL.camera,a=this;function o(){return{type:"globeChangeCamera",alpha:s.getAlpha(),beta:s.getBeta(),distance:s.getDistance()-r.radius,center:s.getCenter(),from:a.uid,globeId:e.id}}var s=this._control;s.setViewGL(r.viewGL);var l=i.get("targetCoord"),f,h;l!=null&&(h=l[0]+90,f=l[1]),s.setFromViewControlModel(i,{baseDistance:r.radius,alpha:f,beta:h}),s.off("update"),s.on("update",function(){t.dispatchAction(o())})},_displaceVertices:function(e,t){var r=e.get("displacementQuality"),i=e.get("debug.wireframe.show"),n=e.coordinateSystem;if(!(!e.isDisplacementChanged()&&r===this._displacementQuality&&i===this._showDebugWireframe)){this._displacementQuality=r,this._showDebugWireframe=i;var a=this._sphereGeometry,o={low:100,medium:200,high:400,ultra:800}[r]||200,s=o/2;(a.widthSegments!==o||i)&&(a.widthSegments=o,a.heightSegments=s,a.build()),this._doDisplaceVertices(a,n),i&&a.generateBarycentric()}},_doDisplaceVertices:function(e,t){var r=e.attributes.position.value,i=e.attributes.texcoord0.value,n=e.__originalPosition;(!n||n.length!==r.length)&&(n=new Float32Array(r.length),n.set(r),e.__originalPosition=n);for(var a=t.displacementWidth,o=t.displacementHeight,s=t.displacementData,l=0;l<e.vertexCount;l++){var f=l*3,h=l*2,u=n[f+1],d=n[f+2],c=n[f+3],m=i[h++],p=i[h++],v=Math.round(m*(a-1)),g=Math.round(p*(o-1)),y=g*a+v,x=s?s[y]:0;r[f+1]=u+u*x,r[f+2]=d+d*x,r[f+3]=c+c*x}e.generateVertexNormals(),e.dirty(),e.updateBoundingBox()},_updateLight:function(e,t){var r=this._earthMesh;this._sceneHelper.updateLight(e);var i=this._sceneHelper.mainLight,n=e.get("light.main.time")||new Date,a=nh.getPosition(wt.parseDate(n),0,0),o=Math.cos(a.altitude);i.position.y=-o*Math.cos(a.azimuth),i.position.x=Math.sin(a.altitude),i.position.z=o*Math.sin(a.azimuth),i.lookAt(r.getWorldPosition())},dispose:function(e,t){this.groupGL.removeAll(),this._control.dispose()}});var Nm=ae.vec3;function po(e){this.radius=e,this.viewGL=null,this.altitudeAxis,this.displacementData=null,this.displacementWidth,this.displacementHeight}po.prototype={constructor:po,dimensions:["lng","lat","alt"],type:"globe",containPoint:function(){},setDisplacementData:function(e,t,r){this.displacementData=e,this.displacementWidth=t,this.displacementHeight=r},_getDisplacementScale:function(e,t){var r=(e+180)/360*(this.displacementWidth-1),i=(90-t)/180*(this.displacementHeight-1),n=Math.round(r)+Math.round(i)*this.displacementWidth;return this.displacementData[n]},dataToPoint:function(e,t){var r=e[0],i=e[1],n=e[2]||0,a=this.radius;this.displacementData&&(a*=1+this._getDisplacementScale(r,i)),this.altitudeAxis&&(a+=this.altitudeAxis.dataToCoord(n)),r=r*Math.PI/180,i=i*Math.PI/180;var o=Math.cos(i)*a;return t=t||[],t[0]=-o*Math.cos(r+Math.PI),t[1]=Math.sin(i)*a,t[2]=o*Math.sin(r+Math.PI),t},pointToData:function(e,t){var r=e[0],i=e[1],n=e[2],a=Nm.len(e);r/=a,i/=a,n/=a;var o=Math.asin(i),s=Math.atan2(n,-r);s<0&&(s=Math.PI*2+s);var l=o*180/Math.PI,f=s*180/Math.PI-180;return t=t||[],t[0]=f,t[1]=l,t[2]=a-this.radius,this.altitudeAxis&&(t[2]=this.altitudeAxis.coordToData(t[2])),t}};var vo=po;function Rm(e,t){var r=document.createElement("canvas"),i=r.getContext("2d"),n=e.width,a=e.height;r.width=n,r.height=a,i.drawImage(e,0,0,n,a);for(var o=i.getImageData(0,0,n,a).data,s=new Float32Array(o.length/4),l=0;l<o.length/4;l++){var f=o[l*4];s[l]=f/255*t}return{data:s,width:n,height:a}}function Im(e,t){var r=e.getBoxLayoutParams(),i=hr(r,{width:t.getWidth(),height:t.getHeight()});i.y=t.getHeight()-i.y-i.height,this.viewGL.setViewport(i.x,i.y,i.width,i.height,t.getDevicePixelRatio()),this.radius=e.get("globeRadius");var n=e.get("globeOuterRadius");this.altitudeAxis&&this.altitudeAxis.setExtent(0,n-this.radius)}function Om(e,t){var r=[1/0,-1/0];if(e.eachSeries(function(n){if(n.coordinateSystem===this){var a=n.getData(),o=n.coordDimToDataDim("alt"),s=o&&o[0];if(s){var l=a.getDataExtent(s,!0);r[0]=Math.min(r[0],l[0]),r[1]=Math.max(r[1],l[1])}}},this),r&&isFinite(r[1]-r[0])){var i=Ee.createScale(r,{type:"value",min:"dataMin",max:"dataMax"});this.altitudeAxis=new Rr("altitude",i),this.resize(this.model,t)}}var Bm={dimensions:vo.prototype.dimensions,create:function(e,t){var r=[];return e.eachComponent("globe",function(i){i.__viewGL=i.__viewGL||new ut;var n=new vo;n.viewGL=i.__viewGL,i.coordinateSystem=n,n.model=i,r.push(n),n.resize=Im,n.resize(i,t),n.update=Om}),e.eachSeries(function(i){if(i.get("coordinateSystem")==="globe"){var n=i.getReferringComponents("globe").models[0];if(n||(n=e.getComponent("globe")),!n)throw new Error('globe "'+Z.firstNotNull(i.get("globe3DIndex"),i.get("globe3DId"),0)+'" not found');var a=n.coordinateSystem;i.coordinateSystem=a}}),e.eachComponent("globe",function(i,n){var a=i.coordinateSystem,o=i.getDisplacementTexture(),s=i.getDisplacemenScale();if(i.isDisplacementChanged()){if(i.hasDisplacement()){var l=!0;T.loadTexture(o,t,function(f){var h=f.image,u=Rm(h,s);i.setDisplacementData(u.data,u.width,u.height),l||t.dispatchAction({type:"globeUpdateDisplacment"})}),l=!1}else a.setDisplacementData(null,0,0);a.setDisplacementData(i.displacementData,i.displacementWidth,i.displacementHeight)}}),r}},sh=Bm;function lh(e){e.registerComponentModel(Jf),e.registerComponentView(oh),e.registerCoordinateSystem("globe",sh),e.registerAction({type:"globeChangeCamera",event:"globecamerachanged",update:"series:updateCamera"},function(t,r){r.eachComponent({mainType:"globe",query:t},function(i){i.setView(t)})}),e.registerAction({type:"globeUpdateDisplacment",event:"globedisplacementupdated",update:"update"},function(t,r){})}de(lh);var fh=["zoom","center","pitch","bearing"],go=Ct.extend({type:"mapbox3D",layoutMode:"box",coordinateSystem:null,defaultOption:{zlevel:-10,style:"mapbox://styles/mapbox/light-v9",center:[0,0],zoom:0,pitch:0,bearing:0,light:{main:{alpha:20,beta:30}},altitudeScale:1,boxHeight:"auto"},getMapboxCameraOption:function(){var e=this;return fh.reduce(function(t,r){return t[r]=e.get(r),t},{})},setMapboxCameraOption:function(e){e!=null&&fh.forEach(function(t){e[t]!=null&&(this.option[t]=e[t])},this)},getMapbox:function(){return this._mapbox},setMapbox:function(e){this._mapbox=e}});N.merge(go.prototype,Nt);N.merge(go.prototype,Rt);var hh=go;function Sr(e,t){if(this.id=e,this.zr=t,this.dom=document.createElement("div"),this.dom.style.cssText="position:absolute;left:0;right:0;top:0;bottom:0;",!mapboxgl)throw new Error("Mapbox GL library must be included. See https://www.mapbox.com/mapbox-gl-js/api/");this._mapbox=new mapboxgl.Map({container:this.dom}),this._initEvents()}Sr.prototype.setUnpainted=function(){};Sr.prototype.resize=function(){this._mapbox.resize()};Sr.prototype.getMapbox=function(){return this._mapbox};Sr.prototype.clear=function(){};Sr.prototype.refresh=function(){this._mapbox.resize()};var uh=["mousedown","mouseup","click","dblclick","mousemove","mousewheel","wheel","touchstart","touchend","touchmove","touchcancel"];Sr.prototype._initEvents=function(){var e=this._mapbox.getCanvasContainer();this._handlers=this._handlers||{contextmenu:function(t){return t.preventDefault(),!1}},uh.forEach(function(t){this._handlers[t]=function(r){var i={};for(var n in r)i[n]=r[n];i.bubbles=!1;var a=new r.constructor(r.type,i);e.dispatchEvent(a)},this.zr.dom.addEventListener(t,this._handlers[t])},this),this.zr.dom.addEventListener("contextmenu",this._handlers.contextmenu)};Sr.prototype.dispose=function(){uh.forEach(function(e){this.zr.dom.removeEventListener(e,this._handlers[e])},this)};var ch=Sr;var ra=`
@export ecgl.displayShadow.vertex

@import ecgl.common.transformUniforms

@import ecgl.common.uv.header

@import ecgl.common.attributes

varying vec3 v_WorldPosition;

varying vec3 v_Normal;

void main()
{
 @import ecgl.common.uv.main
 v_Normal = normalize((worldInverseTranspose * vec4(normal, 0.0)).xyz);

 v_WorldPosition = (world * vec4(position, 1.0)).xyz;
 gl_Position = worldViewProjection * vec4(position, 1.0);
}

@end


@export ecgl.displayShadow.fragment

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform float roughness: 0.2;

#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

@import ecgl.common.ssaoMap.header

@import clay.plugin.compute_shadow_map

void main()
{
 float shadow = 1.0;

 @import ecgl.common.ssaoMap.main

#if defined(DIRECTIONAL_LIGHT_COUNT) && defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
 if(shadowEnabled)
 {
 computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
 }
 for (int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++) {
 shadow = min(shadow, shadowContribsDir[i] * 0.5 + 0.5);
 }
#endif

 shadow *= 0.5 + ao * 0.5;
 shadow = clamp(shadow, 0.0, 1.0);

 gl_FragColor = vec4(vec3(0.0), 1.0 - shadow);
}

@end`;T.Shader.import(ra);var dh=jt.extend({type:"mapbox3D",__ecgl__:!0,init:function(e,t){var r=t.getZr();this._zrLayer=new ch("mapbox3D",r),r.painter.insertLayer(-1e3,this._zrLayer),this._lightRoot=new T.Node,this._sceneHelper=new It(this._lightRoot),this._sceneHelper.initLight(this._lightRoot);var i=this._zrLayer.getMapbox(),n=this._dispatchInteractAction.bind(this,t,i);["zoom","rotate","drag","pitch","rotate","move"].forEach(function(a){i.on(a,n)}),this._groundMesh=new T.Mesh({geometry:new T.PlaneGeometry,material:new T.Material({shader:new T.Shader({vertex:T.Shader.source("ecgl.displayShadow.vertex"),fragment:T.Shader.source("ecgl.displayShadow.fragment")}),depthMask:!1}),renderOrder:-100,culling:!1,castShadow:!1,$ignorePicking:!0,renderNormal:!0})},render:function(e,t,r){var i=this._zrLayer.getMapbox(),n=e.get("style"),a=JSON.stringify(n);a!==this._oldStyleStr&&n&&i.setStyle(n),this._oldStyleStr=a,i.setCenter(e.get("center")),i.setZoom(e.get("zoom")),i.setPitch(e.get("pitch")),i.setBearing(e.get("bearing")),e.setMapbox(i);var o=e.coordinateSystem;o.viewGL.scene.add(this._lightRoot),o.viewGL.add(this._groundMesh),this._updateGroundMesh(),this._sceneHelper.setScene(o.viewGL.scene),this._sceneHelper.updateLight(e),o.viewGL.setPostEffect(e.getModel("postEffect"),r),o.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling")),this._mapbox3DModel=e},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r),e.coordinateSystem.viewGL.scene.traverse(function(a){a.material&&(a.material.define("fragment","NORMAL_UP_AXIS",2),a.material.define("fragment","NORMAL_FRONT_AXIS",1))})},updateCamera:function(e,t,r,i){e.coordinateSystem.setCameraOption(i),this._updateGroundMesh(),r.getZr().refresh()},_dispatchInteractAction:function(e,t,r){e.dispatchAction({type:"mapbox3DChangeCamera",pitch:t.getPitch(),zoom:t.getZoom(),center:t.getCenter().toArray(),bearing:t.getBearing(),mapbox3DId:this._mapbox3DModel&&this._mapbox3DModel.id})},_updateGroundMesh:function(){if(this._mapbox3DModel){var e=this._mapbox3DModel.coordinateSystem,t=e.dataToPoint(e.center);this._groundMesh.position.set(t[0],t[1],-.001);var r=new T.Plane(new T.Vector3(0,0,1),0),i=e.viewGL.camera.castRay(new T.Vector2(-1,-1)),n=e.viewGL.camera.castRay(new T.Vector2(1,1)),a=i.intersectPlane(r),o=n.intersectPlane(r),s=a.dist(o)/e.viewGL.rootNode.scale.x;this._groundMesh.scale.set(s,s,1)}},dispose:function(e,t){this._zrLayer&&this._zrLayer.dispose(),t.getZr().painter.delLayer(-1e3)}});var wr=ae.mat4,Yi=512,_o=.6435011087932844,St=Math.PI,Ti=1/10;function xo(){this.width=0,this.height=0,this.altitudeScale=1,this.boxHeight="auto",this.altitudeExtent,this.bearing=0,this.pitch=0,this.center=[0,0],this._origin,this.zoom=0,this._initialZoom,this.maxPitch=60,this.zoomOffset=0}xo.prototype={constructor:xo,dimensions:["lng","lat","alt"],containPoint:function(){},setCameraOption:function(e){this.bearing=e.bearing,this.pitch=e.pitch,this.center=e.center,this.zoom=e.zoom,this._origin||(this._origin=this.projectOnTileWithScale(this.center,Yi)),this._initialZoom==null&&(this._initialZoom=this.zoom),this.updateTransform()},updateTransform:function(){if(this.height){var e=.5/Math.tan(_o/2)*this.height*Ti,t=Math.max(Math.min(this.pitch,this.maxPitch),0)/180*Math.PI,r=_o/2,i=Math.PI/2+t,n=Math.sin(r)*e/Math.sin(Math.PI-i-r),a=Math.cos(Math.PI/2-t)*n+e,o=a*1.1;this.pitch>50&&(o=1e3);var s=[];wr.perspective(s,_o,this.width/this.height,1,o),this.viewGL.camera.projectionMatrix.setArray(s),this.viewGL.camera.decomposeProjectionMatrix();var s=wr.identity([]),l=this.dataToPoint(this.center);wr.scale(s,s,[1,-1,1]),wr.translate(s,s,[0,0,-e]),wr.rotateX(s,s,t),wr.rotateZ(s,s,-this.bearing/180*Math.PI),wr.translate(s,s,[-l[0]*this.getScale()*Ti,-l[1]*this.getScale()*Ti,0]),this.viewGL.camera.viewMatrix.array=s;var f=[];wr.invert(f,s),this.viewGL.camera.worldTransform.array=f,this.viewGL.camera.decomposeWorldTransform();var h=Yi*this.getScale(),u;if(this.altitudeExtent&&!isNaN(this.boxHeight)){var d=this.altitudeExtent[1]-this.altitudeExtent[0];u=this.boxHeight/d*this.getScale()/Math.pow(2,this._initialZoom-this.zoomOffset)}else u=h/(2*Math.PI*6378e3*Math.abs(Math.cos(this.center[1]*(Math.PI/180))))*this.altitudeScale*Ti;this.viewGL.rootNode.scale.set(this.getScale()*Ti,this.getScale()*Ti,u)}},getScale:function(){return Math.pow(2,this.zoom-this.zoomOffset)},projectOnTile:function(e,t){return this.projectOnTileWithScale(e,this.getScale()*Yi,t)},projectOnTileWithScale:function(e,t,r){var i=e[0],n=e[1],a=i*St/180,o=n*St/180,s=t*(a+St)/(2*St),l=t*(St-Math.log(Math.tan(St/4+o*.5)))/(2*St);return r=r||[],r[0]=s,r[1]=l,r},unprojectFromTile:function(e,t){return this.unprojectOnTileWithScale(e,this.getScale()*Yi,t)},unprojectOnTileWithScale:function(e,t,r){var i=e[0],n=e[1],a=i/t*(2*St)-St,o=2*(Math.atan(Math.exp(St-n/t*(2*St)))-St/4);return r=r||[],r[0]=a*180/St,r[1]=o*180/St,r},dataToPoint:function(e,t){return t=this.projectOnTileWithScale(e,Yi,t),t[0]-=this._origin[0],t[1]-=this._origin[1],t[2]=isNaN(e[2])?0:e[2],isNaN(e[2])||(t[2]=e[2],this.altitudeExtent&&(t[2]-=this.altitudeExtent[0])),t}};var Ei=xo;function qi(){Ei.apply(this,arguments)}qi.prototype=new Ei;qi.prototype.constructor=qi;qi.prototype.type="mapbox3D";var mh=qi;function ia(e,t,r){function i(a,o){var s=o.getWidth(),l=o.getHeight(),f=o.getDevicePixelRatio();this.viewGL.setViewport(0,0,s,l,f),this.width=s,this.height=l,this.altitudeScale=a.get("altitudeScale"),this.boxHeight=a.get("boxHeight")}function n(a,o){if(this.model.get("boxHeight")!=="auto"){var s=[1/0,-1/0];a.eachSeries(function(l){if(l.coordinateSystem===this){var f=l.getData(),h=l.coordDimToDataDim("alt")[0];if(h){var u=f.getDataExtent(h,!0);s[0]=Math.min(s[0],u[0]),s[1]=Math.max(s[1],u[1])}}},this),s&&isFinite(s[1]-s[0])&&(this.altitudeExtent=s)}}return{dimensions:t.prototype.dimensions,create:function(a,o){var s=[];return a.eachComponent(e,function(l){var f=l.__viewGL;f||(f=l.__viewGL=new ut,f.setRootNode(new T.Node));var h=new t;h.viewGL=l.__viewGL,h.resize=i,h.resize(l,o),s.push(h),l.coordinateSystem=h,h.model=l,h.update=n}),a.eachSeries(function(l){if(l.get("coordinateSystem")===e){var f=l.getReferringComponents(e).models[0];if(f||(f=a.getComponent(e)),!f)throw new Error(e+' "'+Z.firstNotNull(l.get(e+"Index"),l.get(e+"Id"),0)+'" not found');l.coordinateSystem=f.coordinateSystem}}),r&&r(s,a,o),s}}}var Fm=ia("mapbox3D",mh,function(e){e.forEach(function(t){t.setCameraOption(t.model.getMapboxCameraOption())})}),ph=Fm;function vh(e){e.registerComponentModel(hh),e.registerComponentView(dh),e.registerCoordinateSystem("mapbox3D",ph),e.registerAction({type:"mapbox3DChangeCamera",event:"mapbox3dcamerachanged",update:"mapbox3D:updateCamera"},function(t,r){r.eachComponent({mainType:"mapbox3D",query:t},function(i){i.setMapboxCameraOption(t)})})}de(vh);var gh=["zoom","center","pitch","bearing"],yo=Ct.extend({type:"maptalks3D",layoutMode:"box",coordinateSystem:null,defaultOption:{zlevel:-10,urlTemplate:"http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',center:[0,0],zoom:0,pitch:0,bearing:0,light:{main:{alpha:20,beta:30}},altitudeScale:1,boxHeight:"auto"},getMaptalksCameraOption:function(){var e=this;return gh.reduce(function(t,r){return t[r]=e.get(r),t},{})},setMaptalksCameraOption:function(e){e!=null&&gh.forEach(function(t){e[t]!=null&&(this.option[t]=e[t])},this)},getMaptalks:function(){return this._maptalks},setMaptalks:function(e){this._maptalks=e}});N.merge(yo.prototype,Nt);N.merge(yo.prototype,Rt);var _h=yo;function Ar(e,t,r,i){if(this.id=e,this.zr=t,this.dom=document.createElement("div"),this.dom.style.cssText="position:absolute;left:0;right:0;top:0;bottom:0;",!maptalks)throw new Error("Maptalks library must be included. See https://maptalks.org");this._maptalks=new maptalks.Map(this.dom,{center:r,zoom:i,doubleClickZoom:!1,fog:!1}),this._initEvents()}Ar.prototype.setUnpainted=function(){};Ar.prototype.resize=function(){this._maptalks.checkSize()};Ar.prototype.getMaptalks=function(){return this._maptalks};Ar.prototype.clear=function(){};Ar.prototype.refresh=function(){this._maptalks.checkSize()};var xh=["mousedown","mouseup","click","dblclick","mousemove","mousewheel","DOMMouseScroll","touchstart","touchend","touchmove","touchcancel"];Ar.prototype._initEvents=function(){var e=this.dom;this._handlers=this._handlers||{contextmenu:function(t){return t.preventDefault(),!1}},xh.forEach(function(t){this._handlers[t]=function(r){var i={};for(var n in r)i[n]=r[n];i.bubbles=!1;var a=new r.constructor(r.type,i);t==="mousewheel"||t==="DOMMouseScroll"?e.dispatchEvent(a):e.firstElementChild.dispatchEvent(a)},this.zr.dom.addEventListener(t,this._handlers[t])},this),this.zr.dom.addEventListener("contextmenu",this._handlers.contextmenu)};Ar.prototype.dispose=function(){xh.forEach(function(e){this.zr.dom.removeEventListener(e,this._handlers[e])},this),this._maptalks.remove()};var yh=Ar;T.Shader.import(ra);var Th=jt.extend({type:"maptalks3D",__ecgl__:!0,init:function(e,t){this._groundMesh=new T.Mesh({geometry:new T.PlaneGeometry,material:new T.Material({shader:new T.Shader({vertex:T.Shader.source("ecgl.displayShadow.vertex"),fragment:T.Shader.source("ecgl.displayShadow.fragment")}),depthMask:!1}),renderOrder:-100,culling:!1,castShadow:!1,$ignorePicking:!0,renderNormal:!0})},_initMaptalksLayer:function(e,t){var r=t.getZr();this._zrLayer=new yh("maptalks3D",r,e.get("center"),e.get("zoom")),r.painter.insertLayer(-1e3,this._zrLayer),this._lightRoot=new T.Node,this._sceneHelper=new It(this._lightRoot),this._sceneHelper.initLight(this._lightRoot);var i=this._zrLayer.getMaptalks(),n=this._dispatchInteractAction.bind(this,t,i);["zoomend","zooming","zoomstart","dragrotating","pitch","pitchend","movestart","moving","moveend","resize","touchstart","touchmove","touchend","animating"].forEach(function(a){i.on(a,n)})},render:function(e,t,r){this._zrLayer||this._initMaptalksLayer(e,r);var i=this._zrLayer.getMaptalks(),n=e.get("urlTemplate"),a=i.getBaseLayer();n!==this._oldUrlTemplate&&(a?a.setOptions({urlTemplate:n,attribution:e.get("attribution")}):(a=new maptalks.TileLayer("maptalks-echarts-gl-baselayer",{urlTemplate:n,subdomains:["a","b","c"],attribution:e.get("attribution")}),i.setBaseLayer(a))),this._oldUrlTemplate=n,i.setCenter(e.get("center")),i.setZoom(e.get("zoom"),{animation:!1}),i.setPitch(e.get("pitch")),i.setBearing(e.get("bearing")),e.setMaptalks(i);var o=e.coordinateSystem;o.viewGL.scene.add(this._lightRoot),o.viewGL.add(this._groundMesh),this._updateGroundMesh(),this._sceneHelper.setScene(o.viewGL.scene),this._sceneHelper.updateLight(e),o.viewGL.setPostEffect(e.getModel("postEffect"),r),o.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling")),this._maptalks3DModel=e},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r),e.coordinateSystem.viewGL.scene.traverse(function(a){a.material&&(a.material.define("fragment","NORMAL_UP_AXIS",2),a.material.define("fragment","NORMAL_FRONT_AXIS",1))})},updateCamera:function(e,t,r,i){e.coordinateSystem.setCameraOption(i),this._updateGroundMesh(),r.getZr().refresh()},_dispatchInteractAction:function(e,t,r){e.dispatchAction({type:"maptalks3DChangeCamera",pitch:t.getPitch(),zoom:Um(t.getResolution())+1,center:t.getCenter().toArray(),bearing:t.getBearing(),maptalks3DId:this._maptalks3DModel&&this._maptalks3DModel.id})},_updateGroundMesh:function(){if(this._maptalks3DModel){var e=this._maptalks3DModel.coordinateSystem,t=e.dataToPoint(e.center);this._groundMesh.position.set(t[0],t[1],-.001);var r=new T.Plane(new T.Vector3(0,0,1),0),i=e.viewGL.camera.castRay(new T.Vector2(-1,-1)),n=e.viewGL.camera.castRay(new T.Vector2(1,1)),a=i.intersectPlane(r),o=n.intersectPlane(r),s=a.dist(o)/e.viewGL.rootNode.scale.x;this._groundMesh.scale.set(s,s,1)}},dispose:function(e,t){this._zrLayer&&this._zrLayer.dispose(),t.getZr().painter.delLayer(-1e3)}}),Gm=2*6378137*Math.PI/(256*Math.pow(2,20));function Um(e){return 19-Math.log(e/Gm)/Math.LN2}function Ki(){Ei.apply(this,arguments),this.maxPitch=85,this.zoomOffset=1}Ki.prototype=new Ei;Ki.prototype.constructor=Ki;Ki.prototype.type="maptalks3D";var Eh=Ki;var zm=ia("maptalks3D",Eh,function(e){e.forEach(function(t){t.setCameraOption(t.model.getMaptalksCameraOption())})}),Sh=zm;function wh(e){e.registerComponentModel(_h),e.registerComponentView(Th),e.registerCoordinateSystem("maptalks3D",Sh),e.registerAction({type:"maptalks3DChangeCamera",event:"maptalks3dcamerachanged",update:"maptalks3D:updateCamera"},function(t,r){r.eachComponent({mainType:"maptalks3D",query:t},function(i){i.setMaptalksCameraOption(t)})})}de(wh);var Vm=ae.vec3,Hm=Ee.dataStack.isDimensionStacked;function km(e){var t=e[0],r=e[1];return!(t>0&&r>0||t<0&&r<0)}function Wm(e,t){var r=e.getData(),i=e.get("barSize");if(i==null){var n=t.size,a,o,s=t.getAxis("x"),l=t.getAxis("y");s.type==="category"?a=s.getBandWidth()*.7:a=Math.round(n[0]/Math.sqrt(r.count()))*.6,l.type==="category"?o=l.getBandWidth()*.7:o=Math.round(n[1]/Math.sqrt(r.count()))*.6,i=[a,o]}else N.isArray(i)||(i=[i,i]);var f=t.getAxis("z").scale.getExtent(),h=km(f),u=["x","y","z"].map(function(m){return e.coordDimToDataDim(m)[0]}),d=Hm(r,u[2]),c=d?r.getCalculationInfo("stackResultDimension"):u[2];r.each(u,function(m,p,v,g){var y=r.get(c,g),x=d?y-v:h?0:f[0],_=t.dataToPoint([m,p,x]),S=t.dataToPoint([m,p,y]),E=Vm.dist(_,S),b=[0,S[1]<_[1]?-1:1,0];Math.abs(E)===0&&(E=.1);var A=[i[0],E,i[1]];r.setItemLayout(g,[_,b,A])}),r.setLayout("orient",[1,0,0])}var Ah=Wm;function na(e,t,r){for(var i=e.getDataExtent(t),n=e.getDataExtent(r),a=i[1]-i[0]||i[0],o=n[1]-n[0]||n[0],s=50,l=new Uint8Array(s*s),f=0;f<e.count();f++){var h=e.get(t,f),u=e.get(r,f),d=Math.floor((h-i[0])/a*(s-1)),c=Math.floor((u-n[0])/o*(s-1)),m=c*s+d;l[m]=l[m]||1}for(var p=0,f=0;f<l.length;f++)l[f]&&p++;return p/l.length}var bh=ae.vec3,Xm=Ee.dataStack.isDimensionStacked;function jm(e,t){var r=e.getData(),i=e.get("minHeight")||0,n=e.get("barSize"),a=["lng","lat","alt"].map(function(f){return e.coordDimToDataDim(f)[0]});if(n==null){var o=t.radius*Math.PI,s=na(r,a[0],a[1]);n=[o/Math.sqrt(r.count()/s),o/Math.sqrt(r.count()/s)]}else N.isArray(n)||(n=[n,n]);var l=To(r,a);r.each(a,function(f,h,u,d){var c=r.get(l.dimension,d),m=l.isStacked?c-u:t.altitudeAxis.scale.getExtent()[0],p=Math.max(t.altitudeAxis.dataToCoord(u),i),v=t.dataToPoint([f,h,m]),g=t.dataToPoint([f,h,c]),y=bh.sub([],g,v);bh.normalize(y,y);var x=[n[0],p,n[1]];r.setItemLayout(d,[v,y,x])}),r.setLayout("orient",R.UP.array)}function Zm(e,t){var r=e.getData(),i=e.get("barSize"),n=e.get("minHeight")||0,a=["lng","lat","alt"].map(function(h){return e.coordDimToDataDim(h)[0]});if(i==null){var o=Math.min(t.size[0],t.size[2]),s=na(r,a[0],a[1]);i=[o/Math.sqrt(r.count()/s),o/Math.sqrt(r.count()/s)]}else N.isArray(i)||(i=[i,i]);var l=[0,1,0],f=To(r,a);r.each(a,function(h,u,d,c){var m=r.get(f.dimension,c),p=f.isStacked?m-d:t.altitudeAxis.scale.getExtent()[0],v=Math.max(t.altitudeAxis.dataToCoord(d),n),g=t.dataToPoint([h,u,p]),y=[i[0],v,i[1]];r.setItemLayout(c,[g,l,y])}),r.setLayout("orient",[1,0,0])}function Ym(e,t){var r=e.getData(),i=e.coordDimToDataDim("lng")[0],n=e.coordDimToDataDim("lat")[0],a=e.coordDimToDataDim("alt")[0],o=e.get("barSize"),s=e.get("minHeight")||0;if(o==null){var l=r.getDataExtent(i),f=r.getDataExtent(n),h=t.dataToPoint([l[0],f[0]]),u=t.dataToPoint([l[1],f[1]]),d=Math.min(Math.abs(h[0]-u[0]),Math.abs(h[1]-u[1]))||1,c=na(r,i,n);o=[d/Math.sqrt(r.count()/c),d/Math.sqrt(r.count()/c)]}else N.isArray(o)||(o=[o,o]),o[0]/=t.getScale()/16,o[1]/=t.getScale()/16;var m=[0,0,1],p=[i,n,a],v=To(r,p);r.each(p,function(g,y,x,_){var S=r.get(v.dimension,_),E=v.isStacked?S-x:0,b=t.dataToPoint([g,y,E]),A=t.dataToPoint([g,y,S]),L=Math.max(A[2]-b[2],s),P=[o[0],L,o[1]];r.setItemLayout(_,[b,m,P])}),r.setLayout("orient",[1,0,0])}function To(e,t){var r=Xm(e,t[2]);return{dimension:r?e.getCalculationInfo("stackResultDimension"):t[2],isStacked:r}}function Eo(e){e.registerLayout(function(t,r){t.eachSeriesByType("bar3D",function(i){var n=i.coordinateSystem,a=n&&n.type;a==="globe"?jm(i,n):a==="cartesian3D"?Ah(i,n):a==="geo3D"?Zm(i,n):(a==="mapbox3D"||a==="maptalks3D")&&Ym(i,n)})})}var So={};So.getFormattedLabel=function(e,t,r,i,n){r=r||"normal";var a=e.getData(i),o=a.getItemModel(t),s=e.getDataParams(t,i);n!=null&&s.value instanceof Array&&(s.value=s.value[n]);var l=o.get(r==="normal"?["label","formatter"]:["emphasis","label","formatter"]);l==null&&(l=o.get(["label","formatter"]));var f;return typeof l=="function"?(s.status=r,f=l(s)):typeof l=="string"&&(f=_t.formatTpl(l,s)),f};So.normalizeToArray=function(e){return e instanceof Array?e:e==null?[]:[e]};var Ft=So;function qm(e,t){var r=[];return N.each(e.dimensions,function(i){var n=e.getDimensionInfo(i),a=n.otherDims,o=a[t];o!=null&&o!==!1&&(r[o]=n.name)}),r}function Qt(e,t,r){function i(u){var d=!0,c=[],m=qm(n,"tooltip");m.length?N.each(m,function(v){p(n.get(v,t),v)}):N.each(u,p);function p(v,g){var y=n.getDimensionInfo(g);if(!(!y||y.otherDims.tooltip===!1)){var x=y.type,_=(d?"- "+(y.tooltipName||y.name)+": ":"")+(x==="ordinal"?v+"":x==="time"?r?"":_t.formatTime("yyyy/MM/dd hh:mm:ss",v):_t.addCommas(v));_&&c.push(_t.encodeHTML(_))}}return(d?"<br/>":"")+c.join(d?"<br/>":", ")}var n=e.getData(),a=e.getRawValue(t),o=N.isArray(a)?i(a):_t.encodeHTML(_t.addCommas(a)),s=n.getName(t),l=Te(n,t);N.isObject(l)&&l.colorStops&&(l=(l.colorStops[0]||{}).color),l=l||"transparent";var f=_t.getTooltipMarker(l),h=e.name;return h==="\0-"&&(h=""),h=h?_t.encodeHTML(h)+(r?": ":"<br/>"):"",r?f+h+o:h+f+(s?_t.encodeHTML(s)+": "+o:o)}function br(e,t,r){r=r||e.getSource();var i=t||rn(e.get("coordinateSystem"))||["x","y","z"],n=Ee.createDimensions(r,{dimensionsDefine:r.dimensionsDefine||e.get("dimensions"),encodeDefine:r.encodeDefine||e.get("encode"),coordDimensions:i.map(function(s){var l=e.getReferringComponents(s+"Axis3D").models[0];return{type:l&&l.get("type")==="category"?"ordinal":"float",name:s}})});e.get("coordinateSystem")==="cartesian3D"&&n.forEach(function(s){if(i.indexOf(s.coordDim)>=0){var l=e.getReferringComponents(s.coordDim+"Axis3D").models[0];l&&l.get("type")==="category"&&(s.ordinalMeta=l.getOrdinalMeta())}});var a=Ee.dataStack.enableDataStack(e,n,{byIndex:!0,stackedCoordDimension:"z"}),o=new rt(n,e);return o.setCalculationInfo(a),o.initData(r),o}var Lh=ke.extend({type:"series.bar3D",dependencies:["globe"],visualStyleAccessPathvisu:"itemStyle",getInitialData:function(e,t){return br(this)},getFormattedLabel:function(e,t,r,i){var n=Ft.getFormattedLabel(this,e,t,r,i);return n==null&&(n=this.getData().get("z",e)),n},formatTooltip:function(e){return Qt(this,e)},defaultOption:{coordinateSystem:"cartesian3D",globeIndex:0,grid3DIndex:0,zlevel:-10,bevelSize:0,bevelSmoothness:2,onGridPlane:"xy",shading:"color",minHeight:0,itemStyle:{opacity:1},label:{show:!1,distance:2,textStyle:{fontSize:14,color:"#000",backgroundColor:"rgba(255,255,255,0.7)",padding:3,borderRadius:3}},emphasis:{label:{show:!0}},animationDurationUpdate:500}});N.merge(Lh.prototype,Ot);var Dh=Lh;var ze=ae.vec3,Km=ae.mat3,wo=ee.extend(function(){return{attributes:{position:new ee.Attribute("position","float",3,"POSITION"),normal:new ee.Attribute("normal","float",3,"NORMAL"),color:new ee.Attribute("color","float",4,"COLOR"),prevPosition:new ee.Attribute("prevPosition","float",3),prevNormal:new ee.Attribute("prevNormal","float",3)},dynamic:!0,enableNormal:!1,bevelSize:1,bevelSegments:0,_dataIndices:null,_vertexOffset:0,_triangleOffset:0}},{resetOffset:function(){this._vertexOffset=0,this._triangleOffset=0},setBarCount:function(e){var t=this.enableNormal,r=this.getBarVertexCount()*e,i=this.getBarTriangleCount()*e;this.vertexCount!==r&&(this.attributes.position.init(r),t?this.attributes.normal.init(r):this.attributes.normal.value=null,this.attributes.color.init(r)),this.triangleCount!==i&&(this.indices=r>65535?new Uint32Array(i*3):new Uint16Array(i*3),this._dataIndices=new Uint32Array(r))},getBarVertexCount:function(){var e=this.bevelSize>0?this.bevelSegments:0;return e>0?this._getBevelBarVertexCount(e):this.enableNormal?24:8},getBarTriangleCount:function(){var e=this.bevelSize>0?this.bevelSegments:0;return e>0?this._getBevelBarTriangleCount(e):12},_getBevelBarVertexCount:function(e){return(e+1)*4*(e+1)*2},_getBevelBarTriangleCount:function(e){var t=e*4+3,r=e*2+1;return(t+1)*r*2+4},setColor:function(e,t){for(var r=this.getBarVertexCount(),i=r*e,n=r*(e+1),a=i;a<n;a++)this.attributes.color.set(a,t);this.dirtyAttribute("color")},getDataIndexOfVertex:function(e){return this._dataIndices?this._dataIndices[e]:null},addBar:(function(){for(var e=ze.create,t=ze.scaleAndAdd,r=e(),i=e(),n=e(),a=e(),o=e(),s=e(),l=e(),f=[],h=[],u=0;u<8;u++)f[u]=e();for(var d=[[0,1,5,4],[2,3,7,6],[4,5,6,7],[3,2,1,0],[0,4,7,3],[1,2,6,5]],c=[0,1,2,0,2,3],m=[],u=0;u<d.length;u++)for(var p=d[u],v=0;v<2;v++){for(var g=[],y=0;y<3;y++)g.push(p[c[v*3+y]]);m.push(g)}return function(x,_,S,E,b,A){var L=this._vertexOffset;if(this.bevelSize>0&&this.bevelSegments>0)this._addBevelBar(x,_,S,E,this.bevelSize,this.bevelSegments,b);else{ze.copy(n,_),ze.normalize(n,n),ze.cross(a,S,n),ze.normalize(a,a),ze.cross(i,n,a),ze.normalize(a,a),ze.negate(o,i),ze.negate(s,n),ze.negate(l,a),t(f[0],x,i,E[0]/2),t(f[0],f[0],a,E[2]/2),t(f[1],x,i,E[0]/2),t(f[1],f[1],l,E[2]/2),t(f[2],x,o,E[0]/2),t(f[2],f[2],l,E[2]/2),t(f[3],x,o,E[0]/2),t(f[3],f[3],a,E[2]/2),t(r,x,n,E[1]),t(f[4],r,i,E[0]/2),t(f[4],f[4],a,E[2]/2),t(f[5],r,i,E[0]/2),t(f[5],f[5],l,E[2]/2),t(f[6],r,o,E[0]/2),t(f[6],f[6],l,E[2]/2),t(f[7],r,o,E[0]/2),t(f[7],f[7],a,E[2]/2);var P=this.attributes;if(this.enableNormal){h[0]=i,h[1]=o,h[2]=n,h[3]=s,h[4]=a,h[5]=l;for(var C=this._vertexOffset,I=0;I<d.length;I++){for(var B=this._triangleOffset*3,M=0;M<6;M++)this.indices[B++]=C+c[M];C+=4,this._triangleOffset+=2}for(var I=0;I<d.length;I++)for(var G=h[I],M=0;M<4;M++){var k=d[I][M];P.position.set(this._vertexOffset,f[k]),P.normal.set(this._vertexOffset,G),P.color.set(this._vertexOffset++,b)}}else{for(var I=0;I<m.length;I++){for(var B=this._triangleOffset*3,M=0;M<3;M++)this.indices[B+M]=m[I][M]+this._vertexOffset;this._triangleOffset++}for(var I=0;I<f.length;I++)P.position.set(this._vertexOffset,f[I]),P.color.set(this._vertexOffset++,b)}}for(var Y=this._vertexOffset,I=L;I<Y;I++)this._dataIndices[I]=A}})(),_addBevelBar:(function(){var e=ze.create(),t=ze.create(),r=ze.create(),i=Km.create(),n=[],a=[1,-1,-1,1],o=[1,1,-1,-1],s=[2,0];return function(l,f,h,u,d,c,m){ze.copy(t,f),ze.normalize(t,t),ze.cross(r,h,t),ze.normalize(r,r),ze.cross(e,t,r),ze.normalize(r,r),i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=t[0],i[4]=t[1],i[5]=t[2],i[6]=r[0],i[7]=r[1],i[8]=r[2],d=Math.min(u[0],u[2])/2*d;for(var p=0;p<3;p++)n[p]=Math.max(u[p]-d*2,0);for(var v=(u[0]-n[0])/2,g=(u[1]-n[1])/2,y=(u[2]-n[2])/2,x=[],_=[],S=this._vertexOffset,E=[],p=0;p<2;p++){E[p]=E[p]=[];for(var b=0;b<=c;b++)for(var A=0;A<4;A++){(b===0&&p===0||p===1&&b===c)&&E[p].push(S);for(var L=0;L<=c;L++){var P=L/c*Math.PI/2+Math.PI/2*A,C=b/c*Math.PI/2+Math.PI/2*p;_[0]=v*Math.cos(P)*Math.sin(C),_[1]=g*Math.cos(C),_[2]=y*Math.sin(P)*Math.sin(C),x[0]=_[0]+a[A]*n[0]/2,x[1]=_[1]+g+s[p]*n[1]/2,x[2]=_[2]+o[A]*n[2]/2,Math.abs(v-g)<1e-6&&Math.abs(g-y)<1e-6||(_[0]/=v*v,_[1]/=g*g,_[2]/=y*y),ze.normalize(_,_),ze.transformMat3(x,x,i),ze.transformMat3(_,_,i),ze.add(x,x,l),this.attributes.position.set(S,x),this.enableNormal&&this.attributes.normal.set(S,_),this.attributes.color.set(S,m),S++}}}for(var I=c*4+3,B=c*2+1,M=I+1,A=0;A<B;A++)for(var p=0;p<=I;p++){var G=A*M+p+this._vertexOffset,k=A*M+(p+1)%M+this._vertexOffset,Y=(A+1)*M+(p+1)%M+this._vertexOffset,U=(A+1)*M+p+this._vertexOffset;this.setTriangleIndices(this._triangleOffset++,[Y,G,k]),this.setTriangleIndices(this._triangleOffset++,[Y,U,G])}this.setTriangleIndices(this._triangleOffset++,[E[0][0],E[0][2],E[0][1]]),this.setTriangleIndices(this._triangleOffset++,[E[0][0],E[0][3],E[0][2]]),this.setTriangleIndices(this._triangleOffset++,[E[1][0],E[1][1],E[1][2]]),this.setTriangleIndices(this._triangleOffset++,[E[1][0],E[1][2],E[1][3]]),this._vertexOffset=S}})()});N.defaults(wo.prototype,qt);N.defaults(wo.prototype,_i);var Ch=wo;var Qm=ae.vec3,Mh=We.extend({type:"bar3D",__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node,this._api=t,this._labelsBuilder=new xi(256,256,t);var r=this;this._labelsBuilder.getLabelPosition=function(i,n,a){if(r._data){var o=r._data.getItemLayout(i),s=o[0],l=o[1],f=o[2][1];return Qm.scaleAndAdd([],s,l,a+f)}else return[0,0]},this._labelsBuilder.getMesh().renderOrder=100},render:function(e,t,r){var i=this._prevBarMesh;this._prevBarMesh=this._barMesh,this._barMesh=i,this._barMesh||(this._barMesh=new T.Mesh({geometry:new Ch,shadowDepthMaterial:new T.Material({shader:new T.Shader(T.Shader.source("ecgl.sm.depth.vertex"),T.Shader.source("ecgl.sm.depth.fragment"))}),culling:e.coordinateSystem.type==="cartesian3D",renderOrder:10,renderNormal:!0})),this.groupGL.remove(this._prevBarMesh),this.groupGL.add(this._barMesh),this.groupGL.add(this._labelsBuilder.getMesh());var n=e.coordinateSystem;if(this._doRender(e,r),n&&n.viewGL){n.viewGL.add(this.groupGL);var a=n.viewGL.isLinearSpace()?"define":"undefine";this._barMesh.material[a]("fragment","SRGB_DECODE")}this._data=e.getData(),this._labelsBuilder.updateData(this._data),this._labelsBuilder.updateLabels(),this._updateAnimation(e)},_updateAnimation:function(e){T.updateVertexAnimation([["prevPosition","position"],["prevNormal","normal"]],this._prevBarMesh,this._barMesh,e)},_doRender:function(e,t){var r=e.getData(),i=e.get("shading"),n=i!=="color",a=this,o=this._barMesh,s="ecgl."+i;(!o.material||o.material.shader.name!==s)&&(o.material=T.createMaterial(s,["VERTEX_COLOR"])),T.setMaterialFromModel(i,o.material,e,t),o.geometry.enableNormal=n,o.geometry.resetOffset();var l=e.get("bevelSize"),f=e.get("bevelSmoothness");o.geometry.bevelSegments=f,o.geometry.bevelSize=l;var h=[],u=new Float32Array(r.count()*4),d=0,v=0,c=!1;r.each(function(y){if(r.hasValue(y)){var x=Te(r,y),_=Ae(r,y);_==null&&(_=1),T.parseColor(x,h),h[3]*=_,u[d++]=h[0],u[d++]=h[1],u[d++]=h[2],u[d++]=h[3],h[3]>0&&(v++,h[3]<.99&&(c=!0))}}),o.geometry.setBarCount(v);var m=r.getLayout("orient"),p=this._barIndexOfData=new Int32Array(r.count()),v=0;r.each(function(y){if(!r.hasValue(y)){p[y]=-1;return}var x=r.getItemLayout(y),_=x[0],S=x[1],E=x[2],b=y*4;h[0]=u[b++],h[1]=u[b++],h[2]=u[b++],h[3]=u[b++],h[3]>0&&(a._barMesh.geometry.addBar(_,S,m,E,h,y),p[y]=v++)}),o.geometry.dirty(),o.geometry.updateBoundingBox();var g=o.material;g.transparent=c,g.depthMask=!c,o.geometry.sortTriangles=c,this._initHandler(e,t)},_initHandler:function(e,t){var r=e.getData(),i=this._barMesh,n=e.coordinateSystem.type==="cartesian3D";i.seriesIndex=e.seriesIndex;var a=-1;i.off("mousemove"),i.off("mouseout"),i.on("mousemove",function(o){var s=i.geometry.getDataIndexOfVertex(o.triangle[0]);s!==a&&(this._downplay(a),this._highlight(s),this._labelsBuilder.updateLabels([s]),n&&t.dispatchAction({type:"grid3DShowAxisPointer",value:[r.get("x",s),r.get("y",s),r.get("z",s,!0)]})),a=s,i.dataIndex=s},this),i.on("mouseout",function(o){this._downplay(a),this._labelsBuilder.updateLabels(),a=-1,i.dataIndex=-1,n&&t.dispatchAction({type:"grid3DHideAxisPointer"})},this)},_highlight:function(e){var t=this._data;if(t){var r=this._barIndexOfData[e];if(!(r<0)){var i=t.getItemModel(e),n=i.getModel("emphasis.itemStyle"),a=n.get("color"),o=n.get("opacity");if(a==null){var s=Te(t,e);a=Xt.lift(s,-.4)}o==null&&(o=Ae(t,e));var l=T.parseColor(a);l[3]*=o,this._barMesh.geometry.setColor(r,l),this._api.getZr().refresh()}}},_downplay:function(e){var t=this._data;if(t){var r=this._barIndexOfData[e];if(!(r<0)){var i=Te(t,e),n=Ae(t,e),a=T.parseColor(i);a[3]*=n,this._barMesh.geometry.setColor(r,a),this._api.getZr().refresh()}}},highlight:function(e,t,r,i){this._toggleStatus("highlight",e,t,r,i)},downplay:function(e,t,r,i){this._toggleStatus("downplay",e,t,r,i)},_toggleStatus:function(e,t,r,i,n){var a=t.getData(),o=Z.queryDataIndex(a,n),s=this;o!=null?N.each(Ft.normalizeToArray(o),function(l){e==="highlight"?this._highlight(l):this._downplay(l)},this):a.each(function(l){e==="highlight"?s._highlight(l):s._downplay(l)})},remove:function(){this.groupGL.removeAll()},dispose:function(){this._labelsBuilder.dispose(),this.groupGL.removeAll()}});function Ph(e){e.registerChartView(Mh),e.registerSeriesModel(Dh),Eo(e),e.registerProcessor(function(t,r){t.eachSeriesByType("bar3d",function(i){var n=i.getData();n.filterSelf(function(a){return n.hasValue(a)})})})}de(Ph);var Jm=ke.extend({type:"series.line3D",dependencies:["grid3D"],visualStyleAccessPath:"lineStyle",visualDrawType:"stroke",getInitialData:function(e,t){return br(this)},formatTooltip:function(e){return Qt(this,e)},defaultOption:{coordinateSystem:"cartesian3D",zlevel:-10,grid3DIndex:0,lineStyle:{width:2},animationDurationUpdate:500}}),Nh=Jm;var $m=ae.vec3;T.Shader.import(Tr);var Rh=We.extend({type:"line3D",__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node,this._api=t},render:function(e,t,r){var i=this._prevLine3DMesh;this._prevLine3DMesh=this._line3DMesh,this._line3DMesh=i,this._line3DMesh||(this._line3DMesh=new T.Mesh({geometry:new Tt({useNativeLine:!1,sortTriangles:!0}),material:new T.Material({shader:T.createShader("ecgl.meshLines3D")}),renderOrder:10}),this._line3DMesh.geometry.pick=this._pick.bind(this)),this.groupGL.remove(this._prevLine3DMesh),this.groupGL.add(this._line3DMesh);var n=e.coordinateSystem;if(n&&n.viewGL){n.viewGL.add(this.groupGL);var a=n.viewGL.isLinearSpace()?"define":"undefine";this._line3DMesh.material[a]("fragment","SRGB_DECODE")}this._doRender(e,r),this._data=e.getData(),this._camera=n.viewGL.camera,this.updateCamera(),this._updateAnimation(e)},updateCamera:function(){this._updateNDCPosition()},_doRender:function(e,t){var r=e.getData(),i=this._line3DMesh;i.geometry.resetOffset();var n=r.getLayout("points"),a=[],o=new Float32Array(n.length/3*4),s=0,l=!1;r.each(function(u){var d=Te(r,u),c=Ae(r,u);c==null&&(c=1),T.parseColor(d,a),a[3]*=c,o[s++]=a[0],o[s++]=a[1],o[s++]=a[2],o[s++]=a[3],a[3]<.99&&(l=!0)}),i.geometry.setVertexCount(i.geometry.getPolylineVertexCount(n)),i.geometry.setTriangleCount(i.geometry.getPolylineTriangleCount(n)),i.geometry.addPolyline(n,o,Z.firstNotNull(e.get("lineStyle.width"),1)),i.geometry.dirty(),i.geometry.updateBoundingBox();var f=i.material;f.transparent=l,f.depthMask=!l;var h=e.getModel("debug.wireframe");h.get("show")?(i.geometry.createAttribute("barycentric","float",3),i.geometry.generateBarycentric(),i.material.set("both","WIREFRAME_TRIANGLE"),i.material.set("wireframeLineColor",T.parseColor(h.get("lineStyle.color")||"rgba(0,0,0,0.5)")),i.material.set("wireframeLineWidth",Z.firstNotNull(h.get("lineStyle.width"),1))):i.material.set("both","WIREFRAME_TRIANGLE"),this._points=n,this._initHandler(e,t)},_updateAnimation:function(e){T.updateVertexAnimation([["prevPosition","position"],["prevPositionPrev","positionPrev"],["prevPositionNext","positionNext"]],this._prevLine3DMesh,this._line3DMesh,e)},_initHandler:function(e,t){var r=e.getData(),i=e.coordinateSystem,n=this._line3DMesh,a=-1;n.seriesIndex=e.seriesIndex,n.off("mousemove"),n.off("mouseout"),n.on("mousemove",function(o){var s=i.pointToData(o.point.array),l=r.indicesOfNearest("x",s[0])[0];l!==a&&(t.dispatchAction({type:"grid3DShowAxisPointer",value:[r.get("x",l),r.get("y",l),r.get("z",l)]}),n.dataIndex=l),a=l},this),n.on("mouseout",function(o){a=-1,n.dataIndex=-1,t.dispatchAction({type:"grid3DHideAxisPointer"})},this)},_updateNDCPosition:function(){var e=new H,t=this._camera;H.multiply(e,t.projectionMatrix,t.viewMatrix);var r=this._positionNDC,i=this._points,n=i.length/3;(!r||r.length/2!==n)&&(r=this._positionNDC=new Float32Array(n*2));for(var a=[],o=0;o<n;o++){var s=o*3,l=o*2;a[0]=i[s],a[1]=i[s+1],a[2]=i[s+2],a[3]=1,$m.transformMat4(a,a,e.array),r[l]=a[0]/a[3],r[l+1]=a[1]/a[3]}},_pick:function(e,t,r,i,n,a){var o=this._positionNDC,s=this._data.hostModel,l=s.get("lineStyle.width"),f=-1,h=r.viewport.width,u=r.viewport.height,d=h*.5,c=u*.5;e=(e+1)*d,t=(t+1)*c;for(var m=1;m<o.length/2;m++){var p=(o[(m-1)*2]+1)*d,v=(o[(m-1)*2+1]+1)*c,g=(o[m*2]+1)*d,y=(o[m*2+1]+1)*c;if(Vo(p,v,g,y,l,e,t)){var x=(p-e)*(p-e)+(v-t)*(v-t),_=(g-e)*(g-e)+(y-t)*(y-t);f=x<_?m-1:m}}if(f>=0){var S=f*3,E=new R(this._points[S],this._points[S+1],this._points[S+2]);a.push({dataIndex:f,point:E,pointWorld:E.clone(),target:this._line3DMesh,distance:this._camera.getWorldPosition().dist(E)})}},remove:function(){this.groupGL.removeAll()},dispose:function(){this.groupGL.removeAll()}});function Ih(e){e.registerChartView(Rh),e.registerSeriesModel(Nh),e.registerLayout(function(t,r){t.eachSeriesByType("line3D",function(i){var n=i.getData(),a=i.coordinateSystem;if(a){if(a.type!=="cartesian3D")return;var o=new Float32Array(n.count()*3),s=[],l=[],f=a.dimensions,h=f.map(function(u){return i.coordDimToDataDim(u)[0]});a&&n.each(h,function(u,d,c,m){s[0]=u,s[1]=d,s[2]=c,a.dataToPoint(s,l),o[m*3]=l[0],o[m*3+1]=l[1],o[m*3+2]=l[2]}),n.setLayout("points",o)}})})}de(Ih);var Oh=ke.extend({type:"series.scatter3D",dependencies:["globe","grid3D","geo3D"],visualStyleAccessPath:"itemStyle",hasSymbolVisual:!0,getInitialData:function(e,t){return br(this)},getFormattedLabel:function(e,t,r,i){var n=Ft.getFormattedLabel(this,e,t,r,i);if(n==null){var a=this.getData(),o=a.dimensions[a.dimensions.length-1];n=a.get(o,e)}return n},formatTooltip:function(e){return Qt(this,e)},defaultOption:{coordinateSystem:"cartesian3D",zlevel:-10,progressive:1e5,progressiveThreshold:1e5,grid3DIndex:0,globeIndex:0,symbol:"circle",symbolSize:10,blendMode:"source-over",label:{show:!1,position:"right",distance:5,textStyle:{fontSize:14,color:"#000",backgroundColor:"rgba(255,255,255,0.7)",padding:3,borderRadius:3}},itemStyle:{opacity:.8},emphasis:{label:{show:!0}},animationDurationUpdate:500}});function Ao(e,i,r){var i=i||document.createElement("canvas");i.width=e,i.height=e;var n=i.getContext("2d");return r&&r(n),i}function ep(e,t,r,i){N.isArray(t)||(t=[t,t]);var n=bo.getMarginByStyle(r,i),a=t[0]+n.left+n.right,o=t[1]+n.top+n.bottom,s=Ee.createSymbol(e,0,0,t[0],t[1]),l=Math.max(a,o);s.x=n.left,s.y=n.top,a>o?s.y+=(l-o)/2:s.x+=(l-a)/2;var f=s.getBoundingRect();return s.x-=f.x,s.y-=f.y,s.setStyle(r),s.update(),s.__size=l,s}function tp(e,t,r){var i=t.width,n=t.height,a=e.canvas.width,o=e.canvas.height,s=i/a,l=n/o;function f(g){return g<128?1:-1}function h(g,y){var x=1/0;g=Math.floor(g*s),y=Math.floor(y*l);for(var _=y*i+g,S=t.data[_*4],E=f(S),b=Math.max(y-r,0);b<Math.min(y+r,n);b++)for(var A=Math.max(g-r,0);A<Math.min(g+r,i);A++){var _=b*i+A,L=t.data[_*4],P=f(L),C=A-g,I=b-y;if(E!==P){var B=C*C+I*I;B<x&&(x=B)}}return E*Math.sqrt(x)}for(var u=e.createImageData(a,o),d=0;d<o;d++)for(var c=0;c<a;c++){var m=h(c,d),p=m/r*.5+.5,v=(d*a+c)*4;u.data[v++]=(1-p)*255,u.data[v++]=(1-p)*255,u.data[v++]=(1-p)*255,u.data[v++]=255}return u}var bo={getMarginByStyle:function(e){var t=e.minMargin||0,r=0;e.stroke&&e.stroke!=="none"&&(r=e.lineWidth==null?1:e.lineWidth);var i=e.shadowBlur||0,n=e.shadowOffsetX||0,a=e.shadowOffsetY||0,o={};return o.left=Math.max(r/2,-n+i,t),o.right=Math.max(r/2,n+i,t),o.top=Math.max(r/2,-a+i,t),o.bottom=Math.max(r/2,a+i,t),o},createSymbolSprite:function(e,t,r,i){var n=ep(e,t,r),a=bo.getMarginByStyle(r);return{image:Ao(n.__size,i,function(o){tn(o,n)}),margin:a}},createSDFFromCanvas:function(e,t,r,i){return Ao(t,i,function(n){var a=e.getContext("2d"),o=a.getImageData(0,0,e.width,e.height);n.putImageData(tp(n,o,r),0,0)})},createSimpleSprite:function(e,t){return Ao(e,t,function(r){var i=e/2;r.beginPath(),r.arc(i,i,60,0,Math.PI*2,!1),r.closePath();var n=r.createRadialGradient(i,i,0,i,i,i);n.addColorStop(0,"rgba(255, 255, 255, 1)"),n.addColorStop(.5,"rgba(255, 255, 255, 0.5)"),n.addColorStop(1,"rgba(255, 255, 255, 0)"),r.fillStyle=n,r.fill()})}},Lo=bo;var Bh=ae.vec3,Fh={needsSortVertices:function(){return this.sortVertices},needsSortVerticesProgressively:function(){return this.needsSortVertices()&&this.vertexCount>=2e4},doSortVertices:function(e,t){var r=this.indices,i=Bh.create();if(!r){r=this.indices=this.vertexCount>65535?new Uint32Array(this.vertexCount):new Uint16Array(this.vertexCount);for(var n=0;n<r.length;n++)r[n]=n}if(t===0){var a=this.attributes.position,e=e.array,o=0;(!this._zList||this._zList.length!==this.vertexCount)&&(this._zList=new Float32Array(this.vertexCount));for(var s,n=0;n<this.vertexCount;n++){a.get(n,i);var l=Bh.sqrDist(i,e);isNaN(l)&&(l=1e7,o++),n===0?(s=l,l=0):l=l-s,this._zList[n]=l}this._noneCount=o}if(this.vertexCount<2e4)t===0&&this._simpleSort(this._noneCount/this.vertexCount>.05);else for(var n=0;n<3;n++)this._progressiveQuickSort(t*3+n);this.dirtyIndices()},_simpleSort:function(e){var t=this._zList,r=this.indices;function i(n,a){return t[a]-t[n]}e?Array.prototype.sort.call(r,i):vi.sort(r,i,0,r.length-1)},_progressiveQuickSort:function(e){var t=this._zList,r=this.indices;this._quickSort=this._quickSort||new vi,this._quickSort.step(r,function(i,n){return t[n]-t[i]},e)}};var Gh=`@export ecgl.sdfSprite.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform float elapsedTime : 0;

attribute vec3 position : POSITION;

#ifdef VERTEX_SIZE
attribute float size;
#else
uniform float u_Size;
#endif

#ifdef VERTEX_COLOR
attribute vec4 a_FillColor: COLOR;
varying vec4 v_Color;
#endif

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
attribute float prevSize;
uniform float percent : 1.0;
#endif


#ifdef POSITIONTEXTURE_ENABLED
uniform sampler2D positionTexture;
#endif

varying float v_Size;

void main()
{

#ifdef POSITIONTEXTURE_ENABLED
 gl_Position = worldViewProjection * vec4(texture2D(positionTexture, position.xy).xy, -10.0, 1.0);
#else

 #ifdef VERTEX_ANIMATION
 vec3 pos = mix(prevPosition, position, percent);
 #else
 vec3 pos = position;
 #endif
 gl_Position = worldViewProjection * vec4(pos, 1.0);
#endif

#ifdef VERTEX_SIZE
#ifdef VERTEX_ANIMATION
 v_Size = mix(prevSize, size, percent);
#else
 v_Size = size;
#endif
#else
 v_Size = u_Size;
#endif

#ifdef VERTEX_COLOR
 v_Color = a_FillColor;
 #endif

 gl_PointSize = v_Size;
}

@end

@export ecgl.sdfSprite.fragment

uniform vec4 color: [1, 1, 1, 1];
uniform vec4 strokeColor: [1, 1, 1, 1];
uniform float smoothing: 0.07;

uniform float lineWidth: 0.0;

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif

varying float v_Size;

uniform sampler2D sprite;

@import clay.util.srgb

void main()
{
 gl_FragColor = color;

 vec4 _strokeColor = strokeColor;

#ifdef VERTEX_COLOR
 gl_FragColor *= v_Color;
 #endif

#ifdef SPRITE_ENABLED
 float d = texture2D(sprite, gl_PointCoord).r;
 gl_FragColor.a *= smoothstep(0.5 - smoothing, 0.5 + smoothing, d);

 if (lineWidth > 0.0) {
 float sLineWidth = lineWidth / 2.0;

 float outlineMaxValue0 = 0.5 + sLineWidth;
 float outlineMaxValue1 = 0.5 + sLineWidth + smoothing;
 float outlineMinValue0 = 0.5 - sLineWidth - smoothing;
 float outlineMinValue1 = 0.5 - sLineWidth;

 if (d <= outlineMaxValue1 && d >= outlineMinValue0) {
 float a = _strokeColor.a;
 if (d <= outlineMinValue1) {
 a = a * smoothstep(outlineMinValue0, outlineMinValue1, d);
 }
 else {
 a = a * smoothstep(outlineMaxValue1, outlineMaxValue0, d);
 }
 gl_FragColor.rgb = mix(gl_FragColor.rgb * gl_FragColor.a, _strokeColor.rgb, a);
 gl_FragColor.a = gl_FragColor.a * (1.0 - a) + a;
 }
 }
#endif

#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(gl_FragColor);
#endif
}
@end`;var Do=ae.vec4;T.Shader.import(Gh);var rp=T.Mesh.extend(function(){var e=new T.Geometry({dynamic:!0,attributes:{color:new T.Geometry.Attribute("color","float",4,"COLOR"),position:new T.Geometry.Attribute("position","float",3,"POSITION"),size:new T.Geometry.Attribute("size","float",1),prevPosition:new T.Geometry.Attribute("prevPosition","float",3),prevSize:new T.Geometry.Attribute("prevSize","float",1)}});Object.assign(e,Fh);var t=new T.Material({shader:T.createShader("ecgl.sdfSprite"),transparent:!0,depthMask:!1});t.enableTexture("sprite"),t.define("both","VERTEX_COLOR"),t.define("both","VERTEX_SIZE");var r=new T.Texture2D({image:document.createElement("canvas"),flipY:!1});return t.set("sprite",r),e.pick=this._pick.bind(this),{geometry:e,material:t,mode:T.Mesh.POINTS,sizeScale:1}},{_pick:function(e,t,r,i,n,a){var o=this._positionNDC;if(o)for(var s=r.viewport,l=2/s.width,f=2/s.height,h=this.geometry.vertexCount-1;h>=0;h--){var u;this.geometry.indices?u=this.geometry.indices[h]:u=h;var d=o[u*2],c=o[u*2+1],m=this.geometry.attributes.size.get(u)/this.sizeScale,p=m/2;if(e>d-p*l&&e<d+p*l&&t>c-p*f&&t<c+p*f){var v=new T.Vector3,g=new T.Vector3;this.geometry.attributes.position.get(u,v.array),T.Vector3.transformMat4(g,v,this.worldTransform),a.push({vertexIndex:u,point:v,pointWorld:g,target:this,distance:g.distance(i.getWorldPosition())})}}},updateNDCPosition:function(e,t,r){var i=this._positionNDC,n=this.geometry;(!i||i.length/2!==n.vertexCount)&&(i=this._positionNDC=new Float32Array(n.vertexCount*2));for(var a=Do.create(),o=0;o<n.vertexCount;o++)n.attributes.position.get(o,a),a[3]=1,Do.transformMat4(a,a,e.array),Do.scale(a,a,1/a[3]),i[o*2]=a[0],i[o*2+1]=a[1]}}),Uh=rp;var zh=20,Vh=-10;function ip(e,t){return e&&t&&e[0]===t[0]&&e[1]===t[1]}function Co(e,t){this.rootNode=new T.Node,this.is2D=e,this._labelsBuilder=new xi(256,256,t),this._labelsBuilder.getMesh().renderOrder=100,this.rootNode.add(this._labelsBuilder.getMesh()),this._api=t,this._spriteImageCanvas=document.createElement("canvas"),this._startDataIndex=0,this._endDataIndex=0,this._sizeScale=1}Co.prototype={constructor:Co,highlightOnMouseover:!0,update:function(e,t,r,i,n){var a=this._prevMesh;this._prevMesh=this._mesh,this._mesh=a;var o=e.getData();if(i==null&&(i=0),n==null&&(n=o.count()),this._startDataIndex=i,this._endDataIndex=n-1,!this._mesh){var s=this._prevMesh&&this._prevMesh.material;this._mesh=new Uh({renderOrder:10,frustumCulling:!1}),s&&(this._mesh.material=s)}var s=this._mesh.material,l=this._mesh.geometry,f=l.attributes;this.rootNode.remove(this._prevMesh),this.rootNode.add(this._mesh),this._setPositionTextureToMesh(this._mesh,this._positionTexture);var h=this._getSymbolInfo(e,i,n),u=r.getDevicePixelRatio(),d=e.getModel("itemStyle").getItemStyle(),c=e.get("large"),m=1;h.maxSize>2?(m=this._updateSymbolSprite(e,d,h,u),s.enableTexture("sprite")):s.disableTexture("sprite"),f.position.init(n-i);var p=[];if(c){s.undefine("VERTEX_SIZE"),s.undefine("VERTEX_COLOR");var v=Wf(o),g=Xf(o);T.parseColor(v,p),p[3]*=g,s.set({color:p,u_Size:h.maxSize*this._sizeScale})}else s.set({color:[1,1,1,1]}),s.define("VERTEX_SIZE"),s.define("VERTEX_COLOR"),f.size.init(n-i),f.color.init(n-i),this._originalOpacity=new Float32Array(n-i);for(var y=o.getLayout("points"),x=f.position.value,_=!1,S=0;S<n-i;S++){var E=S*3,b=S*2;if(this.is2D?(x[E]=y[b],x[E+1]=y[b+1],x[E+2]=Vh):(x[E]=y[E],x[E+1]=y[E+1],x[E+2]=y[E+2]),!c){var v=Te(o,S),g=Ae(o,S);T.parseColor(v,p),p[3]*=g,f.color.set(S,p),p[3]<.99&&(_=!0);var A=o.getItemVisual(S,"symbolSize");A=A instanceof Array?Math.max(A[0],A[1]):A,isNaN(A)&&(A=0),f.size.value[S]=A*m*this._sizeScale,this._originalOpacity[S]=p[3]}}this._mesh.sizeScale=m,l.updateBoundingBox(),l.dirty(),this._updateMaterial(e,d);var L=e.coordinateSystem;if(L&&L.viewGL){var P=L.viewGL.isLinearSpace()?"define":"undefine";s[P]("fragment","SRGB_DECODE")}c||this._updateLabelBuilder(e,i,n),this._updateHandler(e,t,r),this._updateAnimation(e),this._api=r},getPointsMesh:function(){return this._mesh},updateLabels:function(e){this._labelsBuilder.updateLabels(e)},hideLabels:function(){this.rootNode.remove(this._labelsBuilder.getMesh())},showLabels:function(){this.rootNode.add(this._labelsBuilder.getMesh())},dispose:function(){this._labelsBuilder.dispose()},_updateSymbolSprite:function(e,t,r,i){r.maxSize=Math.min(r.maxSize*2,200);var n=[];return r.aspect>1?(n[0]=r.maxSize,n[1]=r.maxSize/r.aspect):(n[1]=r.maxSize,n[0]=r.maxSize*r.aspect),n[0]=n[0]||1,n[1]=n[1]||1,(this._symbolType!==r.type||!ip(this._symbolSize,n)||this._lineWidth!==t.lineWidth)&&(Lo.createSymbolSprite(r.type,n,{fill:"#fff",lineWidth:t.lineWidth,stroke:"transparent",shadowColor:"transparent",minMargin:Math.min(n[0]/2,10)},this._spriteImageCanvas),Lo.createSDFFromCanvas(this._spriteImageCanvas,Math.min(this._spriteImageCanvas.width,32),zh,this._mesh.material.get("sprite").image),this._symbolType=r.type,this._symbolSize=n,this._lineWidth=t.lineWidth),this._spriteImageCanvas.width/r.maxSize*i},_updateMaterial:function(e,t){var r=e.get("blendMode")==="lighter"?T.additiveBlend:null,i=this._mesh.material;i.blend=r,i.set("lineWidth",t.lineWidth/zh);var n=T.parseColor(t.stroke);i.set("strokeColor",n),i.transparent=!0,i.depthMask=!1,i.depthTest=!this.is2D,i.sortVertices=!this.is2D},_updateLabelBuilder:function(e,o,r){var i=e.getData(),n=this._mesh.geometry,a=n.attributes.position.value,o=this._startDataIndex,s=this._mesh.sizeScale;this._labelsBuilder.updateData(i,o,r),this._labelsBuilder.getLabelPosition=function(l,f,h){var u=(l-o)*3;return[a[u],a[u+1],a[u+2]]},this._labelsBuilder.getLabelDistance=function(l,f,h){var u=n.attributes.size.get(l-o)/s;return u/2+h},this._labelsBuilder.updateLabels()},_updateAnimation:function(e){T.updateVertexAnimation([["prevPosition","position"],["prevSize","size"]],this._prevMesh,this._mesh,e)},_updateHandler:function(e,t,r){var i=e.getData(),n=this._mesh,a=this,o=-1,s=e.coordinateSystem&&e.coordinateSystem.type==="cartesian3D",l;s&&(l=e.coordinateSystem.model),n.seriesIndex=e.seriesIndex,n.off("mousemove"),n.off("mouseout"),n.on("mousemove",function(f){var h=f.vertexIndex+a._startDataIndex;h!==o&&(this.highlightOnMouseover&&(this.downplay(i,o),this.highlight(i,h),this._labelsBuilder.updateLabels([h])),s&&r.dispatchAction({type:"grid3DShowAxisPointer",value:[i.get(e.coordDimToDataDim("x")[0],h),i.get(e.coordDimToDataDim("y")[0],h),i.get(e.coordDimToDataDim("z")[0],h)],grid3DIndex:l.componentIndex})),n.dataIndex=h,o=h},this),n.on("mouseout",function(f){var h=f.vertexIndex+a._startDataIndex;this.highlightOnMouseover&&(this.downplay(i,h),this._labelsBuilder.updateLabels()),o=-1,n.dataIndex=-1,s&&r.dispatchAction({type:"grid3DHideAxisPointer",grid3DIndex:l.componentIndex})},this)},updateLayout:function(e,t,r){var i=e.getData();if(this._mesh){var n=this._mesh.geometry.attributes.position.value,a=i.getLayout("points");if(this.is2D)for(var o=0;o<a.length/2;o++){var s=o*3,l=o*2;n[s]=a[l],n[s+1]=a[l+1],n[s+2]=Vh}else for(var o=0;o<a.length;o++)n[o]=a[o];this._mesh.geometry.dirty(),r.getZr().refresh()}},updateView:function(e){if(this._mesh){var t=new H;H.mul(t,e.viewMatrix,this._mesh.worldTransform),H.mul(t,e.projectionMatrix,t),this._mesh.updateNDCPosition(t,this.is2D,this._api)}},highlight:function(e,t){if(!(t>this._endDataIndex||t<this._startDataIndex)){var r=e.getItemModel(t),i=r.getModel("emphasis.itemStyle"),n=i.get("color"),a=i.get("opacity");if(n==null){var o=Te(e,t);n=Xt.lift(o,-.4)}a==null&&(a=Ae(e,t));var s=T.parseColor(n);s[3]*=a,this._mesh.geometry.attributes.color.set(t-this._startDataIndex,s),this._mesh.geometry.dirtyAttribute("color"),this._api.getZr().refresh()}},downplay:function(e,t){if(!(t>this._endDataIndex||t<this._startDataIndex)){var r=Te(e,t),i=Ae(e,t),n=T.parseColor(r);n[3]*=i,this._mesh.geometry.attributes.color.set(t-this._startDataIndex,n),this._mesh.geometry.dirtyAttribute("color"),this._api.getZr().refresh()}},fadeOutAll:function(e){if(this._originalOpacity){for(var t=this._mesh.geometry,r=0;r<t.vertexCount;r++){var i=this._originalOpacity[r]*e;t.attributes.color.value[r*4+3]=i}t.dirtyAttribute("color"),this._api.getZr().refresh()}},fadeInAll:function(){this.fadeOutAll(1)},setPositionTexture:function(e){this._mesh&&this._setPositionTextureToMesh(this._mesh,e),this._positionTexture=e},removePositionTexture:function(){this._positionTexture=null,this._mesh&&this._setPositionTextureToMesh(this._mesh,null)},setSizeScale:function(e){if(e!==this._sizeScale){if(this._mesh){var t=this._mesh.material.get("u_Size");this._mesh.material.set("u_Size",t/this._sizeScale*e);var r=this._mesh.geometry.attributes;if(r.size.value)for(var i=0;i<r.size.value.length;i++)r.size.value[i]=r.size.value[i]/this._sizeScale*e}this._sizeScale=e}},_setPositionTextureToMesh:function(e,t){t&&e.material.set("positionTexture",t),e.material[t?"enableTexture":"disableTexture"]("positionTexture")},_getSymbolInfo:function(e,t,r){if(e.get("large")){var i=Z.firstNotNull(e.get("symbolSize"),1),f,a;return i instanceof Array?(f=Math.max(i[0],i[1]),a=i[0]/i[1]):(f=i,a=1),{maxSize:i,type:e.get("symbol"),aspect:a}}for(var n=e.getData(),a,o=!1,s=n.getItemVisual(0,"symbol")||"circle",l=!1,f=0,h=t;h<r;h++){var i=n.getItemVisual(h,"symbolSize"),u=n.getItemVisual(h,"symbol"),d;if(i instanceof Array)d=i[0]/i[1],f=Math.max(Math.max(i[0],i[1]),f);else{if(isNaN(i))continue;d=1,f=Math.max(i,f)}s=u,a=d}return{maxSize:f,type:s,aspect:a}}};var Lr=Co;var Hh=We.extend({type:"scatter3D",hasSymbolVisual:!0,__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node,this._pointsBuilderList=[],this._currentStep=0},render:function(e,t,r){if(this.groupGL.removeAll(),!!e.getData().count()){var i=e.coordinateSystem;if(i&&i.viewGL){i.viewGL.add(this.groupGL),this._camera=i.viewGL.camera;var n=this._pointsBuilderList[0];n||(n=this._pointsBuilderList[0]=new Lr(!1,r)),this._pointsBuilderList.length=1,this.groupGL.add(n.rootNode),n.update(e,t,r),n.updateView(i.viewGL.camera)}}},incrementalPrepareRender:function(e,t,r){var i=e.coordinateSystem;i&&i.viewGL&&(i.viewGL.add(this.groupGL),this._camera=i.viewGL.camera),this.groupGL.removeAll(),this._currentStep=0},incrementalRender:function(e,t,r,i){if(!(e.end<=e.start)){var n=this._pointsBuilderList[this._currentStep];n||(n=new Lr(!1,i),this._pointsBuilderList[this._currentStep]=n),this.groupGL.add(n.rootNode),n.update(t,r,i,e.start,e.end),n.updateView(t.coordinateSystem.viewGL.camera),this._currentStep++}},updateCamera:function(){this._pointsBuilderList.forEach(function(e){e.updateView(this._camera)},this)},highlight:function(e,t,r,i){this._toggleStatus("highlight",e,t,r,i)},downplay:function(e,t,r,i){this._toggleStatus("downplay",e,t,r,i)},_toggleStatus:function(e,t,r,i,n){var a=t.getData(),o=Z.queryDataIndex(a,n),s=e==="highlight";o!=null?N.each(Ft.normalizeToArray(o),function(l){for(var f=0;f<this._pointsBuilderList.length;f++){var h=this._pointsBuilderList[f];s?h.highlight(a,l):h.downplay(a,l)}},this):a.each(function(l){for(var f=0;f<this._pointsBuilderList.length;f++){var h=this._pointsBuilderList[f];s?h.highlight(a,l):h.downplay(a,l)}})},dispose:function(){this._pointsBuilderList.forEach(function(e){e.dispose()}),this.groupGL.removeAll()},remove:function(){this.groupGL.removeAll()}});function kh(e){e.registerChartView(Hh),e.registerSeriesModel(Oh),e.registerLayout({seriesType:"scatter3D",reset:function(t){var r=t.coordinateSystem;if(r){var i=r.dimensions;if(i.length<3)return;var n=i.map(function(s){return t.coordDimToDataDim(s)[0]}),a=[],o=[];return{progress:function(s,l){for(var f=new Float32Array((s.end-s.start)*3),h=s.start;h<s.end;h++){var u=(h-s.start)*3;a[0]=l.get(n[0],h),a[1]=l.get(n[1],h),a[2]=l.get(n[2],h),r.dataToPoint(a,o),f[u]=o[0],f[u+1]=o[1],f[u+2]=o[2]}l.setLayout("points",f)}}}}})}de(kh);var Je=ae.vec3,Wh=ae.vec2,lr=Je.normalize,aa=Je.cross,Xh=Je.sub,Mo=Je.add,Mr=Je.create,Dr=Mr(),Gt=Mr(),Cr=Mr(),Qi=Mr(),jh=[],Zh=[];function np(e,t){Wh.copy(jh,e[0]),Wh.copy(Zh,e[1]);var r=[],i=r[0]=Mr(),n=r[1]=Mr(),a=r[2]=Mr(),o=r[3]=Mr();t.dataToPoint(jh,i),t.dataToPoint(Zh,o),lr(Dr,i),Xh(Gt,o,i),lr(Gt,Gt),aa(Cr,Gt,Dr),lr(Cr,Cr),aa(Gt,Dr,Cr),Mo(n,Dr,Gt),lr(n,n),lr(Dr,o),Xh(Gt,i,o),lr(Gt,Gt),aa(Cr,Gt,Dr),lr(Cr,Cr),aa(Gt,Dr,Cr),Mo(a,Dr,Gt),lr(a,a),Mo(Qi,i,o),lr(Qi,Qi);var s=Je.dot(i,Qi),l=Je.dot(Qi,n),f=(Math.max(Je.len(i),Je.len(o))-s)/l*2;return Je.scaleAndAdd(n,i,n,f),Je.scaleAndAdd(a,o,a,f),r}function ap(e,t,r){var i=[],n=i[0]=Je.create(),a=i[1]=Je.create(),o=i[2]=Je.create(),s=i[3]=Je.create();t.dataToPoint(e[0],n),t.dataToPoint(e[1],s);var l=Je.dist(n,s);return Je.lerp(a,n,s,.3),Je.lerp(o,n,s,.3),Je.scaleAndAdd(a,a,r,Math.min(l*.1,10)),Je.scaleAndAdd(o,o,r,Math.min(l*.1,10)),i}function qh(e,t){for(var r=new Float32Array(e.length*3),i=0,n=[],a=0;a<e.length;a++)t.dataToPoint(e[a],n),r[i++]=n[0],r[i++]=n[1],r[i++]=n[2];return r}function Kh(e){var t=[];return e.each(function(r){var i=e.getItemModel(r),n=i.option instanceof Array?i.option:i.getShallow("coords",!0);t.push(n)}),{coordsList:t}}function op(e,t){var r=e.getData(),i=e.get("polyline");r.setLayout("lineType",i?"polyline":"cubicBezier");var n=Kh(r);r.each(function(a){var o=n.coordsList[a],s=i?qh:np;r.setItemLayout(a,s(o,t))})}function Yh(e,t,r){var i=e.getData(),n=e.get("polyline"),a=Kh(i);i.setLayout("lineType",n?"polyline":"cubicBezier"),i.each(function(o){var s=a.coordsList[o],l=n?qh(s,t):ap(s,t,r);i.setItemLayout(o,l)})}function Po(e,t){e.eachSeriesByType("lines3D",function(r){var i=r.coordinateSystem;i.type==="globe"?op(r,i):i.type==="geo3D"?Yh(r,i,[0,1,0]):(i.type==="mapbox3D"||i.type==="maptalks3D")&&Yh(r,i,[0,0,1])})}var Qh=ke.extend({type:"series.lines3D",dependencies:["globe"],visualStyleAccessPath:"lineStyle",visualDrawType:"stroke",getInitialData:function(e,t){var r=new rt(["value"],this);return r.hasItemOption=!1,r.initData(e.data,[],function(i,n,a,o){if(i instanceof Array)return NaN;r.hasItemOption=!0;var s=i.value;if(s!=null)return s instanceof Array?s[o]:s}),r},defaultOption:{coordinateSystem:"globe",globeIndex:0,geo3DIndex:0,zlevel:-10,polyline:!1,effect:{show:!1,period:4,trailWidth:4,trailLength:.2,spotIntensity:6},silent:!0,blendMode:"source-over",lineStyle:{width:1,opacity:.5}}});var Jh=`@export ecgl.trail2.vertex
attribute vec3 position: POSITION;
attribute vec3 positionPrev;
attribute vec3 positionNext;
attribute float offset;
attribute float dist;
attribute float distAll;
attribute float start;

attribute vec4 a_Color : COLOR;

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform vec4 viewport : VIEWPORT;
uniform float near : NEAR;

uniform float speed : 0;
uniform float trailLength: 0.3;
uniform float time;
uniform float period: 1000;

uniform float spotSize: 1;

varying vec4 v_Color;
varying float v_Percent;
varying float v_SpotPercent;

@import ecgl.common.wireframe.vertexHeader

@import ecgl.lines3D.clipNear

void main()
{
 @import ecgl.lines3D.expandLine

 gl_Position = currProj;

 v_Color = a_Color;

 @import ecgl.common.wireframe.vertexMain

#ifdef CONSTANT_SPEED
 float t = mod((speed * time + start) / distAll, 1. + trailLength) - trailLength;
#else
 float t = mod((time + start) / period, 1. + trailLength) - trailLength;
#endif

 float trailLen = distAll * trailLength;

 v_Percent = (dist - t * distAll) / trailLen;

 v_SpotPercent = spotSize / distAll;

 }
@end


@export ecgl.trail2.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
uniform float spotIntensity: 5;

varying vec4 v_Color;
varying float v_Percent;
varying float v_SpotPercent;

@import ecgl.common.wireframe.fragmentHeader

@import clay.util.srgb

void main()
{
 if (v_Percent > 1.0 || v_Percent < 0.0) {
 discard;
 }

 float fade = v_Percent;

#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color * v_Color);
#else
 gl_FragColor = color * v_Color;
#endif

 @import ecgl.common.wireframe.fragmentMain

 if (v_Percent > (1.0 - v_SpotPercent)) {
 gl_FragColor.rgb *= spotIntensity;
 }

 gl_FragColor.a *= fade;
}

@end`;var $h=ae.vec3;function sp(e){return e>0?1:-1}T.Shader.import(Jh);var eu=T.Mesh.extend(function(){var e=new T.Material({shader:new T.Shader(T.Shader.source("ecgl.trail2.vertex"),T.Shader.source("ecgl.trail2.fragment")),transparent:!0,depthMask:!1}),t=new Tt({dynamic:!0});return t.createAttribute("dist","float",1),t.createAttribute("distAll","float",1),t.createAttribute("start","float",1),{geometry:t,material:e,culling:!1,$ignorePicking:!0}},{updateData:function(e,t,r){var i=e.hostModel,n=this.geometry,a=i.getModel("effect"),o=a.get("trailWidth")*t.getDevicePixelRatio(),s=a.get("trailLength"),l=i.get("effect.constantSpeed"),f=i.get("effect.period")*1e3,h=l!=null;h?this.material.set("speed",l/1e3):this.material.set("period",f),this.material[h?"define":"undefine"]("vertex","CONSTANT_SPEED");var u=i.get("polyline");n.trailLength=s,this.material.set("trailLength",s),n.resetOffset(),["position","positionPrev","positionNext"].forEach(function(b){n.attributes[b].value=r.attributes[b].value});var d=["dist","distAll","start","offset","color"];d.forEach(function(b){n.attributes[b].init(n.vertexCount)}),n.indices=r.indices;var c=[],m=a.get("trailColor"),p=a.get("trailOpacity"),v=m!=null,g=p!=null;this.updateWorldTransform();var y=this.worldTransform.x.len(),x=this.worldTransform.y.len(),_=this.worldTransform.z.len(),S=0,E=0;e.each(function(b){var A=e.getItemLayout(b),L=g?p:Ae(e,b),P=Te(e,b);L==null&&(L=1),c=T.parseColor(v?m:P,c),c[3]*=L;for(var C=u?r.getPolylineVertexCount(A):r.getCubicCurveVertexCount(A[0],A[1],A[2],A[3]),I=0,B=[],M=[],G=S;G<S+C;G++)n.attributes.position.get(G,B),B[0]*=y,B[1]*=x,B[2]*=_,G>S&&(I+=$h.dist(B,M)),n.attributes.dist.set(G,I),$h.copy(M,B);E=Math.max(E,I);for(var k=Math.random()*(h?I:f),G=S;G<S+C;G++)n.attributes.distAll.set(G,I),n.attributes.start.set(G,k),n.attributes.offset.set(G,sp(r.attributes.offset.get(G))*o/2),n.attributes.color.set(G,c);S+=C}),this.material.set("spotSize",E*.1*s),this.material.set("spotIntensity",a.get("spotIntensity")),n.dirty()},setAnimationTime:function(e){this.material.set("time",e)}});T.Shader.import(Tr);function lp(e){return e.radius!=null?e.radius:e.size!=null?Math.max(e.size[0],e.size[1],e.size[2]):100}var tu=We.extend({type:"lines3D",__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node,this._meshLinesMaterial=new T.Material({shader:T.createShader("ecgl.meshLines3D"),transparent:!0,depthMask:!1}),this._linesMesh=new T.Mesh({geometry:new Tt,material:this._meshLinesMaterial,$ignorePicking:!0}),this._trailMesh=new eu},render:function(e,t,r){this.groupGL.add(this._linesMesh);var i=e.coordinateSystem,n=e.getData();if(i&&i.viewGL){var a=i.viewGL;a.add(this.groupGL),this._updateLines(e,t,r);var o=i.viewGL.isLinearSpace()?"define":"undefine";this._linesMesh.material[o]("fragment","SRGB_DECODE"),this._trailMesh.material[o]("fragment","SRGB_DECODE")}var s=this._trailMesh;if(s.stopAnimation(),e.get("effect.show")){this.groupGL.add(s),s.updateData(n,r,this._linesMesh.geometry),s.__time=s.__time||0;var l=3600*1e3;this._curveEffectsAnimator=s.animate("",{loop:!0}).when(l,{__time:l}).during(function(){s.setAnimationTime(s.__time)}).start()}else this.groupGL.remove(s),this._curveEffectsAnimator=null;this._linesMesh.material.blend=this._trailMesh.material.blend=e.get("blendMode")==="lighter"?T.additiveBlend:null},pauseEffect:function(){this._curveEffectsAnimator&&this._curveEffectsAnimator.pause()},resumeEffect:function(){this._curveEffectsAnimator&&this._curveEffectsAnimator.resume()},toggleEffect:function(){var e=this._curveEffectsAnimator;e&&(e.isPaused()?e.resume():e.pause())},_updateLines:function(e,t,r){var i=e.getData(),n=e.coordinateSystem,a=this._linesMesh.geometry,o=e.get("polyline");a.expandLine=!0;var s=lp(n);a.segmentScale=s/20;var l="lineStyle.width".split("."),f=r.getDevicePixelRatio(),h=0;i.each(function(m){var p=i.getItemModel(m),v=p.get(l);v==null&&(v=1),i.setItemVisual(m,"lineWidth",v),h=Math.max(v,h)}),a.useNativeLine=!1;var u=0,d=0;i.each(function(m){var p=i.getItemLayout(m);o?(u+=a.getPolylineVertexCount(p),d+=a.getPolylineTriangleCount(p)):(u+=a.getCubicCurveVertexCount(p[0],p[1],p[2],p[3]),d+=a.getCubicCurveTriangleCount(p[0],p[1],p[2],p[3]))}),a.setVertexCount(u),a.setTriangleCount(d),a.resetOffset();var c=[];i.each(function(m){var p=i.getItemLayout(m),v=Te(i,m),g=Ae(i,m),y=i.getItemVisual(m,"lineWidth")*f;g==null&&(g=1),c=T.parseColor(v,c),c[3]*=g,o?a.addPolyline(p,c,y):a.addCubicCurve(p[0],p[1],p[2],p[3],c,y)}),a.dirty()},remove:function(){this.groupGL.removeAll()},dispose:function(){this.groupGL.removeAll()}});function ru(e){e.registerChartView(tu),e.registerSeriesModel(Qh),e.registerLayout(Po),e.registerAction({type:"lines3DPauseEffect",event:"lines3deffectpaused",update:"series.lines3D:pauseEffect"},function(){}),e.registerAction({type:"lines3DResumeEffect",event:"lines3deffectresumed",update:"series.lines3D:resumeEffect"},function(){}),e.registerAction({type:"lines3DToggleEffect",event:"lines3deffectchanged",update:"series.lines3D:toggleEffect"},function(){})}de(ru);function iu(e,t){for(var r=[],i=0;i<t.length;i++)r.push(e.dataToPoint(t[i]));return r}var nu=ke.extend({type:"series.polygons3D",getRegionModel:function(e){return this.getData().getItemModel(e)},getRegionPolygonCoords:function(e){var t=this.coordinateSystem,r=this.getData().getItemModel(e),i=r.option instanceof Array?r.option:r.getShallow("coords");r.get("multiPolygon")||(i=[i]);for(var n=[],a=0;a<i.length;a++){for(var o=[],s=1;s<i[a].length;s++)o.push(iu(t,i[a][s]));n.push({exterior:iu(t,i[a][0]),interiors:o})}return n},getInitialData:function(e){var t=new rt(["value"],this);return t.hasItemOption=!1,t.initData(e.data,[],function(r,i,n,a){if(r instanceof Array)return NaN;t.hasItemOption=!0;var o=r.value;if(o!=null)return o instanceof Array?o[a]:o}),t},defaultOption:{show:!0,data:null,multiPolygon:!1,progressiveThreshold:1e3,progressive:1e3,zlevel:-10,label:{show:!1,distance:2,textStyle:{fontSize:20,color:"#000",backgroundColor:"rgba(255,255,255,0.7)",padding:3,borderRadius:4}},itemStyle:{color:"#fff",borderWidth:0,borderColor:"#333"},emphasis:{itemStyle:{color:"#639fc0"},label:{show:!0}}}});N.merge(nu.prototype,Ot);var au=nu;var ou=We.extend({type:"polygons3D",__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node,this._geo3DBuilderList=[],this._currentStep=0},render:function(e,t,r){this.groupGL.removeAll();var i=e.coordinateSystem;i&&i.viewGL&&i.viewGL.add(this.groupGL);var n=this._geo3DBuilderList[0];n||(n=new Zr(r),n.extrudeY=i.type!=="mapbox3D"&&i.type!=="maptalks3D",this._geo3DBuilderList[0]=n),this._updateShaderDefines(i,n),n.update(e,t,r),this._geo3DBuilderList.length=1,this.groupGL.add(n.rootNode)},incrementalPrepareRender:function(e,t,r){this.groupGL.removeAll();var i=e.coordinateSystem;i&&i.viewGL&&i.viewGL.add(this.groupGL),this._currentStep=0},incrementalRender:function(e,t,r,i){var n=this._geo3DBuilderList[this._currentStep],a=t.coordinateSystem;n||(n=new Zr(i),n.extrudeY=a.type!=="mapbox3D"&&a.type!=="maptalks3D",this._geo3DBuilderList[this._currentStep]=n),n.update(t,r,i,e.start,e.end),this.groupGL.add(n.rootNode),this._updateShaderDefines(a,n),this._currentStep++},_updateShaderDefines:function(e,t){var r=e.viewGL.isLinearSpace()?"define":"undefine";t.rootNode.traverse(function(i){i.material&&(i.material[r]("fragment","SRGB_DECODE"),(e.type==="mapbox3D"||e.type==="maptalks3D")&&(i.material.define("fragment","NORMAL_UP_AXIS",2),i.material.define("fragment","NORMAL_FRONT_AXIS",1)))})},remove:function(){this.groupGL.removeAll()},dispose:function(){this.groupGL.removeAll(),this._geo3DBuilderList.forEach(function(e){e.dispose()})}});function su(e){e.registerChartView(ou),e.registerSeriesModel(au)}de(su);var lu=ke.extend({type:"series.surface",dependencies:["globe","grid3D","geo3D"],visualStyleAccessPath:"itemStyle",formatTooltip:function(e){return Qt(this,e)},getInitialData:function(e,t){var r=e.data;function i(Y){return!(isNaN(Y.min)||isNaN(Y.max)||isNaN(Y.step))}function n(Y){var U=wt.getPrecisionSafe;return Math.max(U(Y.min),U(Y.max),U(Y.step))+1}if(!r)if(e.parametric){var _=e.parametricEquation||{},S=_.u||{},E=_.v||{};["u","v"].forEach(function(U){i(_[U])}),["x","y","z"].forEach(function(U){_[U]});var b=Math.floor((S.max+S.step-S.min)/S.step),A=Math.floor((E.max+E.step-E.min)/E.step);r=new Float32Array(b*A*5);for(var L=n(S),P=n(E),d=0,c=0;c<A;c++)for(var m=0;m<b;m++){var C=m*S.step+S.min,I=c*E.step+E.min,B=wt.round(Math.min(C,S.max),L),M=wt.round(Math.min(I,E.max),P),p=_.x(B,M),v=_.y(B,M),x=_.z(B,M);r[d++]=p,r[d++]=v,r[d++]=x,r[d++]=B,r[d++]=M}}else{var a=e.equation||{},o=a.x||{},s=a.y||{};if(["x","y"].forEach(function(Y){i(a[Y])}),typeof a.z!="function")return;var l=Math.floor((o.max+o.step-o.min)/o.step),f=Math.floor((s.max+s.step-s.min)/s.step);r=new Float32Array(l*f*3);for(var h=n(o),u=n(s),d=0,c=0;c<f;c++)for(var m=0;m<l;m++){var p=m*o.step+o.min,v=c*s.step+s.min,g=wt.round(Math.min(p,o.max),h),y=wt.round(Math.min(v,s.max),u),x=a.z(g,y);r[d++]=g,r[d++]=y,r[d++]=x}}var G=["x","y","z"];e.parametric&&G.push("u","v");var k=br(this,G,r);return k},defaultOption:{coordinateSystem:"cartesian3D",zlevel:-10,grid3DIndex:0,shading:"lambert",parametric:!1,wireframe:{show:!0,lineStyle:{color:"rgba(0,0,0,0.5)",width:1}},equation:{x:{min:-1,max:1,step:.1},y:{min:-1,max:1,step:.1},z:null},parametricEquation:{u:{min:-1,max:1,step:.1},v:{min:-1,max:1,step:.1},x:null,y:null,z:null},dataShape:null,itemStyle:{},animationDurationUpdate:500}});N.merge(lu.prototype,Ot);var fu=lu;var Kr=ae.vec3;function fp(e){return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])}var hu=We.extend({type:"surface",__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node},render:function(e,t,r){var i=this._prevSurfaceMesh;this._prevSurfaceMesh=this._surfaceMesh,this._surfaceMesh=i,this._surfaceMesh||(this._surfaceMesh=this._createSurfaceMesh()),this.groupGL.remove(this._prevSurfaceMesh),this.groupGL.add(this._surfaceMesh);var n=e.coordinateSystem,a=e.get("shading"),o=e.getData(),s="ecgl."+a;if((!this._surfaceMesh.material||this._surfaceMesh.material.shader.name!==s)&&(this._surfaceMesh.material=T.createMaterial(s,["VERTEX_COLOR","DOUBLE_SIDED"])),T.setMaterialFromModel(a,this._surfaceMesh.material,e,r),n&&n.viewGL){n.viewGL.add(this.groupGL);var l=n.viewGL.isLinearSpace()?"define":"undefine";this._surfaceMesh.material[l]("fragment","SRGB_DECODE")}var f=e.get("parametric"),h=e.get("dataShape");h||(h=this._getDataShape(o,f));var u=e.getModel("wireframe"),d=u.get("lineStyle.width"),c=u.get("show")&&d>0;this._updateSurfaceMesh(this._surfaceMesh,e,h,c);var m=this._surfaceMesh.material;c?(m.define("WIREFRAME_QUAD"),m.set("wireframeLineWidth",d),m.set("wireframeLineColor",T.parseColor(u.get("lineStyle.color")))):m.undefine("WIREFRAME_QUAD"),this._initHandler(e,r),this._updateAnimation(e)},_updateAnimation:function(e){T.updateVertexAnimation([["prevPosition","position"],["prevNormal","normal"]],this._prevSurfaceMesh,this._surfaceMesh,e)},_createSurfaceMesh:function(){var e=new T.Mesh({geometry:new T.Geometry({dynamic:!0,sortTriangles:!0}),shadowDepthMaterial:new T.Material({shader:new T.Shader(T.Shader.source("ecgl.sm.depth.vertex"),T.Shader.source("ecgl.sm.depth.fragment"))}),culling:!1,renderOrder:10,renderNormal:!0});return e.geometry.createAttribute("barycentric","float",4),e.geometry.createAttribute("prevPosition","float",3),e.geometry.createAttribute("prevNormal","float",3),Object.assign(e.geometry,_i),e},_initHandler:function(e,t){var r=e.getData(),i=this._surfaceMesh,n=e.coordinateSystem;function a(s,l){for(var f=1/0,h=-1,u=[],d=0;d<s.length;d++){i.geometry.attributes.position.get(s[d],u);var c=Kr.dist(l.array,u);c<f&&(f=c,h=s[d])}return h}i.seriesIndex=e.seriesIndex;var o=-1;i.off("mousemove"),i.off("mouseout"),i.on("mousemove",function(s){var l=a(s.triangle,s.point);if(l>=0){var f=[];i.geometry.attributes.position.get(l,f);for(var h=n.pointToData(f),u=1/0,d=-1,c=[],m=0;m<r.count();m++){c[0]=r.get("x",m),c[1]=r.get("y",m),c[2]=r.get("z",m);var p=Kr.squaredDistance(c,h);p<u&&(d=m,u=p)}d!==o&&t.dispatchAction({type:"grid3DShowAxisPointer",value:h}),o=d,i.dataIndex=d}else i.dataIndex=-1},this),i.on("mouseout",function(s){o=-1,i.dataIndex=-1,t.dispatchAction({type:"grid3DHideAxisPointer"})},this)},_updateSurfaceMesh:function(e,t,r,i){var n=e.geometry,a=t.getData(),o=a.getLayout("points"),s=0;a.each(function(Ze){a.hasValue(Ze)||s++});var l=s||i,f=n.attributes.position,h=n.attributes.normal,u=n.attributes.texcoord0,d=n.attributes.barycentric,c=n.attributes.color,m=r[0],p=r[1],v=t.get("shading"),g=v!=="color";if(l){var y=(m-1)*(p-1)*4;f.init(y),i&&d.init(y)}else f.value=new Float32Array(o);c.init(n.vertexCount),u.init(n.vertexCount);var x=[0,3,1,1,3,2],_=[[1,1,0,0],[0,1,0,1],[1,0,0,1],[1,0,1,0]],S=n.indices=new(n.vertexCount>65535?Uint32Array:Uint16Array)((m-1)*(p-1)*6),E=function(Ze,Wt,ft){ft[1]=Ze*p+Wt,ft[0]=Ze*p+Wt+1,ft[3]=(Ze+1)*p+Wt+1,ft[2]=(Ze+1)*p+Wt},b=!1;if(l){var A=[],L=[],P=0;g?h.init(n.vertexCount):h.value=null;for(var C=[[],[],[]],I=[],B=[],M=Kr.create(),G=function(Ze,Wt,ft){var ua=Wt*3;return ft[0]=Ze[ua],ft[1]=Ze[ua+1],ft[2]=Ze[ua+2],ft},k=new Float32Array(o.length),Y=new Float32Array(o.length/3*4),U=0;U<a.count();U++)if(a.hasValue(U)){var et=T.parseColor(Te(a,U)),ue=Ae(a,U);ue!=null&&(et[3]*=ue),et[3]<.99&&(b=!0);for(var X=0;X<4;X++)Y[U*4+X]=et[X]}for(var _e=[1e7,1e7,1e7],U=0;U<m-1;U++)for(var ce=0;ce<p-1;ce++){var be=U*(p-1)+ce,Le=be*4;E(U,ce,A);for(var oe=!1,X=0;X<4;X++)G(o,A[X],L),fp(L)&&(oe=!0);for(var X=0;X<4;X++)oe?f.set(Le+X,_e):(G(o,A[X],L),f.set(Le+X,L)),i&&d.set(Le+X,_[X]);for(var X=0;X<6;X++)S[P++]=x[X]+Le;if(g&&!oe)for(var X=0;X<2;X++){for(var je=X*3,Be=0;Be<3;Be++){var He=A[x[je]+Be];G(o,He,C[Be])}Kr.sub(I,C[0],C[1]),Kr.sub(B,C[1],C[2]),Kr.cross(M,I,B);for(var Be=0;Be<3;Be++){var lt=A[x[je]+Be]*3;k[lt]=k[lt]+M[0],k[lt+1]=k[lt+1]+M[1],k[lt+2]=k[lt+2]+M[2]}}}if(g)for(var U=0;U<k.length/3;U++)G(k,U,M),Kr.normalize(M,M),k[U*3]=M[0],k[U*3+1]=M[1],k[U*3+2]=M[2];for(var et=[],tt=[],U=0;U<m-1;U++)for(var ce=0;ce<p-1;ce++){var be=U*(p-1)+ce,Le=be*4;E(U,ce,A);for(var X=0;X<4;X++){for(var Be=0;Be<4;Be++)et[Be]=Y[A[X]*4+Be];c.set(Le+X,et),g&&(G(k,A[X],M),h.set(Le+X,M));var He=A[X];tt[0]=He%p/(p-1),tt[1]=Math.floor(He/p)/(m-1),u.set(Le+X,tt)}be++}}else{for(var tt=[],U=0;U<a.count();U++){tt[0]=U%p/(p-1),tt[1]=Math.floor(U/p)/(m-1);var et=T.parseColor(Te(a,U)),ue=Ae(a,U);ue!=null&&(et[3]*=ue),et[3]<.99&&(b=!0),c.set(U,et),u.set(U,tt)}for(var A=[],wi=0,U=0;U<m-1;U++)for(var ce=0;ce<p-1;ce++){E(U,ce,A);for(var X=0;X<6;X++)S[wi++]=A[x[X]]}g?n.generateVertexNormals():h.value=null}e.material.get("normalMap")&&n.generateTangents(),n.updateBoundingBox(),n.dirty(),e.material.transparent=b,e.material.depthMask=!b},_getDataShape:function(e,t){for(var r=-1/0,i=0,n=0,a=0,o=!1,s=t?"u":"x",l=e.count(),f=0;f<l;f++){var h=e.get(s,f);h<r&&(a=n,n=0,i++),r=h,n++}if((!i||n===1)&&(o=!0),!o)return[i+1,n];for(var u=Math.floor(Math.sqrt(l));u>0;){if(Math.floor(l/u)===l/u)return[u,l/u];u--}return u=Math.floor(Math.sqrt(l)),[u,u]},dispose:function(){this.groupGL.removeAll()},remove:function(){this.groupGL.removeAll()}});function uu(e){e.registerChartView(hu),e.registerSeriesModel(fu),e.registerLayout(function(t,r){t.eachSeriesByType("surface",function(i){var n=i.coordinateSystem;!n||n.type;var a=i.getData(),o=new Float32Array(3*a.count()),s=[NaN,NaN,NaN];if(n&&n.type==="cartesian3D"){var l=n.dimensions,f=l.map(function(h){return i.coordDimToDataDim(h)[0]});a.each(f,function(h,u,d,c){var m;a.hasValue(c)?m=n.dataToPoint([h,u,d]):m=s,o[c*3]=m[0],o[c*3+1]=m[1],o[c*3+2]=m[2]})}a.setLayout("points",o)})})}de(uu);function cu(e,t){for(var r=[],i=0;i<t.length;i++)r.push(e.dataToPoint(t[i]));return r}var Si=ke.extend({type:"series.map3D",layoutMode:"box",coordinateSystem:null,visualStyleAccessPath:"itemStyle",optionUpdated:function(e){e=e||{};var t=this.get("coordinateSystem");if(!(t==null||t==="geo3D")){if(0)var r,i;this.get("groundPlane.show")&&(this.option.groundPlane.show=!1),this._geo=null}},getInitialData:function(e){e.data=this.getFilledRegions(e.data,e.map);var t=Ee.createDimensions(e.data,{coordDimensions:["value"]}),r=new rt(t,this);r.initData(e.data);var i={};return r.each(function(n){var a=r.getName(n),o=r.getItemModel(n);i[a]=o}),this._regionModelMap=i,r},formatTooltip:function(e){return Qt(this,e)},getRegionModel:function(e){var t=this.getData().getName(e);return this._regionModelMap[t]||new fr(null,this)},getRegionPolygonCoords:function(e){var t=this.coordinateSystem,r=this.getData().getName(e);if(t.transform){var i=t.getRegion(r);return i?i.geometries:[]}else{this._geo||(this._geo=$n.createGeo3D(this));for(var i=this._geo.getRegion(r),n=[],a=0;a<i.geometries.length;a++){var o=i.geometries[a],s=[],l=cu(t,o.exterior);if(s&&s.length)for(var f=0;f<o.interiors.length;f++)s.push(cu(t,s[f]));n.push({interiors:s,exterior:l})}return n}},getFormattedLabel:function(e,t){var r=Ft.getFormattedLabel(this,e,t);return r==null&&(r=this.getData().getName(e)),r},defaultOption:{coordinateSystem:"geo3D",data:null}});N.merge(Si.prototype,Kn);N.merge(Si.prototype,xr);N.merge(Si.prototype,Nt);N.merge(Si.prototype,Rt);N.merge(Si.prototype,Ot);var du=Si;var mu=We.extend({type:"map3D",__ecgl__:!0,init:function(e,t){this._geo3DBuilder=new Zr(t),this.groupGL=new T.Node},render:function(e,t,r){var i=e.coordinateSystem;if(!(!i||!i.viewGL)){this.groupGL.add(this._geo3DBuilder.rootNode),i.viewGL.add(this.groupGL);var n;if(i.type==="geo3D"){n=i,this._sceneHelper||(this._sceneHelper=new It,this._sceneHelper.initLight(this.groupGL)),this._sceneHelper.setScene(i.viewGL.scene),this._sceneHelper.updateLight(e),i.viewGL.setPostEffect(e.getModel("postEffect"),r),i.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling"));var a=this._control;a||(a=this._control=new yr({zr:r.getZr()}),this._control.init());var o=e.getModel("viewControl");a.setViewGL(i.viewGL),a.setFromViewControlModel(o,0),a.off("update"),a.on("update",function(){r.dispatchAction({type:"map3DChangeCamera",alpha:a.getAlpha(),beta:a.getBeta(),distance:a.getDistance(),from:this.uid,map3DId:e.id})}),this._geo3DBuilder.extrudeY=!0}else this._control&&(this._control.dispose(),this._control=null),this._sceneHelper&&(this._sceneHelper.dispose(),this._sceneHelper=null),n=e.getData().getLayout("geo3D"),this._geo3DBuilder.extrudeY=!1;this._geo3DBuilder.update(e,t,r,0,e.getData().count());var s=i.viewGL.isLinearSpace()?"define":"undefine";this._geo3DBuilder.rootNode.traverse(function(l){l.material&&l.material[s]("fragment","SRGB_DECODE")})}},afterRender:function(e,t,r,i){var n=i.renderer,a=e.coordinateSystem;a&&a.type==="geo3D"&&(this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r))},dispose:function(){this.groupGL.removeAll(),this._control.dispose(),this._geo3DBuilder.dispose()}});function pu(e){ea(e),e.registerChartView(mu),e.registerSeriesModel(du),e.registerAction({type:"map3DChangeCamera",event:"map3dcamerachanged",update:"series:updateCamera"},function(t,r){r.eachComponent({mainType:"series",subType:"map3D",query:t},function(i){i.setView(t)})})}de(pu);var vu=ke.extend({type:"series.scatterGL",dependencies:["grid","polar","geo","singleAxis"],visualStyleAccessPath:"itemStyle",hasSymbolVisual:!0,getInitialData:function(){return Ee.createList(this)},defaultOption:{coordinateSystem:"cartesian2d",zlevel:10,progressive:1e5,progressiveThreshold:1e5,large:!1,symbol:"circle",symbolSize:10,zoomScale:0,blendMode:"source-over",itemStyle:{opacity:.8},postEffect:{enable:!1,colorCorrection:{exposure:0,brightness:0,contrast:1,saturation:1,enable:!0}}}});function Pr(e){this.viewGL=e}Pr.prototype.reset=function(e,t){this._updateCamera(t.getWidth(),t.getHeight(),t.getDevicePixelRatio()),this._viewTransform=Bo(),this.updateTransform(e,t)};Pr.prototype.updateTransform=function(e,t){var r=e.coordinateSystem;r.getRoamTransform&&(Fo(this._viewTransform,r.getRoamTransform()),this._setCameraTransform(this._viewTransform),t.getZr().refresh())};Pr.prototype.dataToPoint=function(e,t,r){r=e.dataToPoint(t,null,r);var i=this._viewTransform;i&&da(r,r,i)};Pr.prototype.removeTransformInPoint=function(e){return this._viewTransform&&da(e,e,this._viewTransform),e};Pr.prototype.getZoom=function(){if(this._viewTransform){var e=this._viewTransform;return 1/Math.max(Math.sqrt(e[0]*e[0]+e[1]*e[1]),Math.sqrt(e[2]*e[2]+e[3]*e[3]))}return 1};Pr.prototype._setCameraTransform=function(e){var t=this.viewGL.camera;t.position.set(e[4],e[5],0),t.scale.set(Math.sqrt(e[0]*e[0]+e[1]*e[1]),Math.sqrt(e[2]*e[2]+e[3]*e[3]),1)};Pr.prototype._updateCamera=function(e,t,r){this.viewGL.setViewport(0,0,e,t,r);var i=this.viewGL.camera;i.left=i.top=0,i.bottom=t,i.right=e,i.near=0,i.far=100};var oa=Pr;var gu=We.extend({type:"scatterGL",__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node,this.viewGL=new ut("orthographic"),this.viewGL.add(this.groupGL),this._pointsBuilderList=[],this._currentStep=0,this._sizeScale=1,this._glViewHelper=new oa(this.viewGL)},render:function(e,t,r){if(this.groupGL.removeAll(),this._glViewHelper.reset(e,r),!!e.getData().count()){var i=this._pointsBuilderList[0];i||(i=this._pointsBuilderList[0]=new Lr(!0,r)),this._pointsBuilderList.length=1,this.groupGL.add(i.rootNode),this._removeTransformInPoints(e.getData().getLayout("points")),i.update(e,t,r),this.viewGL.setPostEffect(e.getModel("postEffect"),r)}},incrementalPrepareRender:function(e,t,r){this.groupGL.removeAll(),this._glViewHelper.reset(e,r),this._currentStep=0,this.viewGL.setPostEffect(e.getModel("postEffect"),r)},incrementalRender:function(e,t,r,i){if(!(e.end<=e.start)){var n=this._pointsBuilderList[this._currentStep];n||(n=new Lr(!0,i),this._pointsBuilderList[this._currentStep]=n),this.groupGL.add(n.rootNode),this._removeTransformInPoints(t.getData().getLayout("points")),n.setSizeScale(this._sizeScale),n.update(t,r,i,e.start,e.end),i.getZr().refresh(),this._currentStep++}},updateTransform:function(e,t,r){if(e.coordinateSystem.getRoamTransform){this._glViewHelper.updateTransform(e,r);var i=this._glViewHelper.getZoom(),n=Math.max((e.get("zoomScale")||0)*(i-1)+1,0);this._sizeScale=n,this._pointsBuilderList.forEach(function(a){a.setSizeScale(n)})}},_removeTransformInPoints:function(e){if(e)for(var t=[],r=0;r<e.length;r+=2)t[0]=e[r],t[1]=e[r+1],this._glViewHelper.removeTransformInPoint(t),e[r]=t[0],e[r+1]=t[1]},dispose:function(){this.groupGL.removeAll(),this._pointsBuilderList.forEach(function(e){e.dispose()})},remove:function(){this.groupGL.removeAll()}});function _u(e){e.registerChartView(gu),e.registerSeriesModel(vu),e.registerLayout({seriesType:"scatterGL",reset:function(t){var r=t.coordinateSystem,i=t.getData(),n;if(r){var a=r.dimensions.map(function(s){return i.mapDimension(s)}).slice(0,2),o=[];a.length===1?n=function(s){for(var l=new Float32Array((s.end-s.start)*2),f=s.start;f<s.end;f++){var h=(f-s.start)*2,u=i.get(a[0],f),d=r.dataToPoint(u);l[h]=d[0],l[h+1]=d[1]}i.setLayout("points",l)}:a.length===2&&(n=function(s){for(var l=new Float32Array((s.end-s.start)*2),f=s.start;f<s.end;f++){var h=(f-s.start)*2,u=i.get(a[0],f),d=i.get(a[1],f);o[0]=u,o[1]=d,o=r.dataToPoint(o),l[h]=o[0],l[h+1]=o[1]}i.setLayout("points",l)})}return{progress:n}}})}de(_u);var xu=qo;function yu(e,t,r,i,n){for(var a=new Ko(i),o=0;o<e.length;o++)a.addNode(Z.firstNotNull(e[o].id,e[o].name,o),o);for(var s=[],l=[],f=0,o=0;o<t.length;o++){var h=t[o],u=h.source,d=h.target;a.addEdge(u,d,f)&&(l.push(h),s.push(Z.firstNotNull(h.id,u+" > "+d)),f++)}var c,m=Ee.createDimensions(e,{coordDimensions:["value"]});c=new rt(m,r),c.initData(e);var p=new rt(["value"],r);return p.initData(l,s),n&&n(c,p),xu({mainData:c,struct:a,structAttr:"graph",datas:{node:c,edge:p},datasAttr:{node:"data",edge:"edgeData"}}),a.update(),a}var Ji=ke.extend({type:"series.graphGL",visualStyleAccessPath:"itemStyle",hasSymbolVisual:!0,init:function(e){Ji.superApply(this,"init",arguments),this.legendDataProvider=function(){return this._categoriesData},this._updateCategoriesData()},mergeOption:function(e){Ji.superApply(this,"mergeOption",arguments),this._updateCategoriesData()},getFormattedLabel:function(e,t,r,i){var n=Ft.getFormattedLabel(this,e,t,r,i);if(n==null){var a=this.getData(),o=a.dimensions[a.dimensions.length-1];n=a.get(o,e)}return n},getInitialData:function(e,t){var r=e.edges||e.links||[],i=e.data||e.nodes||[],n=this;if(i&&r)return yu(i,r,this,!0,a).data;function a(o,s){o.wrapMethod("getItemModel",function(u){let d=n._categoriesModels,c=u.getShallow("category"),m=d[c];return m&&(m.parentModel=u.parentModel,u.parentModel=m),u});let l=t.getModel([]).getModel;function f(u,d){let c=l.call(this,u,d);return c.resolveParentPath=h,c}s.wrapMethod("getItemModel",function(u){return u.resolveParentPath=h,u.getModel=f,u});function h(u){if(u&&(u[0]==="label"||u[1]==="label")){let d=u.slice();return u[0]==="label"?d[0]="edgeLabel":u[1]==="label"&&(d[1]="edgeLabel"),d}return u}}},getGraph:function(){return this.getData().graph},getEdgeData:function(){return this.getGraph().edgeData},getCategoriesData:function(){return this._categoriesData},formatTooltip:function(e,t,r){if(r==="edge"){var i=this.getData(),n=this.getDataParams(e,r),a=i.graph.getEdgeByIndex(e),o=i.getName(a.node1.dataIndex),s=i.getName(a.node2.dataIndex),l=[];return o!=null&&l.push(o),s!=null&&l.push(s),l=_t.encodeHTML(l.join(" > ")),n.value&&(l+=" : "+_t.encodeHTML(n.value)),l}else return Ji.superApply(this,"formatTooltip",arguments)},_updateCategoriesData:function(){var e=(this.option.categories||[]).map(function(r){return r.value!=null?r:Object.assign({value:0},r)}),t=new rt(["value"],this);t.initData(e),this._categoriesData=t,this._categoriesModels=t.mapArray(function(r){return t.getItemModel(r,!0)})},setView:function(e){e.zoom!=null&&(this.option.zoom=e.zoom),e.offset!=null&&(this.option.offset=e.offset)},setNodePosition:function(e){for(var t=0;t<e.length/2;t++){var r=e[t*2],i=e[t*2+1],n=this.getData().getRawDataItem(t);n.x=r,n.y=i}},isAnimationEnabled:function(){return Ji.superCall(this,"isAnimationEnabled")&&!(this.get("layout")==="force"&&this.get("force.layoutAnimation"))},defaultOption:{zlevel:10,z:2,legendHoverLink:!0,layout:"forceAtlas2",forceAtlas2:{initLayout:null,GPU:!0,steps:1,maxSteps:1e3,repulsionByDegree:!0,linLogMode:!1,strongGravityMode:!1,gravity:1,edgeWeightInfluence:1,edgeWeight:[1,4],nodeWeight:[1,4],preventOverlap:!1,gravityCenter:null},focusNodeAdjacency:!0,focusNodeAdjacencyOn:"mouseover",left:"center",top:"center",symbol:"circle",symbolSize:5,roam:!1,center:null,zoom:1,label:{show:!1,formatter:"{b}",position:"right",distance:5,textStyle:{fontSize:14}},itemStyle:{},lineStyle:{color:"#aaa",width:1,opacity:.5},emphasis:{label:{show:!0}},animation:!1}}),Tu=Ji;var $e=ae.vec2,Eu=[[0,0],[1,1]],Su=ee.extend(function(){return{segmentScale:4,dynamic:!0,useNativeLine:!0,attributes:{position:new ee.Attribute("position","float",2,"POSITION"),normal:new ee.Attribute("normal","float",2),offset:new ee.Attribute("offset","float",1),color:new ee.Attribute("color","float",4,"COLOR")}}},{resetOffset:function(){this._vertexOffset=0,this._faceOffset=0,this._itemVertexOffsets=[]},setVertexCount:function(e){var t=this.attributes;this.vertexCount!==e&&(t.position.init(e),t.color.init(e),this.useNativeLine||(t.offset.init(e),t.normal.init(e)),e>65535?this.indices instanceof Uint16Array&&(this.indices=new Uint32Array(this.indices)):this.indices instanceof Uint32Array&&(this.indices=new Uint16Array(this.indices)))},setTriangleCount:function(e){this.triangleCount!==e&&(e===0?this.indices=null:this.indices=this.vertexCount>65535?new Uint32Array(e*3):new Uint16Array(e*3))},_getCubicCurveApproxStep:function(e,t,r,i){var n=$e.dist(e,t)+$e.dist(r,t)+$e.dist(i,r),a=1/(n+1)*this.segmentScale;return a},getCubicCurveVertexCount:function(e,t,r,i){var n=this._getCubicCurveApproxStep(e,t,r,i),a=Math.ceil(1/n);return this.useNativeLine?a*2:a*2+2},getCubicCurveTriangleCount:function(e,t,r,i){var n=this._getCubicCurveApproxStep(e,t,r,i),a=Math.ceil(1/n);return this.useNativeLine?0:a*2},getLineVertexCount:function(){return this.getPolylineVertexCount(Eu)},getLineTriangleCount:function(){return this.getPolylineTriangleCount(Eu)},getPolylineVertexCount:function(e){var t;if(typeof e=="number")t=e;else{var r=typeof e[0]!="number";t=r?e.length:e.length/2}return this.useNativeLine?(t-1)*2:(t-1)*2+2},getPolylineTriangleCount:function(e){var t;if(typeof e=="number")t=e;else{var r=typeof e[0]!="number";t=r?e.length:e.length/2}return this.useNativeLine?0:(t-1)*2},addCubicCurve:function(e,t,r,i,n,a){a==null&&(a=1);for(var o=e[0],s=e[1],l=t[0],f=t[1],h=r[0],u=r[1],d=i[0],c=i[1],m=this._getCubicCurveApproxStep(e,t,r,i),p=m*m,v=p*m,g=3*m,y=3*p,x=6*p,_=6*v,S=o-l*2+h,E=s-f*2+u,b=(l-h)*3-o+d,A=(f-u)*3-s+c,L=o,P=s,C=(l-o)*g+S*y+b*v,I=(f-s)*g+E*y+A*v,B=S*x+b*_,M=E*x+A*_,G=b*_,k=A*_,Y=0,U=0,ue=Math.ceil(1/m),X=new Float32Array((ue+1)*3),X=[],_e=0,U=0;U<ue+1;U++)X[_e++]=L,X[_e++]=P,L+=C,P+=I,C+=B,I+=M,B+=G,M+=k,Y+=m,Y>1&&(L=C>0?Math.min(L,d):Math.max(L,d),P=I>0?Math.min(P,c):Math.max(P,c));this.addPolyline(X,n,a)},addLine:function(e,t,r,i){this.addPolyline([e,t],r,i)},addPolyline:(function(){var e=$e.create(),t=$e.create(),r=$e.create(),i=$e.create(),n=[],a=[],o=[];return function(s,l,f,h,u){if(s.length){var d=typeof s[0]!="number";if(u==null&&(u=d?s.length:s.length/2),!(u<2)){h==null&&(h=0),f==null&&(f=1),this._itemVertexOffsets.push(this._vertexOffset);for(var c=d?typeof l[0]!="number":l.length/4===u,m=this.attributes.position,p=this.attributes.color,v=this.attributes.offset,g=this.attributes.normal,y=this.indices,x=this._vertexOffset,_,S=0;S<u;S++){if(d)n=s[S+h],c?_=l[S+h]:_=l;else{var E=S*2+h;if(n=n||[],n[0]=s[E],n[1]=s[E+1],c){var b=S*4+h;_=_||[],_[0]=l[b],_[1]=l[b+1],_[2]=l[b+2],_[3]=l[b+3]}else _=l}if(this.useNativeLine)S>1&&(m.copy(x,x-1),p.copy(x,x-1),x++);else{var A;if(S<u-1){if(d)$e.copy(a,s[S+1]);else{var E=(S+1)*2+h;a=a||[],a[0]=s[E],a[1]=s[E+1]}if(S>0){$e.sub(e,n,o),$e.sub(t,a,n),$e.normalize(e,e),$e.normalize(t,t),$e.add(i,e,t),$e.normalize(i,i);var L=f/2*Math.min(1/$e.dot(e,i),2);r[0]=-i[1],r[1]=i[0],A=L}else $e.sub(e,a,n),$e.normalize(e,e),r[0]=-e[1],r[1]=e[0],A=f/2}else $e.sub(e,n,o),$e.normalize(e,e),r[0]=-e[1],r[1]=e[0],A=f/2;g.set(x,r),g.set(x+1,r),v.set(x,A),v.set(x+1,-A),$e.copy(o,n),m.set(x,n),m.set(x+1,n),p.set(x,_),p.set(x+1,_),x+=2}if(this.useNativeLine)p.set(x,_),m.set(x,n),x++;else if(S>0){var P=this._faceOffset*3,y=this.indices;y[P]=x-4,y[P+1]=x-3,y[P+2]=x-2,y[P+3]=x-3,y[P+4]=x-1,y[P+5]=x-2,this._faceOffset+=2}}this._vertexOffset=x}}}})(),setItemColor:function(e,t){for(var r=this._itemVertexOffsets[e],i=e<this._itemVertexOffsets.length-1?this._itemVertexOffsets[e+1]:this._vertexOffset,n=r;n<i;n++)this.attributes.color.set(n,t);this.dirty("color")}});N.defaults(Su.prototype,qt);var sa=Su;var wu=`@export ecgl.forceAtlas2.updateNodeRepulsion

#define NODE_COUNT 0

uniform sampler2D positionTex;

uniform vec2 textureSize;
uniform float gravity;
uniform float scaling;
uniform vec2 gravityCenter;

uniform bool strongGravityMode;
uniform bool preventOverlap;

varying vec2 v_Texcoord;

void main() {

 vec4 n0 = texture2D(positionTex, v_Texcoord);

 vec2 force = vec2(0.0);
 for (int i = 0; i < NODE_COUNT; i++) {
 vec2 uv = vec2(
 mod(float(i), textureSize.x) / (textureSize.x - 1.0),
 floor(float(i) / textureSize.x) / (textureSize.y - 1.0)
 );
 vec4 n1 = texture2D(positionTex, uv);

 vec2 dir = n0.xy - n1.xy;
 float d2 = dot(dir, dir);

 if (d2 > 0.0) {
 float factor = 0.0;
 if (preventOverlap) {
 float d = sqrt(d2);
 d = d - n0.w - n1.w;
 if (d > 0.0) {
 factor = scaling * n0.z * n1.z / (d * d);
 }
 else if (d < 0.0) {
 factor = scaling * 100.0 * n0.z * n1.z;
 }
 }
 else {
 factor = scaling * n0.z * n1.z / d2;
 }
 force += dir * factor;
 }
 }

 vec2 dir = gravityCenter - n0.xy;
 float d = 1.0;
 if (!strongGravityMode) {
 d = length(dir);
 }

 force += dir * n0.z * gravity / (d + 1.0);

 gl_FragColor = vec4(force, 0.0, 1.0);
}
@end

@export ecgl.forceAtlas2.updateEdgeAttraction.vertex

attribute vec2 node1;
attribute vec2 node2;
attribute float weight;

uniform sampler2D positionTex;
uniform float edgeWeightInfluence;
uniform bool preventOverlap;
uniform bool linLogMode;

uniform vec2 windowSize: WINDOW_SIZE;

varying vec2 v_Force;

void main() {

 vec4 n0 = texture2D(positionTex, node1);
 vec4 n1 = texture2D(positionTex, node2);

 vec2 dir = n1.xy - n0.xy;
 float d = length(dir);
 float w;
 if (edgeWeightInfluence == 0.0) {
 w = 1.0;
 }
 else if (edgeWeightInfluence == 1.0) {
 w = weight;
 }
 else {
 w = pow(weight, edgeWeightInfluence);
 }
 vec2 offset = vec2(1.0 / windowSize.x, 1.0 / windowSize.y);
 vec2 scale = vec2((windowSize.x - 1.0) / windowSize.x, (windowSize.y - 1.0) / windowSize.y);
 vec2 pos = node1 * scale * 2.0 - 1.0;
 gl_Position = vec4(pos + offset, 0.0, 1.0);
 gl_PointSize = 1.0;

 float factor;
 if (preventOverlap) {
 d = d - n1.w - n0.w;
 }
 if (d <= 0.0) {
 v_Force = vec2(0.0);
 return;
 }

 if (linLogMode) {
 factor = w * log(d) / d;
 }
 else {
 factor = w;
 }
 v_Force = dir * factor;
}
@end

@export ecgl.forceAtlas2.updateEdgeAttraction.fragment

varying vec2 v_Force;

void main() {
 gl_FragColor = vec4(v_Force, 0.0, 0.0);
}
@end

@export ecgl.forceAtlas2.calcWeightedSum.vertex

attribute vec2 node;

varying vec2 v_NodeUv;

void main() {

 v_NodeUv = node;
 gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
 gl_PointSize = 1.0;
}
@end

@export ecgl.forceAtlas2.calcWeightedSum.fragment

varying vec2 v_NodeUv;

uniform sampler2D positionTex;
uniform sampler2D forceTex;
uniform sampler2D forcePrevTex;

void main() {
 vec2 force = texture2D(forceTex, v_NodeUv).rg;
 vec2 forcePrev = texture2D(forcePrevTex, v_NodeUv).rg;

 float mass = texture2D(positionTex, v_NodeUv).z;
 float swing = length(force - forcePrev) * mass;
 float traction = length(force + forcePrev) * 0.5 * mass;

 gl_FragColor = vec4(swing, traction, 0.0, 0.0);
}
@end

@export ecgl.forceAtlas2.calcGlobalSpeed

uniform sampler2D globalSpeedPrevTex;
uniform sampler2D weightedSumTex;
uniform float jitterTolerence;

void main() {
 vec2 weightedSum = texture2D(weightedSumTex, vec2(0.5)).xy;
 float prevGlobalSpeed = texture2D(globalSpeedPrevTex, vec2(0.5)).x;
 float globalSpeed = jitterTolerence * jitterTolerence
 * weightedSum.y / weightedSum.x;
 if (prevGlobalSpeed > 0.0) {
 globalSpeed = min(globalSpeed / prevGlobalSpeed, 1.5) * prevGlobalSpeed;
 }
 gl_FragColor = vec4(globalSpeed, 0.0, 0.0, 1.0);
}
@end

@export ecgl.forceAtlas2.updatePosition

uniform sampler2D forceTex;
uniform sampler2D forcePrevTex;
uniform sampler2D positionTex;
uniform sampler2D globalSpeedTex;

varying vec2 v_Texcoord;

void main() {
 vec2 force = texture2D(forceTex, v_Texcoord).xy;
 vec2 forcePrev = texture2D(forcePrevTex, v_Texcoord).xy;
 vec4 node = texture2D(positionTex, v_Texcoord);

 float globalSpeed = texture2D(globalSpeedTex, vec2(0.5)).r;
 float swing = length(force - forcePrev);
 float speed = 0.1 * globalSpeed / (0.1 + globalSpeed * sqrt(swing));

 float df = length(force);
 if (df > 0.0) {
 speed = min(df * speed, 10.0) / df;

 gl_FragColor = vec4(node.xy + speed * force, node.zw);
 }
 else {
 gl_FragColor = node;
 }
}
@end

@export ecgl.forceAtlas2.edges.vertex
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec2 node;
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;

uniform sampler2D positionTex;

void main()
{
 gl_Position = worldViewProjection * vec4(
 texture2D(positionTex, node).xy, -10.0, 1.0
 );
 v_Color = a_Color;
}
@end

@export ecgl.forceAtlas2.edges.fragment
uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
varying vec4 v_Color;
void main() {
 gl_FragColor = color * v_Color;
}
@end`;T.Shader.import(wu);var No={repulsionByDegree:!0,linLogMode:!1,strongGravityMode:!1,gravity:1,scaling:1,edgeWeightInfluence:1,jitterTolerence:.1,preventOverlap:!1,dissuadeHubs:!1,gravityCenter:null};function st(e){var t={type:T.Texture.FLOAT,minFilter:T.Texture.NEAREST,magFilter:T.Texture.NEAREST};this._positionSourceTex=new T.Texture2D(t),this._positionSourceTex.flipY=!1,this._positionTex=new T.Texture2D(t),this._positionPrevTex=new T.Texture2D(t),this._forceTex=new T.Texture2D(t),this._forcePrevTex=new T.Texture2D(t),this._weightedSumTex=new T.Texture2D(t),this._weightedSumTex.width=this._weightedSumTex.height=1,this._globalSpeedTex=new T.Texture2D(t),this._globalSpeedPrevTex=new T.Texture2D(t),this._globalSpeedTex.width=this._globalSpeedTex.height=1,this._globalSpeedPrevTex.width=this._globalSpeedPrevTex.height=1,this._nodeRepulsionPass=new ge({fragment:T.Shader.source("ecgl.forceAtlas2.updateNodeRepulsion")}),this._positionPass=new ge({fragment:T.Shader.source("ecgl.forceAtlas2.updatePosition")}),this._globalSpeedPass=new ge({fragment:T.Shader.source("ecgl.forceAtlas2.calcGlobalSpeed")}),this._copyPass=new ge({fragment:T.Shader.source("clay.compositor.output")});var r=function(i){i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ONE)};this._edgeForceMesh=new T.Mesh({geometry:new T.Geometry({attributes:{node1:new T.Geometry.Attribute("node1","float",2),node2:new T.Geometry.Attribute("node2","float",2),weight:new T.Geometry.Attribute("weight","float",1)},dynamic:!0,mainAttribute:"node1"}),material:new T.Material({transparent:!0,shader:T.createShader("ecgl.forceAtlas2.updateEdgeAttraction"),blend:r,depthMask:!1,depthText:!1}),mode:T.Mesh.POINTS}),this._weightedSumMesh=new T.Mesh({geometry:new T.Geometry({attributes:{node:new T.Geometry.Attribute("node","float",2)},dynamic:!0,mainAttribute:"node"}),material:new T.Material({transparent:!0,shader:T.createShader("ecgl.forceAtlas2.calcWeightedSum"),blend:r,depthMask:!1,depthText:!1}),mode:T.Mesh.POINTS}),this._framebuffer=new ve({depthBuffer:!1}),this._dummyCamera=new T.OrthographicCamera({left:-1,right:1,top:1,bottom:-1,near:0,far:100}),this._globalSpeed=0}st.prototype.updateOption=function(e){for(var t in No)this[t]=No[t];var r=this._nodes.length;if(r>5e4?this.jitterTolerence=10:r>5e3?this.jitterTolerence=1:this.jitterTolerence=.1,r>100?this.scaling=2:this.scaling=10,e)for(var t in No)e[t]!=null&&(this[t]=e[t]);if(this.repulsionByDegree)for(var i=this._positionSourceTex.pixels,n=0;n<this._nodes.length;n++)i[n*4+2]=(this._nodes[n].degree||0)+1};st.prototype._updateGravityCenter=function(e){var t=this._nodes,r=this._edges;if(this.gravityCenter)this._gravityCenter=this.gravityCenter;else{for(var i=[1/0,1/0],n=[-1/0,-1/0],a=0;a<t.length;a++)i[0]=Math.min(t[a].x,i[0]),i[1]=Math.min(t[a].y,i[1]),n[0]=Math.max(t[a].x,n[0]),n[1]=Math.max(t[a].y,n[1]);this._gravityCenter=[(i[0]+n[0])*.5,(i[1]+n[1])*.5]}for(var a=0;a<r.length;a++){var o=r[a].node1,s=r[a].node2;t[o].degree=(t[o].degree||0)+1,t[s].degree=(t[s].degree||0)+1}};st.prototype.initData=function(e,t){this._nodes=e,this._edges=t,this._updateGravityCenter();var r=Math.ceil(Math.sqrt(e.length)),i=r,n=new Float32Array(r*i*4);this._resize(r,i);for(var a=0,o=0;o<e.length;o++){var s=e[o];n[a++]=s.x||0,n[a++]=s.y||0,n[a++]=s.mass||1,n[a++]=s.size||1}this._positionSourceTex.pixels=n;var l=this._edgeForceMesh.geometry,f=t.length;l.attributes.node1.init(f*2),l.attributes.node2.init(f*2),l.attributes.weight.init(f*2);for(var h=[],o=0;o<t.length;o++){var u=l.attributes,d=t[o].weight;d==null&&(d=1),u.node1.set(o,this.getNodeUV(t[o].node1,h)),u.node2.set(o,this.getNodeUV(t[o].node2,h)),u.weight.set(o,d),u.node1.set(o+f,this.getNodeUV(t[o].node2,h)),u.node2.set(o+f,this.getNodeUV(t[o].node1,h)),u.weight.set(o+f,d)}var c=this._weightedSumMesh.geometry;c.attributes.node.init(e.length);for(var o=0;o<e.length;o++)c.attributes.node.set(o,this.getNodeUV(o,h));l.dirty(),c.dirty(),this._nodeRepulsionPass.material.define("fragment","NODE_COUNT",e.length),this._nodeRepulsionPass.material.setUniform("textureSize",[r,i]),this._inited=!1,this._frame=0};st.prototype.getNodes=function(){return this._nodes};st.prototype.getEdges=function(){return this._edges};st.prototype.step=function(e){this._inited||(this._initFromSource(e),this._inited=!0),this._frame++,this._framebuffer.attach(this._forceTex),this._framebuffer.bind(e);var t=this._nodeRepulsionPass;t.setUniform("strongGravityMode",this.strongGravityMode),t.setUniform("gravity",this.gravity),t.setUniform("gravityCenter",this._gravityCenter),t.setUniform("scaling",this.scaling),t.setUniform("preventOverlap",this.preventOverlap),t.setUniform("positionTex",this._positionPrevTex),t.render(e);var r=this._edgeForceMesh;r.material.set("linLogMode",this.linLogMode),r.material.set("edgeWeightInfluence",this.edgeWeightInfluence),r.material.set("preventOverlap",this.preventOverlap),r.material.set("positionTex",this._positionPrevTex),e.gl.enable(e.gl.BLEND),e.renderPass([r],this._dummyCamera),this._framebuffer.attach(this._weightedSumTex),e.gl.clearColor(0,0,0,0),e.gl.clear(e.gl.COLOR_BUFFER_BIT),e.gl.enable(e.gl.BLEND);var i=this._weightedSumMesh;i.material.set("positionTex",this._positionPrevTex),i.material.set("forceTex",this._forceTex),i.material.set("forcePrevTex",this._forcePrevTex),e.renderPass([i],this._dummyCamera),this._framebuffer.attach(this._globalSpeedTex);var n=this._globalSpeedPass;n.setUniform("globalSpeedPrevTex",this._globalSpeedPrevTex),n.setUniform("weightedSumTex",this._weightedSumTex),n.setUniform("jitterTolerence",this.jitterTolerence),e.gl.disable(e.gl.BLEND),n.render(e);var a=this._positionPass;this._framebuffer.attach(this._positionTex),a.setUniform("globalSpeedTex",this._globalSpeedTex),a.setUniform("positionTex",this._positionPrevTex),a.setUniform("forceTex",this._forceTex),a.setUniform("forcePrevTex",this._forcePrevTex),a.render(e),this._framebuffer.unbind(e),this._swapTexture()};st.prototype.update=function(e,t,r){t==null&&(t=1),t=Math.max(t,1);for(var i=0;i<t;i++)this.step(e);r&&r()};st.prototype.getNodePositionTexture=function(){return this._inited?this._positionPrevTex:this._positionSourceTex};st.prototype.getNodeUV=function(e,t){t=t||[];var r=this._positionTex.width,i=this._positionTex.height;return t[0]=e%r/(r-1),t[1]=Math.floor(e/r)/(i-1)||0,t};st.prototype.getNodePosition=function(e,t){var r=this._positionArr,i=this._positionTex.width,n=this._positionTex.height,a=i*n;(!r||r.length!==a*4)&&(r=this._positionArr=new Float32Array(a*4)),this._framebuffer.bind(e),this._framebuffer.attach(this._positionPrevTex),e.gl.readPixels(0,0,i,n,e.gl.RGBA,e.gl.FLOAT,r),this._framebuffer.unbind(e),t||(t=new Float32Array(this._nodes.length*2));for(var o=0;o<this._nodes.length;o++)t[o*2]=r[o*4],t[o*2+1]=r[o*4+1];return t};st.prototype.getTextureData=function(e,t){var r=this["_"+t+"Tex"],i=r.width,n=r.height;this._framebuffer.bind(e),this._framebuffer.attach(r);var a=new Float32Array(i*n*4);return e.gl.readPixels(0,0,i,n,e.gl.RGBA,e.gl.FLOAT,a),this._framebuffer.unbind(e),a};st.prototype.getTextureSize=function(){return{width:this._positionTex.width,height:this._positionTex.height}};st.prototype.isFinished=function(e){return this._frame>e};st.prototype._swapTexture=function(){var e=this._positionPrevTex;this._positionPrevTex=this._positionTex,this._positionTex=e;var e=this._forcePrevTex;this._forcePrevTex=this._forceTex,this._forceTex=e;var e=this._globalSpeedPrevTex;this._globalSpeedPrevTex=this._globalSpeedTex,this._globalSpeedTex=e};st.prototype._initFromSource=function(e){this._framebuffer.attach(this._positionPrevTex),this._framebuffer.bind(e),this._copyPass.setUniform("texture",this._positionSourceTex),this._copyPass.render(e),e.gl.clearColor(0,0,0,0),this._framebuffer.attach(this._forcePrevTex),e.gl.clear(e.gl.COLOR_BUFFER_BIT),this._framebuffer.attach(this._globalSpeedPrevTex),e.gl.clear(e.gl.COLOR_BUFFER_BIT),this._framebuffer.unbind(e)};st.prototype._resize=function(e,t){["_positionSourceTex","_positionTex","_positionPrevTex","_forceTex","_forcePrevTex"].forEach(function(r){this[r].width=e,this[r].height=t,this[r].dirty()},this)};st.prototype.dispose=function(e){this._framebuffer.dispose(e),this._copyPass.dispose(e),this._nodeRepulsionPass.dispose(e),this._positionPass.dispose(e),this._globalSpeedPass.dispose(e),this._edgeForceMesh.geometry.dispose(e),this._weightedSumMesh.geometry.dispose(e),this._positionSourceTex.dispose(e),this._positionTex.dispose(e),this._positionPrevTex.dispose(e),this._forceTex.dispose(e),this._forcePrevTex.dispose(e),this._weightedSumTex.dispose(e),this._globalSpeedTex.dispose(e),this._globalSpeedPrevTex.dispose(e)};var la=st;function hp(){var e={create:function(){return new Float32Array(2)},dist:function(l,f){var h=f[0]-l[0],u=f[1]-l[1];return Math.sqrt(h*h+u*u)},len:function(l){var f=l[0],h=l[1];return Math.sqrt(f*f+h*h)},scaleAndAdd:function(l,f,h,u){return l[0]=f[0]+h[0]*u,l[1]=f[1]+h[1]*u,l},scale:function(l,f,h){return l[0]=f[0]*h,l[1]=f[1]*h,l},add:function(l,f,h){return l[0]=f[0]+h[0],l[1]=f[1]+h[1],l},sub:function(l,f,h){return l[0]=f[0]-h[0],l[1]=f[1]-h[1],l},normalize:function(l,f){var h=f[0],u=f[1],d=h*h+u*u;return d>0&&(d=1/Math.sqrt(d),l[0]=f[0]*d,l[1]=f[1]*d),l},negate:function(l,f){return l[0]=-f[0],l[1]=-f[1],l},copy:function(l,f){return l[0]=f[0],l[1]=f[1],l},set:function(l,f,h){return l[0]=f,l[1]=h,l}};function t(){this.subRegions=[],this.nSubRegions=0,this.node=null,this.mass=0,this.centerOfMass=null,this.bbox=new Float32Array(4),this.size=0}var r=t.prototype;r.beforeUpdate=function(){for(var l=0;l<this.nSubRegions;l++)this.subRegions[l].beforeUpdate();this.mass=0,this.centerOfMass&&(this.centerOfMass[0]=0,this.centerOfMass[1]=0),this.nSubRegions=0,this.node=null},r.afterUpdate=function(){this.subRegions.length=this.nSubRegions;for(var l=0;l<this.nSubRegions;l++)this.subRegions[l].afterUpdate()},r.addNode=function(l){if(this.nSubRegions===0)if(this.node==null){this.node=l;return}else this._addNodeToSubRegion(this.node),this.node=null;this._addNodeToSubRegion(l),this._updateCenterOfMass(l)},r.findSubRegion=function(l,f){for(var h=0;h<this.nSubRegions;h++){var u=this.subRegions[h];if(u.contain(l,f))return u}},r.contain=function(l,f){return this.bbox[0]<=l&&this.bbox[2]>=l&&this.bbox[1]<=f&&this.bbox[3]>=f},r.setBBox=function(l,f,h,u){this.bbox[0]=l,this.bbox[1]=f,this.bbox[2]=h,this.bbox[3]=u,this.size=(h-l+u-f)/2},r._newSubRegion=function(){var l=this.subRegions[this.nSubRegions];return l||(l=new t,this.subRegions[this.nSubRegions]=l),this.nSubRegions++,l},r._addNodeToSubRegion=function(l){var f=this.findSubRegion(l.position[0],l.position[1]),h=this.bbox;if(!f){var u=(h[0]+h[2])/2,d=(h[1]+h[3])/2,c=(h[2]-h[0])/2,m=(h[3]-h[1])/2,p=l.position[0]>=u?1:0,v=l.position[1]>=d?1:0,f=this._newSubRegion();f.setBBox(p*c+h[0],v*m+h[1],(p+1)*c+h[0],(v+1)*m+h[1])}f.addNode(l)},r._updateCenterOfMass=function(l){this.centerOfMass==null&&(this.centerOfMass=new Float32Array(2));var f=this.centerOfMass[0]*this.mass,h=this.centerOfMass[1]*this.mass;f+=l.position[0]*l.mass,h+=l.position[1]*l.mass,this.mass+=l.mass,this.centerOfMass[0]=f/this.mass,this.centerOfMass[1]=h/this.mass};function i(){this.position=new Float32Array(2),this.force=e.create(),this.forcePrev=e.create(),this.mass=1,this.inDegree=0,this.outDegree=0}function n(l,f){this.source=l,this.target=f,this.weight=1}function a(){this.autoSettings=!0,this.barnesHutOptimize=!0,this.barnesHutTheta=1.5,this.repulsionByDegree=!0,this.linLogMode=!1,this.strongGravityMode=!1,this.gravity=1,this.scaling=1,this.edgeWeightInfluence=1,this.jitterTolerence=.1,this.preventOverlap=!1,this.dissuadeHubs=!1,this.rootRegion=new t,this.rootRegion.centerOfMass=e.create(),this.nodes=[],this.edges=[],this.bbox=new Float32Array(4),this.gravityCenter=null,this._massArr=null,this._swingingArr=null,this._sizeArr=null,this._globalSpeed=0}var o=a.prototype;o.initNodes=function(l,f,h){var u=f.length;this.nodes.length=0;for(var d=typeof h<"u",c=0;c<u;c++){var m=new i;m.position[0]=l[c*2],m.position[1]=l[c*2+1],m.mass=f[c],d&&(m.size=h[c]),this.nodes.push(m)}this._massArr=f,this._swingingArr=new Float32Array(u),d&&(this._sizeArr=h)},o.initEdges=function(l,f){var h=l.length/2;this.edges.length=0;for(var u=0;u<h;u++){var d=l[u*2],c=l[u*2+1],m=this.nodes[d],p=this.nodes[c];if(!m||!p){console.error("Node not exists, try initNodes before initEdges");return}m.outDegree++,p.inDegree++;var v=new n(m,p);f&&(v.weight=f[u]),this.edges.push(v)}},o.updateSettings=function(){if(this.repulsionByDegree)for(var l=0;l<this.nodes.length;l++){var f=this.nodes[l];f.mass=f.inDegree+f.outDegree+1}else for(var l=0;l<this.nodes.length;l++){var f=this.nodes[l];f.mass=this._massArr[l]}},o.update=function(){var l=this.nodes.length;if(this.updateSettings(),this.updateBBox(),this.barnesHutOptimize){this.rootRegion.setBBox(this.bbox[0],this.bbox[1],this.bbox[2],this.bbox[3]),this.rootRegion.beforeUpdate();for(var f=0;f<l;f++)this.rootRegion.addNode(this.nodes[f]);this.rootRegion.afterUpdate()}for(var f=0;f<l;f++){var h=this.nodes[f];e.copy(h.forcePrev,h.force),e.set(h.force,0,0)}for(var f=0;f<l;f++){var u=this.nodes[f];if(this.barnesHutOptimize)this.applyRegionToNodeRepulsion(this.rootRegion,u);else for(var d=f+1;d<l;d++){var c=this.nodes[d];this.applyNodeToNodeRepulsion(u,c,!1)}this.gravity>0&&(this.strongGravityMode?this.applyNodeStrongGravity(u):this.applyNodeGravity(u))}for(var f=0;f<this.edges.length;f++)this.applyEdgeAttraction(this.edges[f]);for(var m=0,p=0,v=e.create(),f=0;f<l;f++){var h=this.nodes[f],g=e.dist(h.force,h.forcePrev);m+=g*h.mass,e.add(v,h.force,h.forcePrev);var y=e.len(v)*.5;p+=y*h.mass,this._swingingArr[f]=g}var x=this.jitterTolerence*this.jitterTolerence*p/m;this._globalSpeed>0&&(x=Math.min(x/this._globalSpeed,1.5)*this._globalSpeed),this._globalSpeed=x;for(var f=0;f<l;f++){var h=this.nodes[f],g=this._swingingArr[f],_=.1*x/(1+x*Math.sqrt(g)),S=e.len(h.force);S>0&&(_=Math.min(S*_,10)/S,e.scaleAndAdd(h.position,h.position,h.force,_))}},o.applyRegionToNodeRepulsion=(function(){var l=e.create();return function(h,u){if(h.node)this.applyNodeToNodeRepulsion(h.node,u,!0);else{e.sub(l,u.position,h.centerOfMass);var d=l[0]*l[0]+l[1]*l[1];if(d>this.barnesHutTheta*h.size*h.size){var c=this.scaling*u.mass*h.mass/d;e.scaleAndAdd(u.force,u.force,l,c)}else for(var m=0;m<h.nSubRegions;m++)this.applyRegionToNodeRepulsion(h.subRegions[m],u)}}})(),o.applyNodeToNodeRepulsion=(function(){var l=e.create();return function(h,u,d){if(h!=u){e.sub(l,h.position,u.position);var c=l[0]*l[0]+l[1]*l[1];if(c!==0){var m;if(this.preventOverlap){var p=Math.sqrt(c);if(p=p-h.size-u.size,p>0)m=this.scaling*h.mass*u.mass/(p*p);else if(p<0)m=this.scaling*100*h.mass*u.mass;else return}else m=this.scaling*h.mass*u.mass/c;e.scaleAndAdd(h.force,h.force,l,m),e.scaleAndAdd(u.force,u.force,l,-m)}}}})(),o.applyEdgeAttraction=(function(){var l=e.create();return function(h){var u=h.source,d=h.target;e.sub(l,u.position,d.position);var c=e.len(l),m;this.edgeWeightInfluence===0?m=1:this.edgeWeightInfluence===1?m=h.weight:m=Math.pow(h.weight,this.edgeWeightInfluence);var p;this.preventOverlap&&(c=c-u.size-d.size,c<=0)||(this.linLogMode?p=-m*Math.log(c+1)/(c+1):p=-m,e.scaleAndAdd(u.force,u.force,l,p),e.scaleAndAdd(d.force,d.force,l,-p))}})(),o.applyNodeGravity=(function(){var l=e.create();return function(f){e.sub(l,this.gravityCenter,f.position);var h=e.len(l);e.scaleAndAdd(f.force,f.force,l,this.gravity*f.mass/(h+1))}})(),o.applyNodeStrongGravity=(function(){var l=e.create();return function(f){e.sub(l,this.gravityCenter,f.position),e.scaleAndAdd(f.force,f.force,l,this.gravity*f.mass)}})(),o.updateBBox=function(){for(var l=1/0,f=1/0,h=-1/0,u=-1/0,d=0;d<this.nodes.length;d++){var c=this.nodes[d].position;l=Math.min(l,c[0]),f=Math.min(f,c[1]),h=Math.max(h,c[0]),u=Math.max(u,c[1])}this.bbox[0]=l,this.bbox[1]=f,this.bbox[2]=h,this.bbox[3]=u},o.getGlobalSpeed=function(){return this._globalSpeed};var s=null;self.onmessage=function(l){switch(l.data.cmd){case"init":s=new a,s.initNodes(l.data.nodesPosition,l.data.nodesMass,l.data.nodesSize),s.initEdges(l.data.edges,l.data.edgesWeight);break;case"updateConfig":if(s)for(var f in l.data.config)s[f]=l.data.config[f];break;case"update":var h=l.data.steps;if(s){for(var u=0;u<h;u++)s.update();for(var d=s.nodes.length,c=new Float32Array(d*2),u=0;u<d;u++){var m=s.nodes[u];c[u*2]=m.position[0],c[u*2+1]=m.position[1]}self.postMessage({buffer:c.buffer,globalSpeed:s.getGlobalSpeed()},[c.buffer])}else{var p=new Float32Array;self.postMessage({buffer:p.buffer,globalSpeed:s.getGlobalSpeed()},[p.buffer])}break}}}var Au=hp;var $i=Au.toString();$i=$i.slice($i.indexOf("{")+1,$i.lastIndexOf("}"));var en={barnesHutOptimize:!0,barnesHutTheta:1.5,repulsionByDegree:!0,linLogMode:!1,strongGravityMode:!1,gravity:1,scaling:1,edgeWeightInfluence:1,jitterTolerence:.1,preventOverlap:!1,dissuadeHubs:!1,gravityCenter:null},Dt=function(e){for(var t in en)this[t]=en[t];if(e)for(var t in e)this[t]=e[t];this._nodes=[],this._edges=[],this._disposed=!1,this._positionTex=new j({type:V.FLOAT,flipY:!1,minFilter:V.NEAREST,magFilter:V.NEAREST})};Dt.prototype.initData=function(e,t){var r=new Blob([$i]),i=window.URL.createObjectURL(r);this._worker=new Worker(i),this._worker.onmessage=this._$onupdate.bind(this),this._nodes=e,this._edges=t,this._frame=0;for(var n=e.length,a=t.length,o=new Float32Array(n*2),s=new Float32Array(n),l=new Float32Array(n),f=new Float32Array(a*2),h=new Float32Array(a),u=0;u<e.length;u++){var d=e[u];o[u*2]=d.x,o[u*2+1]=d.y,s[u]=d.mass==null?1:d.mass,l[u]=d.size==null?1:d.size}for(var u=0;u<t.length;u++){var c=t[u],m=c.node1,p=c.node2;f[u*2]=m,f[u*2+1]=p,h[u]=c.weight==null?1:c.weight}var v=Math.ceil(Math.sqrt(e.length)),g=v,y=new Float32Array(v*g*4),x=this._positionTex;x.width=v,x.height=g,x.pixels=y,this._worker.postMessage({cmd:"init",nodesPosition:o,nodesMass:s,nodesSize:l,edges:f,edgesWeight:h}),this._globalSpeed=1/0};Dt.prototype.updateOption=function(e){var t={};for(var r in en)t[r]=en[r];var i=this._nodes,n=this._edges,a=i.length;if(a>5e4?t.jitterTolerence=10:a>5e3?t.jitterTolerence=1:t.jitterTolerence=.1,a>100?t.scaling=2:t.scaling=10,a>1e3?t.barnesHutOptimize=!0:t.barnesHutOptimize=!1,e)for(var r in en)e[r]!=null&&(t[r]=e[r]);if(!t.gravityCenter){for(var o=[1/0,1/0],s=[-1/0,-1/0],l=0;l<i.length;l++)o[0]=Math.min(i[l].x,o[0]),o[1]=Math.min(i[l].y,o[1]),s[0]=Math.max(i[l].x,s[0]),s[1]=Math.max(i[l].y,s[1]);t.gravityCenter=[(o[0]+s[0])*.5,(o[1]+s[1])*.5]}for(var l=0;l<n.length;l++){var f=n[l].node1,h=n[l].node2;i[f].degree=(i[f].degree||0)+1,i[h].degree=(i[h].degree||0)+1}this._worker&&this._worker.postMessage({cmd:"updateConfig",config:t})};Dt.prototype.update=function(e,t,r){t==null&&(t=1),t=Math.max(t,1),this._frame+=t,this._onupdate=r,this._worker&&this._worker.postMessage({cmd:"update",steps:Math.round(t)})};Dt.prototype._$onupdate=function(e){if(!this._disposed){var t=new Float32Array(e.data.buffer);this._globalSpeed=e.data.globalSpeed,this._positionArr=t,this._updateTexture(t),this._onupdate&&this._onupdate()}};Dt.prototype.getNodePositionTexture=function(){return this._positionTex};Dt.prototype.getNodeUV=function(e,t){t=t||[];var r=this._positionTex.width,i=this._positionTex.height;return t[0]=e%r/(r-1),t[1]=Math.floor(e/r)/(i-1),t};Dt.prototype.getNodes=function(){return this._nodes};Dt.prototype.getEdges=function(){return this._edges};Dt.prototype.isFinished=function(e){return this._frame>e};Dt.prototype.getNodePosition=function(e,t){if(t||(t=new Float32Array(this._nodes.length*2)),this._positionArr)for(var r=0;r<this._positionArr.length;r++)t[r]=this._positionArr[r];return t};Dt.prototype._updateTexture=function(e){for(var t=this._positionTex.pixels,r=0,i=0;i<e.length;)t[r++]=e[i++],t[r++]=e[i++],t[r++]=1,t[r++]=1;this._positionTex.dirty()};Dt.prototype.dispose=function(e){this._disposed=!0,this._worker=null};var Ro=Dt;var up=xe.extend(function(){return{zr:null,viewGL:null,minZoom:.2,maxZoom:5,_needsUpdate:!1,_dx:0,_dy:0,_zoom:1}},function(){this._mouseDownHandler=this._mouseDownHandler.bind(this),this._mouseWheelHandler=this._mouseWheelHandler.bind(this),this._mouseMoveHandler=this._mouseMoveHandler.bind(this),this._mouseUpHandler=this._mouseUpHandler.bind(this),this._update=this._update.bind(this)},{init:function(){var e=this.zr;e.on("mousedown",this._mouseDownHandler),e.on("mousewheel",this._mouseWheelHandler),e.on("globalout",this._mouseUpHandler),e.animation.on("frame",this._update)},setTarget:function(e){this._target=e},setZoom:function(e){this._zoom=Math.max(Math.min(e,this.maxZoom),this.minZoom),this._needsUpdate=!0},setOffset:function(e){this._dx=e[0],this._dy=e[1],this._needsUpdate=!0},getZoom:function(){return this._zoom},getOffset:function(){return[this._dx,this._dy]},_update:function(){if(this._target&&this._needsUpdate){var e=this._target,t=this._zoom;e.position.x=this._dx,e.position.y=this._dy,e.scale.set(t,t,t),this.zr.refresh(),this._needsUpdate=!1,this.trigger("update")}},_mouseDownHandler:function(e){if(!e.target){var t=e.offsetX,r=e.offsetY;if(!(this.viewGL&&!this.viewGL.containPoint(t,r))){this.zr.on("mousemove",this._mouseMoveHandler),this.zr.on("mouseup",this._mouseUpHandler);var i=this._convertPos(t,r);this._x=i.x,this._y=i.y}}},_convertPos:function(e,t){var r=this.viewGL.camera,i=this.viewGL.viewport;return{x:(e-i.x)/i.width*(r.right-r.left)+r.left,y:(t-i.y)/i.height*(r.bottom-r.top)+r.top}},_mouseMoveHandler:function(e){var t=this._convertPos(e.offsetX,e.offsetY);this._dx+=t.x-this._x,this._dy+=t.y-this._y,this._x=t.x,this._y=t.y,this._needsUpdate=!0},_mouseUpHandler:function(e){this.zr.off("mousemove",this._mouseMoveHandler),this.zr.off("mouseup",this._mouseUpHandler)},_mouseWheelHandler:function(e){e=e.event;var t=e.wheelDelta||-e.detail;if(t!==0){var r=e.offsetX,i=e.offsetY;if(!(this.viewGL&&!this.viewGL.containPoint(r,i))){var n=t>0?1.1:.9,a=Math.max(Math.min(this._zoom*n,this.maxZoom),this.minZoom);n=a/this._zoom;var o=this._convertPos(r,i),s=(o.x-this._dx)*(n-1),l=(o.y-this._dy)*(n-1);this._dx-=s,this._dy-=l,this._zoom=a,this._needsUpdate=!0}}},dispose:function(){var e=this.zr;e.off("mousedown",this._mouseDownHandler),e.off("mousemove",this._mouseMoveHandler),e.off("mouseup",this._mouseUpHandler),e.off("mousewheel",this._mouseWheelHandler),e.off("globalout",this._mouseUpHandler),e.animation.off("frame",this._update)}}),bu=up;var Lu=`@export ecgl.lines2D.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec2 position: POSITION;
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;

#ifdef POSITIONTEXTURE_ENABLED
uniform sampler2D positionTexture;
#endif

void main()
{
 gl_Position = worldViewProjection * vec4(position, -10.0, 1.0);

 v_Color = a_Color;
}

@end

@export ecgl.lines2D.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

varying vec4 v_Color;

void main()
{
 gl_FragColor = color * v_Color;
}
@end


@export ecgl.meshLines2D.vertex

attribute vec2 position: POSITION;
attribute vec2 normal;
attribute float offset;
attribute vec4 a_Color : COLOR;

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform vec4 viewport : VIEWPORT;

varying vec4 v_Color;
varying float v_Miter;

void main()
{
 vec4 p2 = worldViewProjection * vec4(position + normal, -10.0, 1.0);
 gl_Position = worldViewProjection * vec4(position, -10.0, 1.0);

 p2.xy /= p2.w;
 gl_Position.xy /= gl_Position.w;

 vec2 N = normalize(p2.xy - gl_Position.xy);
 gl_Position.xy += N * offset / viewport.zw * 2.0;

 gl_Position.xy *= gl_Position.w;

 v_Color = a_Color;
}
@end


@export ecgl.meshLines2D.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

varying vec4 v_Color;
varying float v_Miter;

void main()
{
 gl_FragColor = color * v_Color;
}

@end`;var fa=ae.vec2;T.Shader.import(Lu);var cp=1,Du=We.extend({type:"graphGL",__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node,this.viewGL=new ut("orthographic"),this.viewGL.camera.left=this.viewGL.camera.right=0,this.viewGL.add(this.groupGL),this._pointsBuilder=new Lr(!0,t),this._forceEdgesMesh=new T.Mesh({material:new T.Material({shader:T.createShader("ecgl.forceAtlas2.edges"),transparent:!0,depthMask:!1,depthTest:!1}),$ignorePicking:!0,geometry:new T.Geometry({attributes:{node:new T.Geometry.Attribute("node","float",2),color:new T.Geometry.Attribute("color","float",4,"COLOR")},dynamic:!0,mainAttribute:"node"}),renderOrder:-1,mode:T.Mesh.LINES}),this._edgesMesh=new T.Mesh({material:new T.Material({shader:T.createShader("ecgl.meshLines2D"),transparent:!0,depthMask:!1,depthTest:!1}),$ignorePicking:!0,geometry:new sa({useNativeLine:!1,dynamic:!0}),renderOrder:-1,culling:!1}),this._layoutId=0,this._control=new bu({zr:t.getZr(),viewGL:this.viewGL}),this._control.setTarget(this.groupGL),this._control.init(),this._clickHandler=this._clickHandler.bind(this)},render:function(e,t,r){this.groupGL.add(this._pointsBuilder.rootNode),this._model=e,this._api=r,this._initLayout(e,t,r),this._pointsBuilder.update(e,t,r),this._forceLayoutInstance instanceof la||this.groupGL.remove(this._forceEdgesMesh),this._updateCamera(e,r),this._control.off("update"),this._control.on("update",function(){r.dispatchAction({type:"graphGLRoam",seriesId:e.id,zoom:this._control.getZoom(),offset:this._control.getOffset()}),this._pointsBuilder.updateView(this.viewGL.camera)},this),this._control.setZoom(Z.firstNotNull(e.get("zoom"),1)),this._control.setOffset(e.get("offset")||[0,0]);var i=this._pointsBuilder.getPointsMesh();if(i.off("mousemove",this._mousemoveHandler),i.off("mouseout",this._mouseOutHandler,this),r.getZr().off("click",this._clickHandler),this._pointsBuilder.highlightOnMouseover=!0,e.get("focusNodeAdjacency")){var n=e.get("focusNodeAdjacencyOn");n==="click"?r.getZr().on("click",this._clickHandler):n==="mouseover"&&(i.on("mousemove",this._mousemoveHandler,this),i.on("mouseout",this._mouseOutHandler,this),this._pointsBuilder.highlightOnMouseover=!1)}this._lastMouseOverDataIndex=-1},_clickHandler:function(e){if(!this._layouting){var t=this._pointsBuilder.getPointsMesh().dataIndex;t>=0?this._api.dispatchAction({type:"graphGLFocusNodeAdjacency",seriesId:this._model.id,dataIndex:t}):this._api.dispatchAction({type:"graphGLUnfocusNodeAdjacency",seriesId:this._model.id})}},_mousemoveHandler:function(e){if(!this._layouting){var t=this._pointsBuilder.getPointsMesh().dataIndex;t>=0?t!==this._lastMouseOverDataIndex&&this._api.dispatchAction({type:"graphGLFocusNodeAdjacency",seriesId:this._model.id,dataIndex:t}):this._mouseOutHandler(e),this._lastMouseOverDataIndex=t}},_mouseOutHandler:function(e){this._layouting||(this._api.dispatchAction({type:"graphGLUnfocusNodeAdjacency",seriesId:this._model.id}),this._lastMouseOverDataIndex=-1)},_updateForceEdgesGeometry:function(e,t){var r=this._forceEdgesMesh.geometry,i=t.getEdgeData(),n=0,a=this._forceLayoutInstance,o=i.count()*2;r.attributes.node.init(o),r.attributes.color.init(o),i.each(function(s){var l=e[s];r.attributes.node.set(n,a.getNodeUV(l.node1)),r.attributes.node.set(n+1,a.getNodeUV(l.node2));var f=Te(i,l.dataIndex),h=T.parseColor(f);h[3]*=Z.firstNotNull(Ae(i,l.dataIndex),1),r.attributes.color.set(n,h),r.attributes.color.set(n+1,h),n+=2}),r.dirty()},_updateMeshLinesGeometry:function(){var t=this._model.getEdgeData(),e=this._edgesMesh.geometry,t=this._model.getEdgeData(),r=this._model.getData().getLayout("points");e.resetOffset(),e.setVertexCount(t.count()*e.getLineVertexCount()),e.setTriangleCount(t.count()*e.getLineTriangleCount());var i=[],n=[],a=["lineStyle","width"];this._originalEdgeColors=new Float32Array(t.count()*4),this._edgeIndicesMap=new Float32Array(t.count()),t.each(function(o){var s=t.graph.getEdgeByIndex(o),l=s.node1.dataIndex*2,f=s.node2.dataIndex*2;i[0]=r[l],i[1]=r[l+1],n[0]=r[f],n[1]=r[f+1];var h=Te(t,s.dataIndex),u=T.parseColor(h);u[3]*=Z.firstNotNull(Ae(t,s.dataIndex),1);var d=t.getItemModel(s.dataIndex),c=Z.firstNotNull(d.get(a),1)*this._api.getDevicePixelRatio();e.addLine(i,n,u,c);for(var m=0;m<4;m++)this._originalEdgeColors[s.dataIndex*4+m]=u[m];this._edgeIndicesMap[s.dataIndex]=o},this),e.dirty()},_updateForceNodesGeometry:function(e){for(var t=this._pointsBuilder.getPointsMesh(),r=[],i=0;i<e.count();i++)this._forceLayoutInstance.getNodeUV(i,r),t.geometry.attributes.position.set(i,r);t.geometry.dirty("position")},_initLayout:function(e,t,r){var i=e.get("layout"),n=e.getGraph(),a=e.getBoxLayoutParams(),o=hr(a,{width:r.getWidth(),height:r.getHeight()});i==="force"&&(i="forceAtlas2"),this.stopLayout(e,t,r,{beforeLayout:!0});var s=e.getData(),l=e.getData();if(i==="forceAtlas2"){var f=e.getModel("forceAtlas2"),h=this._forceLayoutInstance,u=[],d=[],c=s.getDataExtent("value"),m=l.getDataExtent("value"),p=Z.firstNotNull(f.get("edgeWeight"),1),v=Z.firstNotNull(f.get("nodeWeight"),1);typeof p=="number"&&(p=[p,p]),typeof v=="number"&&(v=[v,v]);var g=0,y={},x=new Float32Array(s.count()*2);if(n.eachNode(function(S){var E=S.dataIndex,b=s.get("value",E),A,L;if(s.hasItemOption){var P=s.getItemModel(E);A=P.get("x"),L=P.get("y")}A==null&&(A=o.x+Math.random()*o.width,L=o.y+Math.random()*o.height),x[g*2]=A,x[g*2+1]=L,y[S.id]=g++;var C=wt.linearMap(b,c,v);isNaN(C)&&(isNaN(v[0])?C=1:C=v[0]),u.push({x:A,y:L,mass:C,size:s.getItemVisual(E,"symbolSize")})}),s.setLayout("points",x),n.eachEdge(function(S){var E=S.dataIndex,b=s.get("value",E),A=wt.linearMap(b,m,p);isNaN(A)&&(isNaN(p[0])?A=1:A=p[0]),d.push({node1:y[S.node1.id],node2:y[S.node2.id],weight:A,dataIndex:E})}),!h){var _=f.get("GPU");this._forceLayoutInstance&&(_&&!(this._forceLayoutInstance instanceof la)||!_&&!(this._forceLayoutInstance instanceof Ro))&&(this._forceLayoutInstanceToDispose=this._forceLayoutInstance),h=this._forceLayoutInstance=_?new la:new Ro}h.initData(u,d),h.updateOption(f.option),this._updateForceEdgesGeometry(h.getEdges(),e),this._updatePositionTexture(),r.dispatchAction({type:"graphGLStartLayout",from:this.uid})}else{var x=new Float32Array(s.count()*2),g=0;n.eachNode(function(b){var A=b.dataIndex,L,P;if(s.hasItemOption){var C=s.getItemModel(A);L=C.get("x"),P=C.get("y")}x[g++]=L,x[g++]=P}),s.setLayout("points",x),this._updateAfterLayout(e,t,r)}},_updatePositionTexture:function(){var e=this._forceLayoutInstance.getNodePositionTexture();this._pointsBuilder.setPositionTexture(e),this._forceEdgesMesh.material.set("positionTex",e)},startLayout:function(e,t,a,i){if(!(i&&i.from!=null&&i.from!==this.uid)){var n=this.viewGL,a=this._api,o=this._forceLayoutInstance,s=this._model.getData(),l=this._model.getModel("forceAtlas2");if(o&&(this.groupGL.remove(this._edgesMesh),this.groupGL.add(this._forceEdgesMesh),!!this._forceLayoutInstance)){this._updateForceNodesGeometry(e.getData()),this._pointsBuilder.hideLabels();var f=this,h=this._layoutId=cp++,u=l.getShallow("maxSteps"),d=l.getShallow("steps"),c=0,m=Math.max(d*2,20),p=function(v){if(v===f._layoutId){if(o.isFinished(u)){a.dispatchAction({type:"graphGLStopLayout",from:f.uid}),a.dispatchAction({type:"graphGLFinishLayout",points:s.getLayout("points"),from:f.uid});return}o.update(n.layer.renderer,d,function(){f._updatePositionTexture(),c+=d,c>=m&&(f._syncNodePosition(e),c=0),a.getZr().refresh(),Ai(function(){p(v)})})}};Ai(function(){f._forceLayoutInstanceToDispose&&(f._forceLayoutInstanceToDispose.dispose(n.layer.renderer),f._forceLayoutInstanceToDispose=null),p(h)}),this._layouting=!0}}},stopLayout:function(e,t,r,i){i&&i.from!=null&&i.from!==this.uid||(this._layoutId=0,this.groupGL.remove(this._forceEdgesMesh),this.groupGL.add(this._edgesMesh),this._forceLayoutInstance&&this.viewGL.layer&&(i&&i.beforeLayout||(this._syncNodePosition(e),this._updateAfterLayout(e,t,r)),this._api.getZr().refresh(),this._layouting=!1))},_syncNodePosition:function(e){var t=this._forceLayoutInstance.getNodePosition(this.viewGL.layer.renderer);e.getData().setLayout("points",t),e.setNodePosition(t)},_updateAfterLayout:function(e,t,r){this._updateMeshLinesGeometry(),this._pointsBuilder.removePositionTexture(),this._pointsBuilder.updateLayout(e,t,r),this._pointsBuilder.updateView(this.viewGL.camera),this._pointsBuilder.updateLabels(),this._pointsBuilder.showLabels()},focusNodeAdjacency:function(e,t,r,i){var n=this._model.getData();this._downplayAll();var a=i.dataIndex,o=n.graph,s=[],l=o.getNodeByIndex(a);s.push(l),l.edges.forEach(function(h){h.dataIndex<0||(h.node1!==l&&s.push(h.node1),h.node2!==l&&s.push(h.node2))},this),this._pointsBuilder.fadeOutAll(.05),this._fadeOutEdgesAll(.05),s.forEach(function(h){this._pointsBuilder.highlight(n,h.dataIndex)},this),this._pointsBuilder.updateLabels(s.map(function(h){return h.dataIndex}));var f=[];l.edges.forEach(function(h){h.dataIndex>=0&&(this._highlightEdge(h.dataIndex),f.push(h))},this),this._focusNodes=s,this._focusEdges=f},unfocusNodeAdjacency:function(e,t,r,i){this._downplayAll(),this._pointsBuilder.fadeInAll(),this._fadeInEdgesAll(),this._pointsBuilder.updateLabels()},_highlightEdge:function(e){var t=this._model.getEdgeData().getItemModel(e),r=T.parseColor(t.get("emphasis.lineStyle.color")||t.get("lineStyle.color")),i=Z.firstNotNull(t.get("emphasis.lineStyle.opacity"),t.get("lineStyle.opacity"),1);r[3]*=i,this._edgesMesh.geometry.setItemColor(this._edgeIndicesMap[e],r)},_downplayAll:function(){this._focusNodes&&this._focusNodes.forEach(function(e){this._pointsBuilder.downplay(this._model.getData(),e.dataIndex)},this),this._focusEdges&&this._focusEdges.forEach(function(e){this._downplayEdge(e.dataIndex)},this)},_downplayEdge:function(e){var t=this._getColor(e,[]);this._edgesMesh.geometry.setItemColor(this._edgeIndicesMap[e],t)},_setEdgeFade:(function(){var e=[];return function(t,r){this._getColor(t,e),e[3]*=r,this._edgesMesh.geometry.setItemColor(this._edgeIndicesMap[t],e)}})(),_getColor:function(e,t){for(var r=0;r<4;r++)t[r]=this._originalEdgeColors[e*4+r];return t},_fadeOutEdgesAll:function(e){var t=this._model.getData().graph;t.eachEdge(function(r){this._setEdgeFade(r.dataIndex,e)},this)},_fadeInEdgesAll:function(){this._fadeOutEdgesAll(1)},_updateCamera:function(e,t){this.viewGL.setViewport(0,0,t.getWidth(),t.getHeight(),t.getDevicePixelRatio());for(var r=this.viewGL.camera,i=e.getData(),n=i.getLayout("points"),a=fa.create(1/0,1/0),o=fa.create(-1/0,-1/0),s=[],l=0;l<n.length;)s[0]=n[l++],s[1]=n[l++],fa.min(a,a,s),fa.max(o,o,s);var f=(o[1]+a[1])/2,h=(o[0]+a[0])/2;if(!(h>r.left&&h<r.right&&f<r.bottom&&f>r.top)){var u=Math.max(o[0]-a[0],10),d=u/t.getWidth()*t.getHeight();u*=1.4,d*=1.4,a[0]-=u*.2,r.left=a[0],r.top=f-d/2,r.bottom=f+d/2,r.right=u+a[0],r.near=0,r.far=100}},dispose:function(){var e=this.viewGL.layer.renderer;this._forceLayoutInstance&&this._forceLayoutInstance.dispose(e),this.groupGL.removeAll(),this._layoutId=-1,this._pointsBuilder.dispose()},remove:function(){this.groupGL.removeAll(),this._control.dispose()}});function ha(e){return e instanceof Array||(e=[e,e]),e}function Cu(e){e.registerChartView(Du),e.registerSeriesModel(Tu),e.registerVisual(function(r){let i={};r.eachSeriesByType("graphGL",function(n){var a=n.getCategoriesData(),o=n.getData(),s={};a.each(function(l){var f=a.getName(l);s["ec-"+f]=l;var h=a.getItemModel(l),u=h.getModel("itemStyle").getItemStyle();u.fill||(u.fill=n.getColorFromPalette(f,i)),a.setItemVisual(l,"style",u);var d=["symbol","symbolSize","symbolKeepAspect"];for(let m=0;m<d.length;m++){var c=h.getShallow(d[m],!0);c!=null&&a.setItemVisual(l,d[m],c)}}),a.count()&&o.each(function(l){var f=o.getItemModel(l);let h=f.getShallow("category");if(h!=null){typeof h=="string"&&(h=s["ec-"+h]);var u=a.getItemVisual(h,"style"),d=o.ensureUniqueItemVisual(l,"style");N.extend(d,u);var c=["symbol","symbolSize","symbolKeepAspect"];for(let m=0;m<c.length;m++)o.setItemVisual(l,c[m],a.getItemVisual(h,c[m]))}})})}),e.registerVisual(function(r){r.eachSeriesByType("graphGL",function(i){var n=i.getGraph(),a=i.getEdgeData(),o=ha(i.get("edgeSymbol")),s=ha(i.get("edgeSymbolSize"));a.setVisual("drawType","stroke"),a.setVisual("fromSymbol",o&&o[0]),a.setVisual("toSymbol",o&&o[1]),a.setVisual("fromSymbolSize",s&&s[0]),a.setVisual("toSymbolSize",s&&s[1]),a.setVisual("style",i.getModel("lineStyle").getLineStyle()),a.each(function(l){var f=a.getItemModel(l),h=n.getEdgeByIndex(l),u=ha(f.getShallow("symbol",!0)),d=ha(f.getShallow("symbolSize",!0)),c=f.getModel("lineStyle").getLineStyle(),m=a.ensureUniqueItemVisual(l,"style");switch(N.extend(m,c),m.stroke){case"source":{var p=h.node1.getVisual("style");m.stroke=p&&p.fill;break}case"target":{var p=h.node2.getVisual("style");m.stroke=p&&p.fill;break}}u[0]&&h.setVisual("fromSymbol",u[0]),u[1]&&h.setVisual("toSymbol",u[1]),d[0]&&h.setVisual("fromSymbolSize",d[0]),d[1]&&h.setVisual("toSymbolSize",d[1])})})}),e.registerAction({type:"graphGLRoam",event:"graphglroam",update:"series.graphGL:roam"},function(r,i){i.eachComponent({mainType:"series",query:r},function(n){n.setView(r)})});function t(){}e.registerAction({type:"graphGLStartLayout",event:"graphgllayoutstarted",update:"series.graphGL:startLayout"},t),e.registerAction({type:"graphGLStopLayout",event:"graphgllayoutstopped",update:"series.graphGL:stopLayout"},t),e.registerAction({type:"graphGLFocusNodeAdjacency",event:"graphGLFocusNodeAdjacency",update:"series.graphGL:focusNodeAdjacency"},t),e.registerAction({type:"graphGLUnfocusNodeAdjacency",event:"graphGLUnfocusNodeAdjacency",update:"series.graphGL:unfocusNodeAdjacency"},t)}de(Cu);var Mu=ke.extend({type:"series.flowGL",dependencies:["geo","grid","bmap"],visualStyleAccessPath:"itemStyle",getInitialData:function(e,t){var r=this.get("coordinateSystem"),i=r==="geo"?["lng","lat"]:rn(r)||["x","y"];i.push("vx","vy");var n=Ee.createDimensions(this.getSource(),{coordDimensions:i,encodeDefine:this.get("encode"),dimensionsDefine:this.get("dimensions")}),a=new rt(n,this);return a.initData(this.getSource()),a},defaultOption:{coordinateSystem:"cartesian2d",zlevel:10,supersampling:1,particleType:"point",particleDensity:128,particleSize:1,particleSpeed:1,particleTrail:2,colorTexture:null,gridWidth:"auto",gridHeight:"auto",itemStyle:{color:"#fff",opacity:.8}}});var dp=ee.extend(function(){return{dynamic:!0,attributes:{position:new ee.Attribute("position","float",3,"POSITION")}}},{resetOffset:function(){this._vertexOffset=0,this._faceOffset=0},setLineCount:function(e){var t=this.attributes,r=4*e,i=2*e;this.vertexCount!==r&&t.position.init(r),this.triangleCount!==i&&(i===0?this.indices=null:this.indices=this.vertexCount>65535?new Uint32Array(i*3):new Uint16Array(i*3))},addLine:function(e){var t=this._vertexOffset;this.attributes.position.set(t,[e[0],e[1],1]),this.attributes.position.set(t+1,[e[0],e[1],-1]),this.attributes.position.set(t+2,[e[0],e[1],2]),this.attributes.position.set(t+3,[e[0],e[1],-2]),this.setTriangleIndices(this._faceOffset++,[t,t+1,t+2]),this.setTriangleIndices(this._faceOffset++,[t+1,t+2,t+3]),this._vertexOffset+=4}}),Pu=dp;var Nu=`@export ecgl.vfParticle.particle.fragment

uniform sampler2D particleTexture;
uniform sampler2D spawnTexture;
uniform sampler2D velocityTexture;

uniform float deltaTime;
uniform float elapsedTime;

uniform float speedScaling : 1.0;

uniform vec2 textureSize;
uniform vec4 region : [0, 0, 1, 1];
uniform float firstFrameTime;

varying vec2 v_Texcoord;


void main()
{
 vec4 p = texture2D(particleTexture, v_Texcoord);
 bool spawn = false;
 if (p.w <= 0.0) {
 p = texture2D(spawnTexture, fract(v_Texcoord + elapsedTime / 10.0));
 p.w -= firstFrameTime;
 spawn = true;
 }
 vec2 v = texture2D(velocityTexture, fract(p.xy * region.zw + region.xy)).xy;
 v = (v - 0.5) * 2.0;
 p.z = length(v);
 p.xy += v * deltaTime / 10.0 * speedScaling;
 p.w -= deltaTime;

 if (spawn || p.xy != fract(p.xy)) {
 p.z = 0.0;
 }
 p.xy = fract(p.xy);

 gl_FragColor = p;
}
@end

@export ecgl.vfParticle.renderPoints.vertex

#define PI 3.1415926

attribute vec2 texcoord : TEXCOORD_0;

uniform sampler2D particleTexture;
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

uniform float size : 1.0;

varying float v_Mag;
varying vec2 v_Uv;

void main()
{
 vec4 p = texture2D(particleTexture, texcoord);

 if (p.w > 0.0 && p.z > 1e-5) {
 gl_Position = worldViewProjection * vec4(p.xy * 2.0 - 1.0, 0.0, 1.0);
 }
 else {
 gl_Position = vec4(100000.0, 100000.0, 100000.0, 1.0);
 }

 v_Mag = p.z;
 v_Uv = p.xy;

 gl_PointSize = size;
}

@end

@export ecgl.vfParticle.renderPoints.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
uniform sampler2D gradientTexture;
uniform sampler2D colorTexture;
uniform sampler2D spriteTexture;

varying float v_Mag;
varying vec2 v_Uv;

void main()
{
 gl_FragColor = color;
#ifdef SPRITETEXTURE_ENABLED
 gl_FragColor *= texture2D(spriteTexture, gl_PointCoord);
 if (color.a == 0.0) {
 discard;
 }
#endif
#ifdef GRADIENTTEXTURE_ENABLED
 gl_FragColor *= texture2D(gradientTexture, vec2(v_Mag, 0.5));
#endif
#ifdef COLORTEXTURE_ENABLED
 gl_FragColor *= texture2D(colorTexture, v_Uv);
#endif
}

@end

@export ecgl.vfParticle.renderLines.vertex

#define PI 3.1415926

attribute vec3 position : POSITION;

uniform sampler2D particleTexture;
uniform sampler2D prevParticleTexture;

uniform float size : 1.0;
uniform vec4 vp: VIEWPORT;
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

varying float v_Mag;
varying vec2 v_Uv;

@import clay.util.rand

void main()
{
 vec4 p = texture2D(particleTexture, position.xy);
 vec4 p2 = texture2D(prevParticleTexture, position.xy);

 p.xy = p.xy * 2.0 - 1.0;
 p2.xy = p2.xy * 2.0 - 1.0;

 if (p.w > 0.0 && p.z > 1e-5) {
 vec2 dir = normalize(p.xy - p2.xy);
 vec2 norm = vec2(dir.y / vp.z, -dir.x / vp.w) * sign(position.z) * size;
 if (abs(position.z) == 2.0) {
 gl_Position = vec4(p.xy + norm, 0.0, 1.0);
 v_Uv = p.xy;
 v_Mag = p.z;
 }
 else {
 gl_Position = vec4(p2.xy + norm, 0.0, 1.0);
 v_Mag = p2.z;
 v_Uv = p2.xy;
 }
 gl_Position = worldViewProjection * gl_Position;
 }
 else {
 gl_Position = vec4(100000.0, 100000.0, 100000.0, 1.0);
 }
}

@end

@export ecgl.vfParticle.renderLines.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
uniform sampler2D gradientTexture;
uniform sampler2D colorTexture;

varying float v_Mag;
varying vec2 v_Uv;

void main()
{
 gl_FragColor = color;
 #ifdef GRADIENTTEXTURE_ENABLED
 gl_FragColor *= texture2D(gradientTexture, vec2(v_Mag, 0.5));
#endif
#ifdef COLORTEXTURE_ENABLED
 gl_FragColor *= texture2D(colorTexture, v_Uv);
#endif
}

@end
`;F.import(Nu);function mp(e){var t=document.createElement("canvas");t.width=t.height=e;var r=t.getContext("2d");return r.fillStyle="#fff",r.arc(e/2,e/2,e/2,0,Math.PI*2),r.fill(),t}var Io=function(){this.motionBlurFactor=.99,this.vectorFieldTexture=new j({type:V.FLOAT,flipY:!1}),this.particleLife=[5,20],this._particleType="point",this._particleSize=1,this.particleColor=[1,1,1,1],this.particleSpeedScaling=1,this._thisFrameTexture=null,this._particlePass=null,this._spawnTexture=null,this._particleTexture0=null,this._particleTexture1=null,this._particlePointsMesh=null,this._surfaceFrameBuffer=null,this._elapsedTime=0,this._scene=null,this._camera=null,this._lastFrameTexture=null,this._supersampling=1,this._downsampleTextures=[],this._width=512,this._height=512,this.init()};Io.prototype={constructor:Io,init:function(){var e={type:V.FLOAT,minFilter:V.NEAREST,magFilter:V.NEAREST,useMipmap:!1};this._spawnTexture=new j(e),this._particleTexture0=new j(e),this._particleTexture1=new j(e),this._frameBuffer=new ve({depthBuffer:!1}),this._particlePass=new ge({fragment:F.source("ecgl.vfParticle.particle.fragment")}),this._particlePass.setUniform("velocityTexture",this.vectorFieldTexture),this._particlePass.setUniform("spawnTexture",this._spawnTexture),this._downsamplePass=new ge({fragment:F.source("clay.compositor.downsample")});var t=new Vt({renderOrder:10,material:new Ye({shader:new F(F.source("ecgl.vfParticle.renderPoints.vertex"),F.source("ecgl.vfParticle.renderPoints.fragment"))}),mode:Vt.POINTS,geometry:new ee({dynamic:!0,mainAttribute:"texcoord0"})}),r=new Vt({renderOrder:10,material:new Ye({shader:new F(F.source("ecgl.vfParticle.renderLines.vertex"),F.source("ecgl.vfParticle.renderLines.fragment"))}),geometry:new Pu,culling:!1}),i=new Vt({material:new Ye({shader:new F(F.source("ecgl.color.vertex"),F.source("ecgl.color.fragment"))}),geometry:new gr});i.material.enableTexture("diffuseMap"),this._particlePointsMesh=t,this._particleLinesMesh=r,this._lastFrameFullQuadMesh=i,this._camera=new kt,this._thisFrameTexture=new j,this._lastFrameTexture=new j},setParticleDensity:function(e,t){for(var r=e*t,i=new Float32Array(r*4),n=0,a=this.particleLife,o=0;o<e;o++)for(var s=0;s<t;s++,n++){i[n*4]=Math.random(),i[n*4+1]=Math.random(),i[n*4+2]=Math.random();var l=(a[1]-a[0])*Math.random()+a[0];i[n*4+3]=l}this._particleType==="line"?this._setLineGeometry(e,t):this._setPointsGeometry(e,t),this._spawnTexture.width=e,this._spawnTexture.height=t,this._spawnTexture.pixels=i,this._particleTexture0.width=this._particleTexture1.width=e,this._particleTexture0.height=this._particleTexture1.height=t,this._particlePass.setUniform("textureSize",[e,t])},_setPointsGeometry:function(e,t){var r=e*t,i=this._particlePointsMesh.geometry,n=i.attributes;n.texcoord0.init(r);for(var a=0,o=0;o<e;o++)for(var s=0;s<t;s++,a++)n.texcoord0.value[a*2]=o/e,n.texcoord0.value[a*2+1]=s/t;i.dirty()},_setLineGeometry:function(e,t){var r=e*t,i=this._getParticleMesh().geometry;i.setLineCount(r),i.resetOffset();for(var n=0;n<e;n++)for(var a=0;a<t;a++)i.addLine([n/e,a/t]);i.dirty()},_getParticleMesh:function(){return this._particleType==="line"?this._particleLinesMesh:this._particlePointsMesh},update:function(e,t,r,i){var n=this._getParticleMesh(),a=this._frameBuffer,o=this._particlePass;i&&this._updateDownsampleTextures(e,t),n.material.set("size",this._particleSize*this._supersampling),n.material.set("color",this.particleColor),o.setUniform("speedScaling",this.particleSpeedScaling),a.attach(this._particleTexture1),o.setUniform("firstFrameTime",i?(this.particleLife[1]+this.particleLife[0])/2:0),o.setUniform("particleTexture",this._particleTexture0),o.setUniform("deltaTime",r),o.setUniform("elapsedTime",this._elapsedTime),o.render(e,a),n.material.set("particleTexture",this._particleTexture1),n.material.set("prevParticleTexture",this._particleTexture0),a.attach(this._thisFrameTexture),a.bind(e),e.gl.clear(e.gl.DEPTH_BUFFER_BIT|e.gl.COLOR_BUFFER_BIT);var s=this._lastFrameFullQuadMesh;s.material.set("diffuseMap",this._lastFrameTexture),s.material.set("color",[1,1,1,this.motionBlurFactor]),this._camera.update(!0),e.renderPass([s,n],this._camera),a.unbind(e),this._downsample(e),this._swapTexture(),this._elapsedTime+=r},_downsample:function(e){var t=this._downsampleTextures;if(t.length!==0)for(var r=0,i=this._thisFrameTexture,n=t[r];n;)this._frameBuffer.attach(n),this._downsamplePass.setUniform("texture",i),this._downsamplePass.setUniform("textureSize",[i.width,i.height]),this._downsamplePass.render(e,this._frameBuffer),i=n,n=t[++r]},getSurfaceTexture:function(){var e=this._downsampleTextures;return e.length>0?e[e.length-1]:this._lastFrameTexture},setRegion:function(e){this._particlePass.setUniform("region",e)},resize:function(e,t){this._lastFrameTexture.width=e*this._supersampling,this._lastFrameTexture.height=t*this._supersampling,this._thisFrameTexture.width=e*this._supersampling,this._thisFrameTexture.height=t*this._supersampling,this._width=e,this._height=t},setParticleSize:function(e){var t=this._getParticleMesh();if(e<=2){t.material.disableTexture("spriteTexture"),t.material.transparent=!1;return}this._spriteTexture||(this._spriteTexture=new j),(!this._spriteTexture.image||this._spriteTexture.image.width!==e)&&(this._spriteTexture.image=mp(e),this._spriteTexture.dirty()),t.material.transparent=!0,t.material.enableTexture("spriteTexture"),t.material.set("spriteTexture",this._spriteTexture),this._particleSize=e},setGradientTexture:function(e){var t=this._getParticleMesh().material;t[e?"enableTexture":"disableTexture"]("gradientTexture"),t.setUniform("gradientTexture",e)},setColorTextureImage:function(e,t){var r=this._getParticleMesh().material;r.setTextureImage("colorTexture",e,t,{flipY:!0})},setParticleType:function(e){this._particleType=e},clearFrame:function(e){var t=this._frameBuffer;t.attach(this._lastFrameTexture),t.bind(e),e.gl.clear(e.gl.DEPTH_BUFFER_BIT|e.gl.COLOR_BUFFER_BIT),t.unbind(e)},setSupersampling:function(e){this._supersampling=e,this.resize(this._width,this._height)},_updateDownsampleTextures:function(e,t){for(var r=this._downsampleTextures,i=Math.max(Math.floor(Math.log(this._supersampling/t.getDevicePixelRatio())/Math.log(2)),0),n=2,a=this._width*this._supersampling,o=this._height*this._supersampling,s=0;s<i;s++)r[s]=r[s]||new j,r[s].width=a/n,r[s].height=o/n,n*=2;for(;s<r.length;s++)r[s].dispose(e);r.length=i},_swapTexture:function(){var e=this._particleTexture0;this._particleTexture0=this._particleTexture1,this._particleTexture1=e;var e=this._thisFrameTexture;this._thisFrameTexture=this._lastFrameTexture,this._lastFrameTexture=e},dispose:function(e){e.disposeFrameBuffer(this._frameBuffer),e.disposeTexture(this.vectorFieldTexture),e.disposeTexture(this._spawnTexture),e.disposeTexture(this._particleTexture0),e.disposeTexture(this._particleTexture1),e.disposeTexture(this._thisFrameTexture),e.disposeTexture(this._lastFrameTexture),e.disposeGeometry(this._particleLinesMesh.geometry),e.disposeGeometry(this._particlePointsMesh.geometry),e.disposeGeometry(this._lastFrameFullQuadMesh.geometry),this._spriteTexture&&e.disposeTexture(this._spriteTexture),this._particlePass.dispose(e),this._downsamplePass.dispose(e),this._downsampleTextures.forEach(function(t){t.dispose(e)})}};var Ru=Io;var Iu=We.extend({type:"flowGL",__ecgl__:!0,init:function(e,t){this.viewGL=new ut("orthographic"),this.groupGL=new T.Node,this.viewGL.add(this.groupGL),this._particleSurface=new Ru;var r=new T.Mesh({geometry:new T.PlaneGeometry,material:new T.Material({shader:new T.Shader({vertex:T.Shader.source("ecgl.color.vertex"),fragment:T.Shader.source("ecgl.color.fragment")}),transparent:!0})});r.material.enableTexture("diffuseMap"),this.groupGL.add(r),this._planeMesh=r},render:function(e,t,r){var i=this._particleSurface;i.setParticleType(e.get("particleType")),i.setSupersampling(e.get("supersampling")),this._updateData(e,r),this._updateCamera(r.getWidth(),r.getHeight(),r.getDevicePixelRatio());var n=Z.firstNotNull(e.get("particleDensity"),128);i.setParticleDensity(n,n);var a=this._planeMesh,o=+new Date,s=this,l=!0;a.__percent=0,a.stopAnimation(),a.animate("",{loop:!0}).when(1e5,{__percent:1}).during(function(){var u=+new Date,d=Math.min(u-o,20);o=o+d,s._renderer&&(i.update(s._renderer,r,d/1e3,l),a.material.set("diffuseMap",i.getSurfaceTexture())),l=!1}).start();var f=e.getModel("itemStyle"),h=T.parseColor(f.get("color"));h[3]*=Z.firstNotNull(f.get("opacity"),1),a.material.set("color",h),i.setColorTextureImage(e.get("colorTexture"),r),i.setParticleSize(e.get("particleSize")),i.particleSpeedScaling=e.get("particleSpeed"),i.motionBlurFactor=1-Math.pow(.1,e.get("particleTrail"))},updateTransform:function(e,t,r){this._updateData(e,r)},afterRender:function(e,t,r,i){var n=i.renderer;this._renderer=n},_updateData:function(e,t){var r=e.coordinateSystem,i=r.dimensions.map(function(y){return e.coordDimToDataDim(y)[0]}),n=e.getData(),a=n.getDataExtent(i[0]),o=n.getDataExtent(i[1]),s=e.get("gridWidth"),l=e.get("gridHeight");if(s==null||s==="auto"){var f=(a[1]-a[0])/(o[1]-o[0]);s=Math.round(Math.sqrt(f*n.count()))}(l==null||l==="auto")&&(l=Math.ceil(n.count()/s));var h=this._particleSurface.vectorFieldTexture,u=h.pixels;if(!u||u.length!==l*s*4)u=h.pixels=new Float32Array(s*l*4);else for(var d=0;d<u.length;d++)u[d]=0;var c=0,m=1/0,p=new Float32Array(n.count()*2),v=0,g=[[1/0,1/0],[-1/0,-1/0]];n.each([i[0],i[1],"vx","vy"],function(y,x,_,S){var E=r.dataToPoint([y,x]);p[v++]=E[0],p[v++]=E[1],g[0][0]=Math.min(E[0],g[0][0]),g[0][1]=Math.min(E[1],g[0][1]),g[1][0]=Math.max(E[0],g[1][0]),g[1][1]=Math.max(E[1],g[1][1]);var b=Math.sqrt(_*_+S*S);c=Math.max(c,b),m=Math.min(m,b)}),n.each(["vx","vy"],function(y,x,_){var S=Math.round((p[_*2]-g[0][0])/(g[1][0]-g[0][0])*(s-1)),E=l-1-Math.round((p[_*2+1]-g[0][1])/(g[1][1]-g[0][1])*(l-1)),b=(E*s+S)*4;u[b]=y/c*.5+.5,u[b+1]=x/c*.5+.5,u[b+3]=1}),h.width=s,h.height=l,e.get("coordinateSystem")==="bmap"&&this._fillEmptyPixels(h),h.dirty(),this._updatePlanePosition(g[0],g[1],e,t),this._updateGradientTexture(n.getVisual("visualMeta"),[m,c])},_fillEmptyPixels:function(e){var t=e.pixels,r=e.width,i=e.height;function n(p,v,g){p=Math.max(Math.min(p,r-1),0),v=Math.max(Math.min(v,i-1),0);var y=(v*(r-1)+p)*4;return t[y+3]===0?!1:(g[0]=t[y],g[1]=t[y+1],!0)}function a(p,v,g){g[0]=p[0]+v[0],g[1]=p[1]+v[1]}for(var o=[],s=[],l=[],f=[],h=[],u=0,d=0;d<i;d++)for(var c=0;c<r;c++){var m=(d*(r-1)+c)*4;t[m+3]===0&&(u=o[0]=o[1]=0,n(c-1,d,s)&&(u++,a(s,o,o)),n(c+1,d,l)&&(u++,a(l,o,o)),n(c,d-1,f)&&(u++,a(f,o,o)),n(c,d+1,h)&&(u++,a(h,o,o)),o[0]/=u,o[1]/=u,t[m]=o[0],t[m+1]=o[1]),t[m+3]=1}},_updateGradientTexture:function(e,t){if(!e||!e.length){this._particleSurface.setGradientTexture(null);return}this._gradientTexture=this._gradientTexture||new T.Texture2D({image:document.createElement("canvas")});var r=this._gradientTexture,i=r.image;i.width=200,i.height=1;var n=i.getContext("2d"),a=n.createLinearGradient(0,.5,i.width,.5);e[0].stops.forEach(function(o){var s;t[1]===t[0]?s=0:(s=o.value/t[1],s=Math.min(Math.max(s,0),1)),a.addColorStop(s,o.color)}),n.fillStyle=a,n.fillRect(0,0,i.width,i.height),r.dirty(),this._particleSurface.setGradientTexture(this._gradientTexture)},_updatePlanePosition:function(e,t,r,i){var n=this._limitInViewportAndFullFill(e,t,r,i);e=n.leftTop,t=n.rightBottom,this._particleSurface.setRegion(n.region),this._planeMesh.position.set((e[0]+t[0])/2,i.getHeight()-(e[1]+t[1])/2,0);var a=t[0]-e[0],o=t[1]-e[1];this._planeMesh.scale.set(a/2,o/2,1),this._particleSurface.resize(Math.max(Math.min(a,2048),1),Math.max(Math.min(o,2048),1)),this._renderer&&this._particleSurface.clearFrame(this._renderer)},_limitInViewportAndFullFill:function(e,t,r,i){var n=[Math.max(e[0],0),Math.max(e[1],0)],a=[Math.min(t[0],i.getWidth()),Math.min(t[1],i.getHeight())];if(r.get("coordinateSystem")==="bmap"){var o=r.getData().getDataExtent(r.coordDimToDataDim("lng")[0]),s=Math.floor(o[1]-o[0])>=359;s&&(n[0]>0&&(n[0]=0),a[0]<i.getWidth()&&(a[0]=i.getWidth()))}var l=t[0]-e[0],f=t[1]-e[1],h=a[0]-n[0],u=a[1]-n[1],d=[(n[0]-e[0])/l,1-u/f-(n[1]-e[1])/f,h/l,u/f];return{leftTop:n,rightBottom:a,region:d}},_updateCamera:function(e,t,r){this.viewGL.setViewport(0,0,e,t,r);var i=this.viewGL.camera;i.left=i.bottom=0,i.top=t,i.right=e,i.near=0,i.far=100,i.position.z=10},remove:function(){this._planeMesh.stopAnimation(),this.groupGL.removeAll()},dispose:function(){this._renderer&&this._particleSurface.dispose(this._renderer),this.groupGL.removeAll()}});function Ou(e){e.registerChartView(Iu),e.registerSeriesModel(Mu)}de(Ou);var Oo=ke.extend({type:"series.linesGL",dependencies:["grid","geo"],visualStyleAccessPath:"lineStyle",visualDrawType:"stroke",streamEnabled:!0,init:function(e){var t=this._processFlatCoordsArray(e.data);this._flatCoords=t.flatCoords,this._flatCoordsOffset=t.flatCoordsOffset,t.flatCoords&&(e.data=new Float32Array(t.count)),Oo.superApply(this,"init",arguments)},mergeOption:function(e){var t=this._processFlatCoordsArray(e.data);this._flatCoords=t.flatCoords,this._flatCoordsOffset=t.flatCoordsOffset,t.flatCoords&&(e.data=new Float32Array(t.count)),Oo.superApply(this,"mergeOption",arguments)},appendData:function(e){var t=this._processFlatCoordsArray(e.data);t.flatCoords&&(this._flatCoords?(this._flatCoords=ca(this._flatCoords,t.flatCoords),this._flatCoordsOffset=ca(this._flatCoordsOffset,t.flatCoordsOffset)):(this._flatCoords=t.flatCoords,this._flatCoordsOffset=t.flatCoordsOffset),e.data=new Float32Array(t.count)),this.getRawData().appendData(e.data)},_getCoordsFromItemModel:function(e){var t=this.getData().getItemModel(e),r=t.option instanceof Array?t.option:t.getShallow("coords");return r},getLineCoordsCount:function(e){return this._flatCoordsOffset?this._flatCoordsOffset[e*2+1]:this._getCoordsFromItemModel(e).length},getLineCoords:function(e,t){if(this._flatCoordsOffset){for(var r=this._flatCoordsOffset[e*2],i=this._flatCoordsOffset[e*2+1],n=0;n<i;n++)t[n]=t[n]||[],t[n][0]=this._flatCoords[r+n*2],t[n][1]=this._flatCoords[r+n*2+1];return i}else{for(var a=this._getCoordsFromItemModel(e),n=0;n<a.length;n++)t[n]=t[n]||[],t[n][0]=a[n][0],t[n][1]=a[n][1];return a.length}},_processFlatCoordsArray:function(e){var t=0;if(this._flatCoords&&(t=this._flatCoords.length),typeof e[0]=="number"){for(var r=e.length,i=new Uint32Array(r),n=new Float64Array(r),a=0,o=0,s=0,l=0;l<r;){s++;var f=e[l++];i[o++]=a+t,i[o++]=f;for(var h=0;h<f;h++){var u=e[l++],d=e[l++];n[a++]=u,n[a++]=d,l>r}}return{flatCoordsOffset:new Uint32Array(i.buffer,0,o),flatCoords:n,count:s}}return{flatCoordsOffset:null,flatCoords:null,count:e.length}},getInitialData:function(e,t){var r=new rt(["value"],this);return r.hasItemOption=!1,r.initData(e.data,[],function(i,n,a,o){if(i instanceof Array)return NaN;r.hasItemOption=!0;var s=i.value;if(s!=null)return s instanceof Array?s[o]:s}),r},defaultOption:{coordinateSystem:"geo",zlevel:10,progressive:1e4,progressiveThreshold:5e4,blendMode:"source-over",lineStyle:{opacity:.8},postEffect:{enable:!1,colorCorrection:{exposure:0,brightness:0,contrast:1,saturation:1,enable:!0}}}}),Bu=Oo;var Fu=We.extend({type:"linesGL",__ecgl__:!0,init:function(e,t){this.groupGL=new T.Node,this.viewGL=new ut("orthographic"),this.viewGL.add(this.groupGL),this._glViewHelper=new oa(this.viewGL),this._nativeLinesShader=T.createShader("ecgl.lines3D"),this._meshLinesShader=T.createShader("ecgl.meshLines3D"),this._linesMeshes=[],this._currentStep=0},render:function(e,t,r){this.groupGL.removeAll(),this._glViewHelper.reset(e,r);var i=this._linesMeshes[0];i||(i=this._linesMeshes[0]=this._createLinesMesh(e)),this._linesMeshes.length=1,this.groupGL.add(i),this._updateLinesMesh(e,i,0,e.getData().count()),this.viewGL.setPostEffect(e.getModel("postEffect"),r)},incrementalPrepareRender:function(e,t,r){this.groupGL.removeAll(),this._glViewHelper.reset(e,r),this._currentStep=0,this.viewGL.setPostEffect(e.getModel("postEffect"),r)},incrementalRender:function(e,t,r,i){var n=this._linesMeshes[this._currentStep];n||(n=this._createLinesMesh(t),this._linesMeshes[this._currentStep]=n),this._updateLinesMesh(t,n,e.start,e.end),this.groupGL.add(n),i.getZr().refresh(),this._currentStep++},updateTransform:function(e,t,r){e.coordinateSystem.getRoamTransform&&this._glViewHelper.updateTransform(e,r)},_createLinesMesh:function(e){var t=new T.Mesh({$ignorePicking:!0,material:new T.Material({shader:T.createShader("ecgl.lines3D"),transparent:!0,depthMask:!1,depthTest:!1}),geometry:new sa({segmentScale:10,useNativeLine:!0,dynamic:!1}),mode:T.Mesh.LINES,culling:!1});return t},_updateLinesMesh:function(e,t,r,i){var n=e.getData();t.material.blend=e.get("blendMode")==="lighter"?T.additiveBlend:null;var a=e.get("lineStyle.curveness")||0,o=e.get("polyline"),s=t.geometry,l=e.coordinateSystem,f=Z.firstNotNull(e.get("lineStyle.width"),1);f>1?(t.material.shader!==this._meshLinesShader&&t.material.attachShader(this._meshLinesShader),t.mode=T.Mesh.TRIANGLES):(t.material.shader!==this._nativeLinesShader&&t.material.attachShader(this._nativeLinesShader),t.mode=T.Mesh.LINES),r=r||0,i=i||n.count(),s.resetOffset();var h=0,u=0,d=[],c=[],m=[],p=[],v=[],g=.3,y=.7;function x(){c[0]=d[0]*y+p[0]*g-(d[1]-p[1])*a,c[1]=d[1]*y+p[1]*g-(p[0]-d[0])*a,m[0]=d[0]*g+p[0]*y-(d[1]-p[1])*a,m[1]=d[1]*g+p[1]*y-(p[0]-d[0])*a}if(o||a!==0)for(var _=r;_<i;_++)if(o){var S=e.getLineCoordsCount(_);h+=s.getPolylineVertexCount(S),u+=s.getPolylineTriangleCount(S)}else e.getLineCoords(_,v),this._glViewHelper.dataToPoint(l,v[0],d),this._glViewHelper.dataToPoint(l,v[1],p),x(),h+=s.getCubicCurveVertexCount(d,c,m,p),u+=s.getCubicCurveTriangleCount(d,c,m,p);else{var E=i-r;h+=E*s.getLineVertexCount(),u+=E*s.getLineVertexCount()}s.setVertexCount(h),s.setTriangleCount(u);for(var b=r,A=[],_=r;_<i;_++){T.parseColor(Te(n,b),A);var L=Z.firstNotNull(Ae(n,b),1);A[3]*=L;for(var S=e.getLineCoords(_,v),P=0;P<S;P++)this._glViewHelper.dataToPoint(l,v[P],v[P]);o?s.addPolyline(v,A,f,0,S):a!==0?(d=v[0],p=v[1],x(),s.addCubicCurve(d,c,m,p,A,f)):s.addPolyline(v,A,f,0,2),b++}},dispose:function(){this.groupGL.removeAll()},remove:function(){this.groupGL.removeAll()}});function Gu(e){e.registerChartView(Fu),e.registerSeriesModel(Bu)}de(Gu);
