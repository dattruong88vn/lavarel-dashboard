@extends('layout.operation')

@section('content')

    <h1>Da render controller</h1>

    Tham so 1 : {{ $so_1 }} <br>
    Tham so 2 : {{ $so_2 }} <br>
    Tham so 3 : {{ $so_3 }} <br>

    <script>

        $(function(){
            console.log('chay javascript');
        });


    </script>

@endsection

@section('page-js')



@endsection

