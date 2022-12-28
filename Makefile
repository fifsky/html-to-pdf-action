.PHONY: build
build:
	docker build -f docker/Dockerfile -t fifsky/html-to-pdf:latest .
.PHONY: test
test:
	export INPUT_HTMLFILE="./example.html" INPUT_OUTPUTFILE="./example.pdf" INPUT_PDFOPTIONS='{"margin": {"top": "1000px", "left": "100px", "right": "100px", "bottom": "100px"}}' && node ./lib/main.js
