using System;
using System.Collections.Generic;
using System.Collections;

#nullable disable

namespace Amadeus_Cloud_Reporting_Back_end
{
    public partial class AmadeusPmbox
    {
        public AmadeusPmbox()
        {
            AmadeusProportioningDestinationDbs = new HashSet<AmadeusProportioning>();
            AmadeusProportioningSourceDbs = new HashSet<AmadeusProportioning>();
        }

        public int PmboxDbid { get; set; }
        public BitArray Empty { get; set; }
        public BitArray Filled { get; set; }
        public BitArray Dirty { get; set; }
        public BitArray Wetclean { get; set; }
        public BitArray Partial { get; set; }
        public BitArray Blocked { get; set; }
        public BitArray Ingredient { get; set; }
        public BitArray Mix { get; set; }
        public BitArray Undefined { get; set; }
        public BitArray Caltest { get; set; }
        public string Boxid { get; set; }
        public string Tagid1 { get; set; }
        public string Tagid2 { get; set; }
        public string Display { get; set; }
        public string Articleid { get; set; }
        public int Sequence { get; set; }
        public float Netweight { get; set; }
        public float Tareweight { get; set; }
        public float Lidweight { get; set; }
        public string Lotno { get; set; }
        public DateTime Lasttimefilled { get; set; }
        public DateTime Lasttimeused { get; set; }

        public virtual ICollection<AmadeusProportioning> AmadeusProportioningDestinationDbs { get; set; }
        public virtual ICollection<AmadeusProportioning> AmadeusProportioningSourceDbs { get; set; }
    }
}
