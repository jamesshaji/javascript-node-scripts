const fs = require('fs')
const path = require('path')

function makePath(filepath) {
    var stats = fs.lstatSync(filepath),
        data = {
            path: path.normalize(path.relative(__dirname, filepath)),
            name: path.basename(filepath)
        };

    if (stats.isDirectory()) {
        data.type = "folder";
        data.children = fs.readdirSync(filepath).map(function(child) {
            return makePath(path.normalize(path.join(filepath, child)));
        });
    } else {
        data.type = "file";
		data.fileType = checkFileType(filepath);
    }
    return data;
}

function checkFileType(filepath){
	let file = filepath.toLowerCase();
	if(file.indexOf('.jpg') > 0 || file.indexOf(".png") > 0 || file.indexOf(".jpeg") > 0){
		return "image";
	}else if(file.indexOf('.mp4') > 0 || file.indexOf('.avi') > 0 || file.indexOf('.mov') > 0){
		return "video";
	}else if(file.indexOf('.mp3') > 0 || file.indexOf('.ogg') > 0){
		return "audio";
	}	
	return "unknown";
}


const files = makePath(path.join(__dirname, "Document_Input"));

fs.writeFile('filepaths.json', JSON.stringify(files), (err)=>{
	if(err)
		console.dir(err)
		
	console.log("Done");
});
