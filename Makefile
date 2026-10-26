.PHONY: serve test check
serve:
	python3 -m http.server 8000
check:
	for f in js/*.js; do node --check $$f || exit 1; done
test: check
	node tests/falar-resposta.test.js
	python3 tests/smoke.py
graph:
	graphify update .
