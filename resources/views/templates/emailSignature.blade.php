@if(!empty($currentUser->signature != null))
    {!! $currentUser->signature !!}
@else
<table width="100%" style="color: #165aa9;" cellspacing="0" cellpadding="10" style="margin-bottom:10px">
  <tr>
     <td style="padding-left:0px" width="15%" height="60px">
        <table>
           <tr>
              <td>
                 <a href="propzy.vn"><img width="80" src="https://cdn.propzy.vn/images_email_template/v3/logo-2.png"></a>
              </td>
           </tr>
           <tr>
              <td height="80">
              </td>
           </tr>
        </table>
     </td>
     
     <td style="border-left:2px solid #165aa9;x" width="85%">
        <table>
           <tr>
              <td style="padding:0 0 0 20px">
                 <h3 style="color: #165aa9;margin: 0;font-size:20px">{{$currentUser->name}}</h3>
              </td>
           </tr>
           <tr class="bl-address">
              <td style="padding:0 0 0 20px">
                 Flemington Tower <br>
                 182 Le Dai Hanh St, Suite 4.02, Ward 15, District 11,HCMC
              </td>
           </tr>
           <tr>
              <td style="padding:0 0 0 20px">
                 <div class="bl-phone">
                    @if(!empty($currentUser->phone))
                        Mobile: <span style="color: #f27423;font-weight:bold">{{$currentUser->phone}}</span>
                    @endif
                    Office: <span style="color: #f27423;font-weight:bold">(028) 73 066 099</span>
                    <br>Website: <span><a style="color: #f27423;font-weight:bold" href="propzy.vn">https://propzy.vn</a></span>
                 </div>
              </td>
              
           </tr>
           <tr>
              
           </tr>
        </table>
    </td>
</tr>
</table>
    
@endif