JSONNode = function(engine, url){
	
	this.init();  // init scene node specific members
          
	// create a 3d mesh with one mesh buffer
	this.MyMesh = new CL3D.Mesh();
	var buf = new CL3D.MeshBuffer();
	this.MyMesh.AddMeshBuffer(buf);
          
    // Load the json portion of the model
	var jsonXhr = new XMLHttpRequest();
	jsonXhr.open('GET', url, true);
	jsonXhr.onload = function() {
			
			
			model = JSON.parse(this.responseText);
			
			buf.Indices = model.indices;
			
			scale = model.scale;
			
			for (var i=0; i<model.vertices.length; i++) {
				var x = model.vertices[i*3]*scale;
				var y = model.vertices[i*3+1]*scale;
				var z = model.vertices[i*3+2]*scale;
				var u = model.uvs[i*2];
				var v = model.uvs[i*2+1];
				buf.Vertices.push(self.createVertex( x, y, z,  u, v) );
			}
	};
		
	jsonXhr.send(null);
	buf.Mat.Tex1 = engine.getTextureManager().getTexture("root/texture/cube-texture.jpg", true);
}
      
createVertex = function(x, y, z, s, t){
	var vtx = new CL3D.Vertex3D(true);
	vtx.Pos.X = x;
	vtx.Pos.Y = y;
	vtx.Pos.Z = z;
	vtx.TCoords.X = s;
	vtx.TCoords.Y = t;
	return vtx;
}

JSONNode.prototype = new CL3D.SceneNode(); // derive from SceneNode
      
JSONNode.prototype.OnRegisterSceneNode = function(scene)
{
    scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene); // call base class
}

JSONNode.prototype.render = function(renderer)
{
    renderer.setWorld(this.getAbsoluteTransformation());
    renderer.drawMesh(this.MyMesh);
}
      