<template>
    <div style="border:20px solid #99CCFF">
      <h1>แก้ไขแนะนำ</h1>
      <form v-on:submit.prevent="editRecom">
        <p>ชื่อร้าน: <input type="text" v-model="recom.title" /></p>
  
        <transition name="fade">
          <div class="thumbnail-pic" v-if="recom.thumbnail != 'null'">
            <img :src="BASE_URL + recom.thumbnail" alt="thumbnail" />
          </div>
        </transition>
        <form enctype="multipart/form-data" novalidate>
          <div class="dropbox">
            <input
              type="file"
              multiple
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="
                filesChange($event.target.name, $event.target.files);
                fileCount = $event.target.files.length;
              "
              accept="image/*"
              class="input-file"
            />
            <!-- <p v-if="isInitial || isSuccess"> -->
            <p v-if="isInitial">
              คลิกใส่รูปภาพ<br />
              
            </p>
            <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
            <p v-if="isSuccess">Upload Successful.</p>
            <p v-if="isFailed">Upload Failed.</p>
          </div>
          <div>
            <ul class="pictures">
              <li v-for="picture in pictures" v-bind:key="picture.id">
                <img
                  style="margin-bottom: 5px"
                  :src="BASE_URL + picture.name"
                  alt="picture image"
                />
                <button class="button3" v-on:click.prevent="delFile(picture)">ลบ</button>
                <button class="button1" v-on:click.prevent="useThumbnail(picture.name)">
                  รูปย่อ
                </button>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </form>
  
        
  
        <p>ที่อยู่: <input type="text" v-model="recom.category" /></p>
        <p>ประเภทร้าน: <input type="text" v-model="recom.status" /></p>
        <p>
          <button class="button1" type="submit">ยืนยัน</button>
          <button class="button1" v-on:click="navigateTo('/recom')">กลับ</button>
        </p>
      </form>
    </div>
  </template>
  <script>
  import RecomService from "@/services/RecomService";
  import VueCkeditor from "vue-ckeditor2";
  import UploadService from "@/services/UploadService";
  
  const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;
  
  export default {
    data() {
      return {
        BASE_URL: "http://localhost:8081/assets/uploads/",
        error: null,
        // uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: "userPhoto",
        uploadedFileNames: [],
        pictures: [],
        pictureIndex: 0,
        recom: {
          title: "",
          thumbnail: "null",
          pictures: "null",
          content: "",
          category: "",
          status: ""
        },
        config: {
          toolbar: [
            {
              name: "document",
              items: [
                "Source",
                "-",
                "Save",
                "NewPage",
                "Preview",
                "Print",
                "-",
                "Templates"
              ]
            },
            {
              name: "clipboard",
              items: [
                "Cut",
                "Copy",
                "Paste",
                "PasteText",
                "PasteFromWord",
                "-",
                "Undo",
                "Redo"
              ]
            },
            {
              name: "editing",
              items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
            },
            {
              name: "forms",
              items: [
                "Form",
                "Checkbox",
                "Radio",
                "TextField",
                "Textarea",
                "Select",
                "Button",
                "ImageButton",
                "HiddenField"
              ]
            },
            "/",
            {
              name: "basicstyles",
              items: [
                "Bold",
                "Italic",
                "Underline",
                "Strike",
                "Subscript",
                "Superscript",
                "-",
                "CopyFormatting",
                "RemoveFormat"
              ]
            },
            {
              name: "paragraph",
              items: [
                "NumberedList",
                "BulletedList",
                "-",
                "Outdent",
                "Indent",
                "-",
                "Blockquote",
                "CreateDiv",
                "-",
                "JustifyLeft",
                "JustifyCenter",
                "JustifyRight",
                "JustifyBlock",
                "-",
                "BidiLtr",
                "BidiRtl",
                "Language"
              ]
            },
            { name: "links", items: ["Link", "Unlink", "Anchor"] },
            {
              name: "insert",
              items: [
                "Image",
                "Flash",
                "Table",
                "HorizontalRule",
                "Smiley",
                "SpecialChar",
                "PageBreak",
                "Iframe",
                "InsertPre"
              ]
            },
            "/",
            { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
            { name: "colors", items: ["TextColor", "BGColor"] },
            { name: "tools", items: ["Maximize", "ShowBlocks"] },
            { name: "about", items: ["About"] }
          ],
          height: 300
        }
      };
    },
    methods: {
      async editRecom() {
        try {
          await RecomService.put(this.recom);
          this.$router.push({
            name: "recoms"
          });
        } catch (err) {
          console.log(err);
        }
      },
      navigateTo(route) {
        console.log(route);
        this.$router.push(route);
      },
      wait(ms) {
        return x => {
          return new Promise(resolve => setTimeout(() => resolve(x), ms));
        };
      },
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        // this.uploadedFiles = []
        this.uploadError = null;
        this.uploadedFileNames = [];
      },
      async save(formData) {
        // upload data to the server
        try {
          this.currentStatus = STATUS_SAVING;
          await UploadService.upload(formData);
          this.currentStatus = STATUS_SUCCESS;
  
          // update image uploaded display
          let pictureJSON = [];
          this.uploadedFileNames.forEach(uploadFilename => {
            let found = false;
            for (let i = 0; i < this.pictures.length; i++) {
              if (this.pictures[i].name == uploadFilename) {
                found = true;
                break;
              }
            }
            if (!found) {
              this.pictureIndex++;
              let pictureJSON = {
                id: this.pictureIndex,
                name: uploadFilename
              };
              this.pictures.push(pictureJSON);
            }
          });
  
          this.clearUploadResult();
        } catch (error) {
          console.log(error);
          this.currentStatus = STATUS_FAILED;
        }
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
          this.uploadedFileNames.push(fileList[x].name);
        });
        // save it
        this.save(formData);
      },
      clearUploadResult: function() {
        setTimeout(() => this.reset(), 5000);
      },
      async delFile(material) {
        let result = confirm("Want to delete?");
        if (result) {
          let dataJSON = {
            filename: material.name
          };
          await UploadService.delete(dataJSON);
          for (var i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].id === material.id) {
              this.pictures.splice(i, 1);
              this.materialIndex--;
              break;
            }
          }
        }
      },
      useThumbnail(filename) {
        console.log(filename);
        this.recom.thumbnail = filename;
      }
    },
    async created() {
      this.reset();
      try {
        let recomId = this.$route.params.recomId;
        this.recom = (await RecomsService.show(recomId)).data;
      } catch (error) {
        console.log(error);
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    components: {
      VueCkeditor
    }
  };
  </script>
  <style scoped>
      
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lemonchiffon;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  .dropbox:hover {
    background: khaki; /* when mouse over to the drop zone, change color
      */
  }
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
  ul.pictures {
    list-style: none;
    padding: 0;
    margin: 0;
    float: left;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  ul.pictures li {
    float: left;
  }
  ul.pictures li img {
    max-width: 180px;
    margin-right: 20px;
  }
  .clearfix {
    clear: both;
  }
  .thumbnail-pic img {
    width: 200px;
  }
  </style>
  <style>
  
  .button1 {
    background-color: white;
    color: black;
    border: 2px solid #4CAF50; /* Green */
  }
  .button2 {
    background-color: white;
    color: black;
    border: 2px solid #e1ff34; /* Green */
  }
  .button3 {
    background-color: white;
    color: black;
    border: 2px solid #ff0000; /* Green */
  }
  .button1:hover {
    background-color: #caffd2; /* Green */
    color: white;
  }
  .button2:hover {
    background-color: #faffb7; /* Green */
    color: white;
  }
  .button3:hover {
    background-color: #ff6c6c; /* Green */
    color: white;
  }
  </style>
  
  