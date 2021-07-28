/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/26/20, 3:19 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

const FileField = {
    computed: {
        classForBtn() {
            var classes = this.getHtmlClass('label.btn.self');
            if (this.multiple)
                classes += this.getHtmlClass('label.btn.selfIf');
            return classes;
        },
        getUrls() {
            var $this = this;
            var files = this.multiple ? [] : null;
            if (this.getIndex('get') && this.getOption('get', true)) {
                var list = this.getValue(this.getIndex('get'));
                if (this.multiple && list)
                    list.forEach(function (value, index, array) {
                        if ($this.deletes.indexOf(value['150x'].attachment) === -1)
                            files.push({
                                id: value['150x'].attachment,
                                url: value['150x'].url
                            });
                    })
                else if (list && list['150x'])
                    files = list ? list['150x'].url : null;
            }
            this.files = files;
            if (this.multiple && this.url)
                files.push(...this.url)
            return this.multiple ? files : (this.url || files);
        }
    },
    methods: {
        delFile(index) {
            var $urls = this.getUrls
            if ($urls[index] && $urls[index].id && this.getIndex('delete') && this.getOption('delete', true)) {
                var $deletes = this.getValue(this.getIndex('delete'), []);
                $deletes.push($urls[index].id);
                this.updateValue(this.getIndex('delete'), $deletes)
                this.deletes = $deletes
            }else{
                var $index = index - Object.values(this.files).length;
                iPath.del(this.url, $index);
                this.model.splice($index,1);
            }
            this.$forceUpdate();
        },
        handleFileChange($event) {
            var $this = this;
            var $files = $event.target.files || $event.dataTransfer.files;
            $this.model = $this.multiple && $this.model === null ? [] : $this.model;
            $.each($files, function (i, file) {
                if ($this.multiple)
                    $this.model.push(file)
                else{
                    $this.model = file
                }
            })
            this.readURL($files);
        },
        readURL(files = []) {
            var $this = this;
            $this.url = $this.multiple && $this.url === null ? [] : $this.url;
            $.each(files, function (i, file) {
                var reader = new FileReader();
                reader.onload = e => {
                    if ($this.multiple)
                        $this.url.push({
                            url: e.target.result
                        })
                    else
                        $this.url = e.target.result
                    $this.$forceUpdate();
                };
                reader.readAsDataURL(file);
            })
        }
    },
    watch: {
        iRecordValue: {
            handler: function (newValue, oldValue) {

            },
            deep: true
        },
    }
};

export default FileField;
