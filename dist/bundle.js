!function(e){var t={};function i(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(r,s,function(t){return e[t]}.bind(null,s));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=11)}([function(e,t){const i={empty:0,food:1,wall:2,mouth:3,producer:4,mover:5,killer:6,armor:7,colors:["#121D29","green","gray","orange","white","#3493eb","red","purple"],getRandomLivingType:function(){return Math.floor(5*Math.random())+3}};e.exports=i},function(e,t,i){const r=i(0),s=i(3);function o(e,t,i){null!=t&&t.type==r.food&&(i.changeCell(t.col,t.row,r.empty,null),e.owner.food_collected++)}function l(e,t){if(null!=t&&null!=t.owner&&null!=e.owner&&t.owner!=e.owner&&t.owner.living&&t.type!=r.armor){var i=t.type==r.killer;t.owner.harm(),i&&e.owner.harm()}}e.exports=class{constructor(e,t,i,r,s){this.owner=null,this.setType(e),this.col=t,this.row=i,this.x=r,this.y=s}setType(e){this.type=e}performFunction(e){switch(this.type){case r.mouth:!function(e,t){for(var i of s.edibleNeighbors){var r=t.grid_map.cellAt(e.col+i[0],e.row+i[1]);o(e,r,t)}}(this,e);break;case r.producer:!function(e,t){if(e.owner.is_mover&&!s.moversCanProduce)return;var i=s.foodProdProb;if(100*Math.random()<=i){var o=s.growableNeighbors[Math.floor(Math.random()*s.growableNeighbors.length)],l=o[0],n=o[1],h=t.grid_map.cellAt(e.col+l,e.row+n);if(null!=h&&h.type==r.empty)t.changeCell(e.col+l,e.row+n,r.food,null)}}(this,e);break;case r.killer:!function(e,t){for(var i of s.killableNeighbors){var r=t.grid_map.cellAt(e.col+i[0],e.row+i[1]);l(e,r)}}(this,e)}}getColor(){return r.colors[this.type]}isLiving(){return this.type!=r.empty&&this.type!=r.food&&this.type!=r.wall}}},function(e,t,i){const r=i(1),s=i(0);e.exports=class{constructor(e,t,i){this.resize(e,t,i)}resize(e,t,i){this.grid=[],this.cols=e,this.rows=t,this.cell_size=i;for(var o=0;o<e;o++){for(var l=[],n=0;n<t;n++){var h=new r(s.empty,o,n,o*i,n*i);l.push(h)}this.grid.push(l)}}fillGrid(e){for(var t of this.grid)for(var i of t)i.setType(e),i.owner=null}cellAt(e,t){return this.isValidLoc(e,t)?this.grid[e][t]:null}setCellType(e,t,i){this.isValidLoc(e,t)&&this.grid[e][t].setType(i)}setCellOwner(e,t,i){this.isValidLoc(e,t)&&(this.grid[e][t].owner=i)}isValidLoc(e,t){return e<this.cols&&t<this.rows&&e>=0&&t>=0}getCenter(){return[Math.floor(this.cols/2),Math.floor(this.rows/2)]}xyToColRow(e,t){var i=Math.floor(e/this.cell_size),r=Math.floor(t/this.cell_size);return i>=this.cols?i=this.cols-1:i<0&&(i=0),r>=this.rows?r=this.rows-1:r<0&&(r=0),[i,r]}}},function(e,t,i){const r=i(4),s={setDefaults:function(){this.lifespanMultiplier=100,this.foodProdProb=4,this.foodProdProbScalar=4,this.killableNeighbors=r.adjacent,this.edibleNeighbors=r.adjacent,this.growableNeighbors=r.adjacent,this.useGlobalMutability=!1,this.globalMutability=5,this.addProb=33,this.changeProb=33,this.removeProb=33,this.moversCanRotate=!0,this.offspringRotate=!0,this.foodBlocksReproduction=!0,this.moversCanProduce=!1,this.instaKill=!1},calcProducerFoodRatio:function(e=!0){e?this.foodProdProb=100/this.lifespanMultiplier*this.foodProdProbScalar:this.lifespanMultiplier=Math.floor(100/(this.foodProdProb/this.foodProdProbScalar))},balanceMutationProbs:function(e){if(1==e){var t=100-this.addProb;this.changeProb=t/2,this.removeProb=t/2}else if(2==e){t=100-this.changeProb;this.addProb=t/2,this.removeProb=t/2}else{t=100-this.removeProb;this.changeProb=t/2,this.addProb=t/2}}};s.setDefaults(),e.exports=s},function(e,t){e.exports={all:[[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[1,1],[-1,1],[1,-1]],adjacent:[[0,1],[0,-1],[1,0],[-1,0]],corners:[[-1,-1],[1,1],[-1,1],[1,-1]],allSelf:[[0,0],[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[1,1],[-1,1],[1,-1]]}},function(e,t,i){const r=i(0),s=(i(1),i(2),i(13)),o=i(4),l=i(3),n=i(8);class h{constructor(e,t,i,r=null){this.c=e,this.r=t,this.env=i,this.lifetime=0,this.food_collected=0,this.living=!0,this.cells=[],this.is_producer=!1,this.is_mover=!1,this.direction=n.up,this.rotation=n.up,this.can_rotate=l.moversCanRotate,this.move_count=0,this.move_range=4,this.mutability=5,this.damage=0,null!=r&&this.inherit(r)}addCell(e,t,i){for(var r of this.cells)if(r.loc_col==t&&r.loc_row==i)return!1;return this.checkProducerMover(e),this.cells.push(new s(e,t,i)),!0}removeCell(e,t){if(0==e&&0==t)return!1;for(var i=!1,s=0;s<this.cells.length;s++){if((o=this.cells[s]).loc_col==e&&o.loc_row==t){o.type!=r.producer&&o.type!=r.mover||(i=!0),this.cells.splice(s,1);break}}if(i)for(var o of(this.is_producer=!1,this.is_producer=!1,this.cells))this.checkProducerMover(o.type);return!0}getLocalCell(e,t){for(var i of this.cells)if(i.loc_col==e&&i.loc_row==t)return i;return null}checkProducerMover(e){e==r.producer&&(this.is_producer=!0),e==r.mover&&(this.is_mover=!0)}inherit(e){for(var t of(this.move_range=e.move_range,this.mutability=e.mutability,e.cells))this.addCell(t.type,t.loc_col,t.loc_row)}foodNeeded(){return this.cells.length}lifespan(){return this.cells.length*l.lifespanMultiplier}maxHealth(){return this.cells.length}reproduce(){var e=new h(0,0,this.env,this);l.offspringRotate&&(e.rotation=n.getRandomDirection());var t=this.mutability;l.useGlobalMutability?t=l.globalMutability:Math.random()<=.5?e.mutability++:(e.mutability--,e.mutability<1&&(e.mutability=1)),100*Math.random()<=t&&e.mutate();var i=n.getRandomScalar(),r=i[0],s=i[1],o=1*Math.floor(3*Math.random()),a=Math.min(2+this.cells.length,15),c=this.c+r*a+r*o,d=this.r+s*a+s*o;e.isClear(c,d)&&e.isStraightPath(c,d,this.c,this.r,this)&&(e.c=c,e.r=d,this.env.addOrganism(e),e.updateGrid()),this.food_collected-=this.foodNeeded()}mutate(){var e=Math.floor(100*Math.random()),t=!1;if(e<=l.addProb){var i=r.getRandomLivingType(),s=(Math.floor(3*Math.random()),this.cells[Math.floor(Math.random()*this.cells.length)]),n=o.all[Math.floor(Math.random()*o.all.length)],h=s.loc_col+n[0],a=s.loc_row+n[1];t=this.addCell(i,h,a)}else if(e<=l.addProb+l.changeProb){var c=this.cells[Math.floor(Math.random()*this.cells.length)];c.type=r.getRandomLivingType(),this.checkProducerMover(c.type),t=!0}else e<=l.addProb+l.changeProb+l.removeProb&&this.cells.length>1&&(c=this.cells[Math.floor(Math.random()*this.cells.length)],t=this.removeCell(c.loc_col,c.loc_row));return this.is_mover&&(this.move_range+=Math.floor(4*Math.random())-2,this.move_range<=0&&(this.move_range=1)),t}attemptMove(){var e=n.scalars[this.direction],t=e[0],i=e[1],s=this.c+t,o=this.r+i;if(this.isClear(s,o)){for(var l of this.cells){var h=this.c+l.rotatedCol(this.rotation),a=this.r+l.rotatedRow(this.rotation);this.env.changeCell(h,a,r.empty,null)}return this.c=s,this.r=o,this.updateGrid(),!0}return!1}attemptRotate(){if(!this.can_rotate)return this.direction=n.getRandomDirection(),this.move_count=0,!0;var e=n.getRandomDirection();if(this.isClear(this.c,this.r,e)){for(var t of this.cells){var i=this.c+t.rotatedCol(this.rotation),s=this.r+t.rotatedRow(this.rotation);this.env.changeCell(i,s,r.empty,null)}return this.rotation=e,this.direction=n.getRandomDirection(),this.updateGrid(),this.move_count=0,!0}return!1}isStraightPath(e,t,i,r,s){if(e==i){if(t>r){var o=r;r=t,t=o}for(var l=t;l!=r;l++){var n=this.env.grid_map.cellAt(e,l);if(!this.isPassableCell(n,s))return!1}return!0}if(e>i){o=i;i=e,e=o}for(l=e;l!=i;l++){n=this.env.grid_map.cellAt(l,t);if(!this.isPassableCell(n,s))return!1}return!0}isPassableCell(e,t){return null!=e&&(e.type==r.empty||e.owner==this||e.owner==t||e.type==r.food)}isClear(e,t,i=this.rotation){for(var s of this.cells){var o=this.getRealCell(s,e,t,i);if(null==o)return!1;if(o.owner!=this&&o.type!=r.empty&&(l.foodBlocksReproduction||o.type!=r.food))return!1}return!0}harm(){this.damage++,(this.damage>=this.maxHealth()||l.instaKill)&&this.die()}die(){for(var e of this.cells){var t=this.c+e.rotatedCol(this.rotation),i=this.r+e.rotatedRow(this.rotation);this.env.changeCell(t,i,r.food,null)}this.living=!1}updateGrid(){for(var e of this.cells){var t=this.c+e.rotatedCol(this.rotation),i=this.r+e.rotatedRow(this.rotation);this.env.changeCell(t,i,e.type,this)}}update(){if(this.lifetime++,this.lifetime>this.lifespan())return this.die(),this.living;for(var e of(this.food_collected>=this.foodNeeded()&&this.reproduce(),this.cells))this.getRealCell(e).performFunction(this.env);if(!this.living)return this.living;if(this.is_mover){this.move_count++;this.attemptMove();this.move_count>this.move_range&&this.attemptRotate()}return this.living}getRealCell(e,t=this.c,i=this.r,r=this.rotation){var s=t+e.rotatedCol(r),o=i+e.rotatedRow(r);return this.env.grid_map.cellAt(s,o)}}e.exports=h},function(e,t){e.exports={None:0,FoodDrop:1,WallDrop:2,ClickKill:3,Select:4,Edit:5,Clone:6}},function(e,t){e.exports=class{constructor(e,t,i){this.cell_size=i,this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext("2d"),this.fillWindow(t),this.height=this.canvas.height,this.width=this.canvas.width,this.cells_to_render=new Set,this.cells_to_highlight=new Set,this.highlighted_cells=new Set}fillWindow(e){this.fillShape($("#"+e).height(),$("#"+e).width())}fillShape(e,t){this.canvas.width=t,this.canvas.height=e,this.height=this.canvas.height,this.width=this.canvas.width}clear(){this.ctx.fillStyle="white",this.ctx.fillRect(0,0,this.height,this.width)}renderFullGrid(e){for(var t of e)for(var i of t)this.ctx.fillStyle=i.getColor(),this.ctx.fillRect(i.x,i.y,this.cell_size,this.cell_size)}renderCells(){for(var e of this.cells_to_render)this.renderCell(e);this.cells_to_render.clear()}renderCell(e){this.ctx.fillStyle=e.getColor(),this.ctx.fillRect(e.x,e.y,this.cell_size,this.cell_size)}renderOrganism(e){for(var t of e.cells){var i=e.getRealCell(t);this.renderCell(i)}}addToRender(e){this.highlighted_cells.has(e)&&this.cells_to_highlight.add(e),this.cells_to_render.add(e)}renderHighlights(){for(var e of this.cells_to_highlight)this.renderCellHighlight(e),this.highlighted_cells.add(e);this.cells_to_highlight.clear()}highlightOrganism(e){for(var t of e.cells){var i=e.getRealCell(t);this.cells_to_highlight.add(i)}}highlightCell(e){this.cells_to_highlight.add(e)}renderCellHighlight(e,t="yellow"){this.renderCell(e),this.ctx.fillStyle=t,this.ctx.globalAlpha=.5,this.ctx.fillRect(e.x,e.y,this.cell_size,this.cell_size),this.ctx.globalAlpha=1,this.highlighted_cells.add(e)}clearAllHighlights(e=!1){for(var t of this.highlighted_cells)this.renderCell(t);this.highlighted_cells.clear(),e&&this.cells_to_highlight.clear()}}},function(e,t){const i={up:0,down:1,left:2,right:3,scalars:[[0,-1],[0,1],[-1,0],[1,0]],getRandomDirection:function(){return Math.floor(4*Math.random())},getRandomScalar:function(){return this.scalars[Math.floor(Math.random()*this.scalars.length)]}};e.exports=i},function(e,t){e.exports=class{constructor(e,t){this.env=e,this.canvas=t,this.mouse_x,this.mouse_y,this.mouse_c,this.mouse_r,this.left_click=!1,this.right_click=!1,this.cur_cell=null,this.cur_org=null,this.highlight_org=!0,this.defineEvents()}setControlPanel(e){this.control_panel=e}defineEvents(){this.canvas.addEventListener("mousemove",e=>{var t=this.cur_cell,i=this.cur_org;this.mouse_x=e.offsetX,this.mouse_y=e.offsetY;var r=this.env.grid_map.xyToColRow(this.mouse_x,this.mouse_y);this.mouse_c=r[0],this.mouse_r=r[1],this.cur_cell=this.env.grid_map.cellAt(this.mouse_c,this.mouse_r),this.cur_org=this.cur_cell.owner,this.cur_org==i&&this.cur_cell==t||(this.env.renderer.clearAllHighlights(!0),null!=this.cur_org&&this.highlight_org?this.env.renderer.highlightOrganism(this.cur_org):null!=this.cur_cell&&this.env.renderer.highlightCell(this.cur_cell,!0)),this.mouseMove()}),this.canvas.addEventListener("mouseup",function(e){e.preventDefault(),this.left_click=!1,this.right_click=!1}.bind(this)),this.canvas.addEventListener("mousedown",function(e){e.preventDefault(),0==e.button&&(this.left_click=!0),2==e.button&&(this.right_click=!0),this.mouseDown()}.bind(this)),this.canvas.addEventListener("contextmenu",(function(e){e.preventDefault()})),this.canvas.addEventListener("mouseleave",function(){this.right_click=!1,this.left_click=!1,this.env.renderer.clearAllHighlights(!0)}.bind(this))}mouseMove(){alert("mouse move must be overriden")}mouseDown(){alert("mouse down must be overriden")}}},function(e,t,i){const r=i(12),s=i(15),o=i(16);e.exports=class{constructor(){this.fps=60,this.env=new r(3),this.organism_editor=new o,this.controlpanel=new s(this),this.env.OriginOfLife(),this.last_update=Date.now(),this.delta_time=0,this.actual_fps=0,this.running=!1}start(e=60){e<=0&&(e=1),e>300&&(e=300),this.fps=e,this.game_loop=setInterval(function(){this.environmentUpdate()}.bind(this),1e3/e),this.running=!0,this.fps>=60?null!=this.render_loop&&(clearInterval(this.render_loop),this.render_loop=null):this.setRenderLoop()}stop(){clearInterval(this.game_loop),this.running=!1,this.setRenderLoop()}setRenderLoop(){null==this.render_loop&&(this.render_loop=setInterval(function(){this.necessaryUpdate()}.bind(this),1e3/60))}environmentUpdate(){this.delta_time=Date.now()-this.last_update,this.last_update=Date.now(),this.env.update(this.delta_time),this.actual_fps=1/this.delta_time*1e3,null==this.render_loop&&this.necessaryUpdate()}necessaryUpdate(){this.env.render(),this.controlpanel.update(),this.organism_editor.update()}}},function(e,t,i){"use strict";i.r(t);var r=i(10),s=i.n(r);$("document").ready((function(){(new s.a).start(60)}))},function(e,t,i){i(2);const r=i(7),s=i(2),o=i(5),l=i(0),n=(i(1),i(14));e.exports=class{constructor(e){this.renderer=new r("env-canvas","env",e),this.controller=new n(this,this.renderer.canvas),this.grid_rows=Math.floor(this.renderer.height/e),this.grid_cols=Math.floor(this.renderer.width/e),this.grid_map=new s(this.grid_cols,this.grid_rows,e),this.renderer.renderFullGrid(this.grid_map.grid),this.organisms=[],this.walls=[],this.total_mutability=0,this.auto_reset=!0,this.largest_cell_count=0,this.reset_count=0}update(e){var t=[];for(var i in this.organisms){var r=this.organisms[i];r.living&&r.update()||t.push(i)}this.removeOrganisms(t)}render(){this.renderer.renderCells(),this.renderer.renderHighlights()}removeOrganisms(e){for(var t of e.reverse())this.total_mutability-=this.organisms[t].mutability,this.organisms.splice(t,1);0==this.organisms.length&&this.auto_reset&&(this.reset_count++,this.reset())}OriginOfLife(){var e=this.grid_map.getCenter(),t=new o(e[0],e[1],this);t.addCell(l.mouth,0,0),t.addCell(l.producer,-1,-1),t.addCell(l.producer,1,1),this.addOrganism(t)}addOrganism(e){e.updateGrid(),this.total_mutability+=e.mutability,this.organisms.push(e),e.cells.length>this.largest_cell_count&&(this.largest_cell_count=e.cells.length)}averageMutability(){return this.organisms.length<1?0:this.total_mutability/this.organisms.length}changeCell(e,t,i,r){this.grid_map.setCellType(e,t,i),this.grid_map.setCellOwner(e,t,r),this.renderer.addToRender(this.grid_map.cellAt(e,t)),i==l.wall&&this.walls.push(this.grid_map.cellAt(e,t))}clearWalls(){for(var e of this.walls)this.grid_map.cellAt(e.col,e.row).type==l.wall&&this.changeCell(e.col,e.row,l.empty,null)}clearOrganisms(){for(var e of this.organisms)e.die();this.organisms=[]}reset(e=!0){this.organisms=[],this.grid_map.fillGrid(l.empty),this.renderer.renderFullGrid(this.grid_map.grid),this.total_mutability=0,this.OriginOfLife()}resizeGridColRow(e,t,i){this.renderer.cell_size=e,this.renderer.fillShape(i*e,t*e),this.grid_map.resize(t,i,e),this.reset()}resizeFillWindow(e){this.renderer.cell_size=e,this.renderer.fillWindow("env");var t=Math.floor(this.renderer.width/e),i=Math.floor(this.renderer.height/e);this.grid_map.resize(t,i,e),this.reset()}}},function(e,t,i){i(0);const r=i(8);i(3);e.exports=class{constructor(e,t,i){this.type=e,this.loc_col=t,this.loc_row=i}rotatedCol(e){switch(e){case r.up:return this.loc_col;case r.down:return-1*this.loc_col;case r.left:return this.loc_row;case r.right:return-1*this.loc_row}}rotatedRow(e){switch(e){case r.up:return this.loc_row;case r.down:return-1*this.loc_row;case r.left:return-1*this.loc_col;case r.right:return this.loc_col}}}},function(e,t,i){const r=i(9),s=i(5),o=i(6),l=i(0),n=i(4);i(1);e.exports=class extends r{constructor(e,t){super(e,t),this.mode=o.None,this.org_to_clone=null}mouseMove(){this.performModeAction()}mouseDown(){this.performModeAction()}performModeAction(){var e=this.mode,t=this.right_click,i=this.left_click;if(e!=o.None&&(t||i)){var r=this.cur_cell;if(null==r)return;switch(e){case o.FoodDrop:i?this.dropCellType(r.col,r.row,l.food,!1):t&&this.dropCellType(r.col,r.row,l.empty,!1);break;case o.WallDrop:i?this.dropCellType(r.col,r.row,l.wall,!0):t&&this.dropCellType(r.col,r.row,l.empty,!1);break;case o.ClickKill:this.killNearOrganisms();break;case o.Select:null==this.cur_org&&(this.cur_org=this.findNearOrganism()),null!=this.cur_org&&this.control_panel.setEditorOrganism(this.cur_org);break;case o.Clone:if(null!=this.org_to_clone){var n=new s(this.mouse_c,this.mouse_r,this.env,this.org_to_clone);n.isClear(this.mouse_c,this.mouse_r)&&this.env.addOrganism(n)}}}}dropCellType(e,t,i,r=!1){for(var s of n.allSelf){var o=e+s[0],l=t+s[1],h=this.env.grid_map.cellAt(o,l);if(null!=h){if(r&&null!=h.owner)h.owner.die();else if(null!=h.owner)continue;this.env.changeCell(o,l,i,null)}}}findNearOrganism(){for(var e of n.all){var t=this.cur_cell.col+e[0],i=this.cur_cell.row+e[1],r=this.env.grid_map.cellAt(t,i);if(null!=r.owner)return r.owner}return null}killNearOrganisms(){for(var e of n.allSelf){var t=this.cur_cell.col+e[0],i=this.cur_cell.row+e[1],r=this.env.grid_map.cellAt(t,i);null!=r.owner&&r.owner.die()}}}},function(e,t,i){const r=i(3),s=i(6);i(0);e.exports=class{constructor(e){this.engine=e,this.defineEngineSpeedControls(),this.defineGridSizeControls(),this.defineTabNavigation(),this.defineHyperparameterControls(),this.defineModeControls(),this.fps=e.fps,this.organism_record=0,this.env_controller=this.engine.env.controller,this.editor_controller=this.engine.organism_editor.controller,this.env_controller.setControlPanel(this),this.editor_controller.setControlPanel(this)}defineEngineSpeedControls(){this.slider=document.getElementById("slider"),this.slider.oninput=function(){this.fps=this.slider.value,this.engine.running&&this.changeEngineSpeed(this.fps),$("#fps").text("Target FPS: "+this.fps)}.bind(this),$("#pause-button").click(function(){$("#pause-button").find("i").toggleClass("fa fa-pause"),$("#pause-button").find("i").toggleClass("fa fa-play"),this.engine.running?this.engine.stop():this.engine.running||this.engine.start(this.fps)}.bind(this))}defineGridSizeControls(){$("#fill-window").change((function(){this.checked?$(".col-row-input").css("display","none"):$(".col-row-input").css("display","block")})),$("#resize").click(function(){var e=$("#cell-size").val();if($("#fill-window").is(":checked"))this.engine.env.resizeFillWindow(e);else{var t=$("#col-input").val(),i=$("#row-input").val();this.engine.env.resizeGridColRow(e,t,i)}}.bind(this))}defineTabNavigation(){var e=this;$(".tabnav-item").click((function(){$(".tab").css("display","none");var t="#"+this.id+".tab";e.engine.organism_editor.is_active="editor"==this.id,$(t).css("display","grid")}))}defineHyperparameterControls(){$("#food-prod-prob").change(function(){var e=$("#food-prod-prob").val();$("#fixed-ratio").is(":checked")?(r.foodProdProb=e,r.calcProducerFoodRatio(!1),$("#lifespan-multiplier").val(r.lifespanMultiplier)):r.foodProdProb=e}.bind(this)),$("#lifespan-multiplier").change(function(){var e=$("#lifespan-multiplier").val();$("#fixed-ratio").is(":checked")?(r.lifespanMultiplier=e,r.calcProducerFoodRatio(!0),$("#food-prod-prob").val(r.foodProdProb)):r.lifespanMultiplier=e}.bind(this)),$("#mover-rot").change((function(){r.moversCanRotate=this.checked})),$("#offspring-rot").change((function(){r.offspringRotate=this.checked})),$("#insta-kill").change((function(){r.instaKill=this.checked})),$("#evolved-mutation").change((function(){this.checked?($(".global-mutation-in").css("display","none"),$("#avg-mut").css("display","block")):($(".global-mutation-in").css("display","block"),$("#avg-mut").css("display","none")),r.useGlobalMutability=!this.checked})),$("#global-mutation").change((function(){r.globalMutability=$("#global-mutation").val()})),$(".mut-prob").change((function(){switch(this.id){case"add-prob":r.addProb=this.value,r.balanceMutationProbs(1);break;case"change-prob":r.changeProb=this.value,r.balanceMutationProbs(2);break;case"remove-prob":r.removeProb=this.value,r.balanceMutationProbs(3)}$("#add-prob").val(Math.floor(r.addProb)),$("#change-prob").val(Math.floor(r.changeProb)),$("#remove-prob").val(Math.floor(r.removeProb))})),$("#movers-produce").change((function(){r.moversCanProduce=this.checked})),$("#food-blocks").change((function(){r.foodBlocksReproduction=this.checked})),$("#reset-rules").click((function(){r.setDefaults(),$("#food-prod-prob").val(r.foodProdProb),$("#lifespan-multiplier").val(r.lifespanMultiplier),$("#fixed-ratio").prop("checked",!0),$("#mover-rot").prop("checked",r.moversCanRotate),$("#offspring-rot").prop("checked",r.offspringRotate),$("#insta-kill").prop("checked",r.instaKill),$("#evolved-mutation").prop("checked",!r.useGlobalMutability),$("#add-prob").val(r.addProb),$("#change-prob").val(r.changeProb),$("#remove-prob").val(r.removeProb),$("#movers-produce").prop("checked",r.moversCanProduce),$("#food-blocks").prop("checked",r.foodBlocksReproduction),r.useGlobalMutability?($(".global-mutation-in").css("display","block"),$("#avg-mut").css("display","none")):($(".global-mutation-in").css("display","none"),$("#avg-mut").css("display","block"))}))}defineModeControls(){var e=this;$(".edit-mode-btn").click((function(){e.env_controller.mode;switch($("#cell-selections").css("display","none"),this.id){case"food-drop":e.setMode(s.FoodDrop);break;case"wall-drop":e.setMode(s.WallDrop);break;case"click-kill":e.setMode(s.ClickKill);break;case"select":e.setMode(s.Select);break;case"edit":e.setMode(s.Edit),$("#cell-selections").css("display","block");break;case"drop-org":e.setMode(s.Clone),e.env_controller.org_to_clone=e.engine.organism_editor.getCopyOfOrg()}$(".edit-mode-btn").css("background-color","#9099c2"),$("#"+this.id).css("background-color","#81d2c7")}));var t=this.engine.env;$("#reset-env").click(function(){this.engine.env.reset()}.bind(this)),$("#auto-reset").change((function(){t.auto_reset=this.checked})),$("#clear-walls").click(function(){confirm("Are you sure you want to clear all the walls?")&&this.engine.env.clearWalls()}.bind(this)),$("#clear-editor").click(function(){this.engine.organism_editor.clear()}.bind(this))}setMode(e){this.env_controller.mode=e,this.editor_controller.mode=e}setEditorOrganism(e){this.engine.organism_editor.setOrganismToCopyOf(e)}changeEngineSpeed(e){this.engine.stop(),this.engine.start(e),this.fps=this.engine.fps}update(){$("#fps-actual").text("Actual FPS: "+Math.floor(this.engine.actual_fps));var e=this.engine.env.organisms.length;$("#org-count").text("Organism count:  "+e),e>this.organism_record&&(this.organism_record=e),$("#org-record").text("Highest count: "+this.organism_record),$("#avg-mut").text("Average Mutation Rate: "+Math.round(100*this.engine.env.averageMutability())/100),$("#largest-org").text("Largest Organism: "+this.engine.env.largest_cell_count+" cells"),$("#reset-count").text("Auto reset count: "+this.engine.env.reset_count)}}},function(e,t,i){const r=i(5),s=i(2),o=i(7),l=i(0),n=i(17);i(1);e.exports=class{constructor(){this.is_active=!0;this.grid_map=new s(15,15,13),this.renderer=new o("editor-canvas","editor-env",13),this.controller=new n(this,this.renderer.canvas),this.clear(),this.renderer.renderFullGrid(this.grid_map.grid)}update(){this.is_active&&this.renderer.renderHighlights()}changeCell(e,t,i,r){this.grid_map.setCellType(e,t,i),this.grid_map.setCellOwner(e,t,r),this.renderer.renderFullGrid(this.grid_map.grid)}addCellToOrg(e,t,i){var r=this.grid_map.getCenter(),s=e-r[0],o=t-r[1],l=this.organism.getLocalCell(s,o);null!=l?(l.type=i,this.changeCell(e,t,i,this.organism)):this.organism.addCell(i,s,o)&&this.changeCell(e,t,i,this.organism)}removeCellFromOrg(e,t){var i=this.grid_map.getCenter(),r=e-i[0],s=t-i[1];0!=r||0!=s?null!=this.organism.getLocalCell(r,s)&&this.organism.removeCell(r,s)&&this.changeCell(e,t,l.empty,null):alert("Cannot remove center cell")}setOrganismToCopyOf(e){this.grid_map.fillGrid(l.empty);var t=this.grid_map.getCenter();this.organism=new r(t[0],t[1],this,e),this.organism.updateGrid()}getCopyOfOrg(){return new r(0,0,null,this.organism)}clear(){this.grid_map.fillGrid(l.empty);var e=this.grid_map.getCenter();this.organism=new r(e[0],e[1],this,null),this.organism.addCell(l.mouth,0,0),this.organism.updateGrid()}}},function(e,t,i){const r=i(9),s=i(6),o=i(0);e.exports=class extends r{constructor(e,t){super(e,t),this.mode=s.None,this.edit_cell_type=null,this.highlight_org=!1,this.defineCellTypeSelection()}mouseMove(){(this.right_click||this.left_click)&&this.editOrganism()}mouseDown(){this.editOrganism()}editOrganism(){null!=this.edit_cell_type&&this.mode==s.Edit&&(this.left_click&&this.env.addCellToOrg(this.mouse_c,this.mouse_r,this.edit_cell_type),this.right_click&&this.env.removeCellFromOrg(this.mouse_c,this.mouse_r))}defineCellTypeSelection(){var e=this;$(".cell-type").click((function(){switch(this.id){case"mouth":e.edit_cell_type=o.mouth;break;case"producer":e.edit_cell_type=o.producer;break;case"mover":e.edit_cell_type=o.mover;break;case"killer":e.edit_cell_type=o.killer;break;case"armor":e.edit_cell_type=o.armor}$(".cell-type").css("border-color","black"),$("#"+this.id).css("border-color","yellow")}))}}}]);