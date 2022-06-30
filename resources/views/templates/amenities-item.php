  <script id="tien-ich-tmpl" type="text/template7">
  <div class="amenity-content">
      <div class="notChild">
      {{#each this.notChild}}
        <div class="col-md-4 utilitie-item-content">
            <div class="checkbox">
            <label><input type="checkbox" data="{{amenityChild.length}}"  class="utilitie" name="" dataText="{{amenityName}}" value="{{id}}">{{amenityName}}</label>
            </div>

          <div class="amenityc-child-content" data="{{amenityChild.length}}" >
            {{#each amenityChild}}
           
                <div class="checkbox">
                <label><input type="checkbox" class="amenityc-child" data="0" name="" dataText="{{amenityName}}" value="{{id}}">{{amenityName}}</label>
                </div>
           
            {{/each}}
          </div>
        </div>
      {{/each}}
      </div>
      <div class="notChild">
      {{#each this.hasChild}}
        <div class="col-md-4 utilitie-item-content">
            <div class="checkbox">
            <label><input type="checkbox" data="{{amenityChild.length}}"  class="utilitie" name="" dataText="{{amenityName}}" value="{{id}}">{{amenityName}}</label>
            </div>

          <div style="padding-left: 10px; border-left: 1px solid #dedede" class="amenityc-child-content" data="{{amenityChild.length}}" >
            {{#each amenityChild}}
           
                <div class="checkbox">
                <label><input type="checkbox" class="amenityc-child" data="0" name="" dataText="{{amenityName}}" value="{{id}}">{{amenityName}}</label>
                </div>
           
            {{/each}}
          </div>
        </div>
      {{/each}}
      </div>

  </div>
  </script>
  
    <script id="tien-ich-by-listing-type-tmpl" type="text/template7">
  <div class="amenity-content">
      <div class="notChild">
      {{#each this.notChild}}
        <div class="col-md-4 utilitie-item-content">
            <div class="checkbox">
            <label><input type="checkbox" data="{{childs.length}}"  class="utilitie" name="" dataText="{{name}}" value="{{id}}">{{name}}</label>
            </div>

          <div class="amenityc-child-content" data="{{childs.length}}" >
            {{#each amenityChild}}
           
                <div class="checkbox">
                <label><input type="checkbox" class="amenityc-child" data="0" name="" dataText="{{name}}" value="{{id}}">{{name}}</label>
                </div>
           
            {{/each}}
          </div>
        </div>
      {{/each}}
      </div>
      <div class="notChild">
      {{#each this.hasChild}}
        <div class="col-md-4 utilitie-item-content">
            <div class="checkbox">
            <label><input type="checkbox" data="{{childs.length}}"  class="utilitie" name="" dataText="{{name}}" value="{{id}}">{{name}}</label>
            </div>

          <div style="padding-left: 10px; border-left: 1px solid #dedede" class="amenityc-child-content" data="{{childs.length}}" >
            {{#each childs}}
           
                <div class="checkbox">
                <label><input type="checkbox" class="amenityc-child" data="0" name="" dataText="{{name}}" value="{{id}}">{{name}}</label>
                </div>
           
            {{/each}}
          </div>
        </div>
      {{/each}}
      </div>

  </div>
  </script>

  