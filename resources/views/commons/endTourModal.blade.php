<table class="table table-bordered listingViews">
    <thead>
        <tr>
            <th>LID</th>
            <th>TTYT</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Giá</th>
            <th>Ưu đãi giá</th>
            <th style="width:100px;color:orange" class="text-center"><i class="fa fa-star"></i></th>
            <th>Đánh giá từ KH</th>
            <th>Đánh giá từ khách hàng trên app</th>
            <th>Đánh giá từ CC</th>
            <th>Ngày xem</th>
        </tr>
    </thead>
    <tbody>
        @foreach($listings as $listing)
        <tr>
            <td><a onclick="JMDetail.openModalListingDetailForAllPage({{$listing->rlistingId}});return false;" href="#">{{$listing->rlistingId}}</a></td>
            <td>{{ !empty($listing->favoriteOrder)? $listing->favoriteOrder:"" }}</td>
            <td>{{$listing->address}}</td>
            <td>{{ $listing->statusNameForListing }}</td>
            <td>{{$listing->formatPrice}}</td>
            <td>{{!empty($listing->offers)?$listing->offers:""}}</td>
            <td class="text-center">
                <a href='#' class="starRenderPropzy" poin="{{number_format($listing->percentValue, 0)}}">
                    {{number_format($listing->percentValue, 0)."%"}}
                </a>
            </td>
            <td>
                <ul>
                    @if(!empty($listing->customerFeedbackForListing->customerFeedbackName))
                        <li>
                            Thích/không thích: {{ $listing->customerFeedbackForListing->customerFeedbackName }}
                        </li>
                    @endif
                    @if(!empty($listing->customerFeedbackForListing->reason))
                        <li>
                            Tại sao: {{ $listing->customerFeedbackForListing->reason }}
                        </li>
                    @endif
                    @if(!empty($listing->customerFeedbackForListing->investigateName))
                        <li>
                            Xem xét: {{ $listing->customerFeedbackForListing->investigateName }}
                        </li>
                    @endif
                </ul>
                <!-- 
                Tại sao: reason (CHECK NULL OR EMPTY giúp A )
                Xem xét: investigateName -->
            </td>
            <td>
                @if(isset($listing->customerFeedbackForTourOnApp) && count($listing->customerFeedbackForTourOnApp) > 0 )
                    <ul>
                    @foreach($listing->customerFeedbackForTourOnApp as $feedback)
                        <li>{{ $feedback->questionName }} : {{ $feedback->reasonName }}</li>
                    @endforeach
                    </ul>
                @else
                    N/A
                @endif
            </td>
            <td>
                @if(isset($listing->csFeedbackForListing) && count($listing->csFeedbackForListing) > 0 )
                    <ul>
                    @foreach($listing->csFeedbackForListing as $feedback)
                        <li>{{ $feedback->questionName }} : {{ $feedback->reasonName }}</li>
                    @endforeach
                    </ul>
                @endif
            </td>
            <td>{{ isset($listing->scheduleTime) ? date('d/m/Y H:i:s',$listing->scheduleTime/1000) : 'N/A' }}</td>
        </tr>
        @endforeach

    </tbody>
</table>