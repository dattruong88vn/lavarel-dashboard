@foreach (Session::get("user")->departments as $departments) 
                @if ( $departments-> id === 1)
                    @include('layout.sub.sb-listing-service')
                @elseif ( $departments-> id=== 2)
                    @include('layout.sub.sb-agent-support')
                @elseif ( $departments-> id === 3)
                    @include('layout.sub.sb-customer-service')
                @elseif ( $departments-> id === 4)
                    @include('layout.sub.sb-bussiness-development')
                @elseif ( $departments-> id === 5)
                    @include('layout.sub.sb-transaction-manager')
                @endif
            @endforeach