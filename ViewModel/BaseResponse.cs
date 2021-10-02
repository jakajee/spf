using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.ViewModel
{
    public class BaseResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }

        public BaseResponse(bool isSuccess = true, string message = "ทำงานสำเร็จ")
        {
            IsSuccess = isSuccess;
            Message = message;
        }

        public BaseResponse(string failMessage)
        {
            IsSuccess = false;
            Message = failMessage;
        }
    }
}
