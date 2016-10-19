STATICS:= publish/lazyload.min.js publish/jquery-3.0.0.min.js publish/main.js publish/main.css
PAGES:= publish/index.html \
	publish/Notes.html

all: $(STATICS) $(PAGES)

publish/%: tools/%
	@mkdir -p $(@D)
	cp $< $@
publish/index.html: README.txt
	@mkdir -p $(@D)
	(perl tools/cat.pl $< | perl tools/drawer.pl || cat $<) | \
	pandoc \
		-V rootdir=./ \
		-S -s --ascii \
		-f markdown+abbreviations+east_asian_line_breaks+emoji \
		--template tools/html.template \
		-o $@
publish/%.html: %.txt
	@mkdir -p $(@D)
	(perl tools/cat.pl $< | perl tools/drawer.pl || cat $<) | \
	pandoc \
		-V rootdir=./ \
		-S -s --ascii \
		-f markdown+abbreviations+east_asian_line_breaks+emoji \
		--template tools/html.template \
		-o $@
publish/%.html: %.md
	@mkdir -p $(@D)
	(perl tools/cat.pl $< | perl tools/drawer.pl || cat $<) | \
	pandoc \
		-V rootdir=./ \
		-S -s --ascii \
		-f markdown+abbreviations+east_asian_line_breaks+emoji \
		--template tools/html.template \
		-o $@
