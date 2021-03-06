using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Amadeus_Cloud_Reporting_Back_end
{
    public partial class AmadeusDBContext : DbContext
    {
        public AmadeusDBContext()
        {
        }

        public AmadeusDBContext(DbContextOptions<AmadeusDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AmadeusArticle> AmadeusArticles { get; set; }
        public virtual DbSet<AmadeusIntermediate> AmadeusIntermediates { get; set; }
        public virtual DbSet<AmadeusLogging> AmadeusLoggings { get; set; }
        public virtual DbSet<AmadeusLoggingparam> AmadeusLoggingparams { get; set; }
        public virtual DbSet<AmadeusPmbox> AmadeusPmboxes { get; set; }
        public virtual DbSet<AmadeusProportioning> AmadeusProportionings { get; set; }
        public virtual DbSet<AmadeusProportioningrecord> AmadeusProportioningrecords { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=127.0.0.1;Database=AmadeusDB;Username=postgres;Password=Liebregts10");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "English_United States.1252");

            modelBuilder.Entity<AmadeusArticle>(entity =>
            {
                entity.HasKey(e => e.ArticleDbid)
                    .HasName("amadeus_article_pkey");

                entity.ToTable("amadeus_article");

                entity.HasIndex(e => e.ArticleId, "article_id_unique")
                    .IsUnique();

                entity.Property(e => e.ArticleDbid)
                    .HasColumnName("article_dbid")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.ArticleId)
                    .IsRequired()
                    .HasMaxLength(15)
                    .HasColumnName("article_id");

                entity.Property(e => e.Density).HasColumnName("density");

                entity.Property(e => e.Generatenewtable)
                    .HasColumnType("bit(1)")
                    .HasColumnName("generatenewtable")
                    .HasDefaultValueSql("'0'::\"bit\"");

                entity.Property(e => e.InC1Adfll).HasColumnName("in_c1_adfll");

                entity.Property(e => e.InC1Adful).HasColumnName("in_c1_adful");

                entity.Property(e => e.InC1Gain).HasColumnName("in_c1_gain");

                entity.Property(e => e.InC1Maxflow).HasColumnName("in_c1_maxflow");

                entity.Property(e => e.InC1Minflow).HasColumnName("in_c1_minflow");

                entity.Property(e => e.InC2LnFactor).HasColumnName("in_c2_ln_factor");

                entity.Property(e => e.InC2MinimalOscillation).HasColumnName("in_c2_minimal_oscillation");

                entity.Property(e => e.InC2OscillationFactor).HasColumnName("in_c2_oscillation_factor");

                entity.Property(e => e.InC2OscillationSpeed).HasColumnName("in_c2_oscillation_speed");
                    
                entity.Property(e => e.InC2PolyFactors1).HasColumnName("in_c2_poly_factors_1");

                entity.Property(e => e.InC2PolyFactors2).HasColumnName("in_c2_poly_factors_2");

                entity.Property(e => e.InC2PolyFactors3).HasColumnName("in_c2_poly_factors_3");

                entity.Property(e => e.InC2PolyFactors4).HasColumnName("in_c2_poly_factors_4");

                entity.Property(e => e.InC2PolyFactors5).HasColumnName("in_c2_poly_factors_5");

                entity.Property(e => e.InCsDensity).HasColumnName("in_cs_density");

                entity.Property(e => e.InCsMaxflow).HasColumnName("in_cs_maxflow");

                entity.Property(e => e.InCsMinimalOscillation).HasColumnName("in_cs_minimal_oscillation");

                entity.Property(e => e.InCsOscillationFactor).HasColumnName("in_cs_oscillation_factor");

                entity.Property(e => e.InCsOsillationSpeed).HasColumnName("in_cs_osillation_speed");

                entity.Property(e => e.InCsPlvKnocker)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("in_cs_plv_knocker");

                entity.Property(e => e.InCsProductactivationcycletime).HasColumnName("in_cs_productactivationcycletime");

                entity.Property(e => e.InCsProductactivationfactor).HasColumnName("in_cs_productactivationfactor");

                entity.Property(e => e.InCsScantime).HasColumnName("in_cs_scantime");

                entity.Property(e => e.InCsStartthreshold).HasColumnName("in_cs_startthreshold");

                entity.Property(e => e.InIfMaxweight).HasColumnName("in_if_maxweight");

                entity.Property(e => e.InIfStandstillft).HasColumnName("in_if_standstillft");

                entity.Property(e => e.InIfStandstilltt).HasColumnName("in_if_standstilltt");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<AmadeusIntermediate>(entity =>
            {
                entity.HasKey(e => e.IntermediateDbid)
                    .HasName("amadeus_intermediates_pkey");

                entity.ToTable("amadeus_intermediates");

                entity.Property(e => e.IntermediateDbid)
                    .HasColumnName("intermediate_dbid")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.ActivationFactor).HasColumnName("activation_factor");

                entity.Property(e => e.AdlVersion).HasColumnName("adl_version");

                entity.Property(e => e.ArticleDbid).HasColumnName("article_dbid");

                entity.Property(e => e.ArticleName)
                    .HasColumnType("character varying(15)[]")
                    .HasColumnName("article_name");

                entity.Property(e => e.Flow).HasColumnName("flow");

                entity.Property(e => e.MeasurementTime).HasColumnName("measurement_time");

                entity.Property(e => e.Opening).HasColumnName("opening");

                entity.Property(e => e.OscillationFactor).HasColumnName("oscillation_factor");

                entity.Property(e => e.OscillationMin).HasColumnName("oscillation_min");

                entity.Property(e => e.OscillationSpeed).HasColumnName("oscillation_speed");

                entity.Property(e => e.ProportioningDbid).HasColumnName("proportioning_dbid");

                entity.Property(e => e.Stdev).HasColumnName("stdev");

                entity.Property(e => e.Timestamp)
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("timestamp");

                entity.HasOne(d => d.ArticleDb)
                    .WithMany(p => p.AmadeusIntermediates)
                    .HasForeignKey(d => d.ArticleDbid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_article_dbid");

                entity.HasOne(d => d.ProportioningDb)
                    .WithMany(p => p.AmadeusIntermediates)
                    .HasForeignKey(d => d.ProportioningDbid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_proportioning_dbid");
            });

            modelBuilder.Entity<AmadeusLogging>(entity =>
            {
                entity.HasKey(e => e.LoggingDbid)
                    .HasName("amadeus_logging_pkey");

                entity.ToTable("amadeus_logging");

                entity.Property(e => e.LoggingDbid)
                    .HasColumnName("logging_dbid")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.C1DesiredFlow).HasColumnName("c1_desired_flow");

                entity.Property(e => e.C1Done)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("c1_done");

                entity.Property(e => e.C1ExpectedFlow).HasColumnName("c1_expected_flow");

                entity.Property(e => e.C1Newdatarequired)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("c1_newdatarequired");

                entity.Property(e => e.C1OscillationSpeed).HasColumnName("c1_oscillation_speed");

                entity.Property(e => e.C1Outputenabled)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("c1_outputenabled");

                entity.Property(e => e.C1PlvKnocker)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("c1_plv_knocker");

                entity.Property(e => e.C1Productactivationcycletime).HasColumnName("c1_productactivationcycletime");

                entity.Property(e => e.C1Productactivationfactor).HasColumnName("c1_productactivationfactor");

                entity.Property(e => e.C1SlideOpening).HasColumnName("c1_slide_opening");

                entity.Property(e => e.C1SlideOscillation).HasColumnName("c1_slide_oscillation");

                entity.Property(e => e.C3DesiredCrankPosition).HasColumnName("c3_desired_crank_position");

                entity.Property(e => e.C3DesiredSlidePosition).HasColumnName("c3_desired_slide_position");

                entity.Property(e => e.C3Knockers)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("c3_knockers");

                entity.Property(e => e.C3Vibrators)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("c3_vibrators");

                entity.Property(e => e.CsFillingstage).HasColumnName("cs_fillingstage");

                entity.Property(e => e.CsMaxflowreached)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("cs_maxflowreached");

                entity.Property(e => e.CsOscillationSpeed).HasColumnName("cs_oscillation_speed");

                entity.Property(e => e.CsPlvKnocker)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("cs_plv_knocker");

                entity.Property(e => e.CsProductactivationcycletime).HasColumnName("cs_productactivationcycletime");

                entity.Property(e => e.CsProductactivationfactor).HasColumnName("cs_productactivationfactor");

                entity.Property(e => e.CsSlideOpening).HasColumnName("cs_slide_opening");

                entity.Property(e => e.CsSlideOscillation).HasColumnName("cs_slide_oscillation");

                entity.Property(e => e.CsStuffingdone)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("cs_stuffingdone");

                entity.Property(e => e.D2eD2eStage).HasColumnName("d2e_d2e_stage");

                entity.Property(e => e.D2eDone)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("d2e_done");

                entity.Property(e => e.D2eExpectedFlow).HasColumnName("d2e_expected_flow");

                entity.Property(e => e.D2eOscillationSpeed).HasColumnName("d2e_oscillation_speed");

                entity.Property(e => e.D2ePlvKnocker)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("d2e_plv_knocker");

                entity.Property(e => e.D2eProductactivationcycletime).HasColumnName("d2e_productactivationcycletime");

                entity.Property(e => e.D2eProductactivationfactor).HasColumnName("d2e_productactivationfactor");

                entity.Property(e => e.D2eSlideOpening).HasColumnName("d2e_slide_opening");

                entity.Property(e => e.D2eSlideOscillation).HasColumnName("d2e_slide_oscillation");

                entity.Property(e => e.FFilteredWeight1).HasColumnName("f_filtered_weight_1");

                entity.Property(e => e.FFilteredWeight10).HasColumnName("f_filtered_weight_10");

                entity.Property(e => e.FFilteredWeight11).HasColumnName("f_filtered_weight_11");

                entity.Property(e => e.FFilteredWeight2).HasColumnName("f_filtered_weight_2");

                entity.Property(e => e.FFilteredWeight3).HasColumnName("f_filtered_weight_3");

                entity.Property(e => e.FFilteredWeight4).HasColumnName("f_filtered_weight_4");

                entity.Property(e => e.FFilteredWeight5).HasColumnName("f_filtered_weight_5");

                entity.Property(e => e.FFilteredWeight6).HasColumnName("f_filtered_weight_6");

                entity.Property(e => e.FFilteredWeight7).HasColumnName("f_filtered_weight_7");

                entity.Property(e => e.FFilteredWeight8).HasColumnName("f_filtered_weight_8");

                entity.Property(e => e.FFilteredWeight9).HasColumnName("f_filtered_weight_9");

                entity.Property(e => e.FFlow1).HasColumnName("f_flow_1");

                entity.Property(e => e.FFlow10).HasColumnName("f_flow_10");

                entity.Property(e => e.FFlow11).HasColumnName("f_flow_11");

                entity.Property(e => e.FFlow2).HasColumnName("f_flow_2");

                entity.Property(e => e.FFlow3).HasColumnName("f_flow_3");

                entity.Property(e => e.FFlow4).HasColumnName("f_flow_4");

                entity.Property(e => e.FFlow5).HasColumnName("f_flow_5");

                entity.Property(e => e.FFlow6).HasColumnName("f_flow_6");

                entity.Property(e => e.FFlow7).HasColumnName("f_flow_7");

                entity.Property(e => e.FFlow8).HasColumnName("f_flow_8");

                entity.Property(e => e.FFlow9).HasColumnName("f_flow_9");

                entity.Property(e => e.IfAccuracy).HasColumnName("if_accuracy");

                entity.Property(e => e.IfDosedTime1).HasColumnName("if_dosed_time_1");

                entity.Property(e => e.IfDosedTime2).HasColumnName("if_dosed_time_2");

                entity.Property(e => e.IfDosedTime3).HasColumnName("if_dosed_time_3");

                entity.Property(e => e.IfDosedTime4).HasColumnName("if_dosed_time_4");

                entity.Property(e => e.IfDosedTime5).HasColumnName("if_dosed_time_5");

                entity.Property(e => e.IfDosedTime6).HasColumnName("if_dosed_time_6");

                entity.Property(e => e.IfDosedTime7).HasColumnName("if_dosed_time_7");

                entity.Property(e => e.IfDosedWeight).HasColumnName("if_dosed_weight");

                entity.Property(e => e.IfDosingActive)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("if_dosing_active");

                entity.Property(e => e.IfNetWeight1).HasColumnName("if_net_weight_1");

                entity.Property(e => e.IfNetWeight10).HasColumnName("if_net_weight_10");

                entity.Property(e => e.IfNetWeight11).HasColumnName("if_net_weight_11");

                entity.Property(e => e.IfNetWeight2).HasColumnName("if_net_weight_2");

                entity.Property(e => e.IfNetWeight3).HasColumnName("if_net_weight_3");

                entity.Property(e => e.IfNetWeight4).HasColumnName("if_net_weight_4");

                entity.Property(e => e.IfNetWeight5).HasColumnName("if_net_weight_5");

                entity.Property(e => e.IfNetWeight6).HasColumnName("if_net_weight_6");

                entity.Property(e => e.IfNetWeight7).HasColumnName("if_net_weight_7");

                entity.Property(e => e.IfNetWeight8).HasColumnName("if_net_weight_8");

                entity.Property(e => e.IfNetWeight9).HasColumnName("if_net_weight_9");

                entity.Property(e => e.IfSameproduct)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("if_sameproduct");

                entity.Property(e => e.IfSetpoint).HasColumnName("if_setpoint");

                entity.Property(e => e.IfStandstill)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("if_standstill");

                entity.Property(e => e.IfStandstillEp).HasColumnName("if_standstill_ep");

                entity.Property(e => e.IfStandstillFlow).HasColumnName("if_standstill_flow");

                entity.Property(e => e.IfTareweight).HasColumnName("if_tareweight");

                entity.Property(e => e.IfTypeofdosing).HasColumnName("if_typeofdosing");

                entity.Property(e => e.PlantActualTorque).HasColumnName("plant_actual_torque");

                entity.Property(e => e.PlantCrankPosition).HasColumnName("plant_crank_position");

                entity.Property(e => e.PlantLoadcell).HasColumnName("plant_loadcell");

                entity.Property(e => e.PlantMoisture).HasColumnName("plant_moisture");

                entity.Property(e => e.PlantSlidePosition).HasColumnName("plant_slide_position");

                entity.Property(e => e.PlantTemperature).HasColumnName("plant_temperature");

                entity.Property(e => e.ProportioningDbid).HasColumnName("proportioning_dbid");

                entity.HasOne(d => d.ProportioningDb)
                    .WithMany(p => p.AmadeusLoggings)
                    .HasForeignKey(d => d.ProportioningDbid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_proportioning_dbid");
            });

            modelBuilder.Entity<AmadeusLoggingparam>(entity =>
            {
                entity.HasKey(e => e.LoggingparamDbid)
                    .HasName("amadeus_loggingparam_pkey");

                entity.ToTable("amadeus_loggingparam");

                entity.Property(e => e.LoggingparamDbid)
                    .HasColumnName("loggingparam_dbid")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.C1Adfll).HasColumnName("c1_adfll");

                entity.Property(e => e.C1Adful).HasColumnName("c1_adful");

                entity.Property(e => e.C1Gain).HasColumnName("c1_gain");

                entity.Property(e => e.C1Maxflow).HasColumnName("c1_maxflow");

                entity.Property(e => e.C1Minflow).HasColumnName("c1_minflow");

                entity.Property(e => e.C2LnFactor).HasColumnName("c2_ln_factor");

                entity.Property(e => e.C2MinimalOscillation).HasColumnName("c2_minimal_oscillation");

                entity.Property(e => e.C2OscillationFactor).HasColumnName("c2_oscillation_factor");

                entity.Property(e => e.C2OscillationSpeed).HasColumnName("c2_oscillation_speed");

                entity.Property(e => e.C2PolyFactors0).HasColumnName("c2_poly_factors_0");

                entity.Property(e => e.C2PolyFactors1).HasColumnName("c2_poly_factors_1");

                entity.Property(e => e.C2PolyFactors2).HasColumnName("c2_poly_factors_2");

                entity.Property(e => e.C2PolyFactors3).HasColumnName("c2_poly_factors_3");

                entity.Property(e => e.C2PolyFactors4).HasColumnName("c2_poly_factors_4");

                entity.Property(e => e.CsDensity).HasColumnName("cs_density");

                entity.Property(e => e.CsMaxflow).HasColumnName("cs_maxflow");

                entity.Property(e => e.CsMinimalOscillation).HasColumnName("cs_minimal_oscillation");

                entity.Property(e => e.CsOscillationFactor).HasColumnName("cs_oscillation_factor");

                entity.Property(e => e.CsOscillationSpeed).HasColumnName("cs_oscillation_speed");

                entity.Property(e => e.CsPlvKnocker)
                    .HasColumnType("bit(1)")
                    .HasColumnName("cs_plv_knocker");

                entity.Property(e => e.CsProductActivationCycleTime).HasColumnName("cs_product_activation_cycle_time");

                entity.Property(e => e.CsProductActivationFactor).HasColumnName("cs_product_activation_factor");

                entity.Property(e => e.CsScanTime).HasColumnName("cs_scan_time");

                entity.Property(e => e.CsStartThreshold).HasColumnName("cs_start_threshold");

                entity.Property(e => e.IfAccuracy).HasColumnName("if_accuracy");

                entity.Property(e => e.IfMaxweight).HasColumnName("if_maxweight");

                entity.Property(e => e.IfSameProduct)
                    .HasColumnType("bit(1)")
                    .HasColumnName("if_same_product");

                entity.Property(e => e.IfSetpoint).HasColumnName("if_setpoint");

                entity.Property(e => e.IfStandStillFt).HasColumnName("if_stand_still_ft");

                entity.Property(e => e.IfStandStillTt).HasColumnName("if_stand_still_tt");

                entity.Property(e => e.IfStart)
                    .HasColumnType("bit(1)")
                    .HasColumnName("if_start");

                entity.Property(e => e.IfStop)
                    .HasColumnType("bit(1)")
                    .HasColumnName("if_stop");

                entity.Property(e => e.IfTypeOfDosing).HasColumnName("if_type_of_dosing");

                entity.Property(e => e.PlantActualTorque).HasColumnName("plant_actual_torque");

                entity.Property(e => e.PlantCrankPosition).HasColumnName("plant_crank_position");

                entity.Property(e => e.PlantLoadcell).HasColumnName("plant_loadcell");

                entity.Property(e => e.PlantMoisture).HasColumnName("plant_moisture");

                entity.Property(e => e.PlantTemperature).HasColumnName("plant_temperature");

                entity.Property(e => e.ProportioningDbid).HasColumnName("proportioning_dbid");

                entity.HasOne(d => d.ProportioningDb)
                    .WithMany(p => p.AmadeusLoggingparams)
                    .HasForeignKey(d => d.ProportioningDbid)
                    .HasConstraintName("fk_proportioning_dbid");
            });

            modelBuilder.Entity<AmadeusPmbox>(entity =>
            {
                entity.HasKey(e => e.PmboxDbid)
                    .HasName("amadeus_pmbox_pkey");

                entity.ToTable("amadeus_pmbox");

                entity.Property(e => e.PmboxDbid)
                    .HasColumnName("pmbox_dbid")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.Articleid)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("articleid");

                entity.Property(e => e.Blocked)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("blocked");

                entity.Property(e => e.Boxid)
                    .IsRequired()
                    .HasMaxLength(16)
                    .HasColumnName("boxid");

                entity.Property(e => e.Caltest)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("caltest");

                entity.Property(e => e.Dirty)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("dirty");

                entity.Property(e => e.Display)
                    .IsRequired()
                    .HasMaxLength(80)
                    .HasColumnName("display");

                entity.Property(e => e.Empty)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("empty");

                entity.Property(e => e.Filled)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("filled");

                entity.Property(e => e.Ingredient)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("ingredient");

                entity.Property(e => e.Lasttimefilled).HasColumnName("lasttimefilled");

                entity.Property(e => e.Lasttimeused).HasColumnName("lasttimeused");

                entity.Property(e => e.Lidweight).HasColumnName("lidweight");

                entity.Property(e => e.Lotno)
                    .IsRequired()
                    .HasMaxLength(15)
                    .HasColumnName("lotno");

                entity.Property(e => e.Mix)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("mix");

                entity.Property(e => e.Netweight).HasColumnName("netweight");

                entity.Property(e => e.Partial)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("partial");

                entity.Property(e => e.Sequence).HasColumnName("sequence");

                entity.Property(e => e.Tagid1)
                    .IsRequired()
                    .HasMaxLength(16)
                    .HasColumnName("tagid_1");

                entity.Property(e => e.Tagid2)
                    .IsRequired()
                    .HasMaxLength(16)
                    .HasColumnName("tagid_2");

                entity.Property(e => e.Tareweight).HasColumnName("tareweight");

                entity.Property(e => e.Undefined)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("undefined");

                entity.Property(e => e.Wetclean)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("wetclean");
            });

            modelBuilder.Entity<AmadeusProportioning>(entity =>
            {
                entity.HasKey(e => e.ProportioningDbid)
                    .HasName("amadeus_proportioning_pkey");

                entity.ToTable("amadeus_proportioning");

                entity.Property(e => e.ProportioningDbid)
                    .HasColumnName("proportioning_dbid")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.ArticleDbid).HasColumnName("article_dbid");

                entity.Property(e => e.DestinationDbid).HasColumnName("destination_dbid");

                entity.Property(e => e.ProportioningRecordDbid).HasColumnName("proportioning_record_dbid");

                entity.Property(e => e.SourceDbid).HasColumnName("source_dbid");

                entity.HasOne(d => d.ArticleDb)
                    .WithMany(p => p.AmadeusProportionings)
                    .HasForeignKey(d => d.ArticleDbid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_article_dbid");

                entity.HasOne(d => d.DestinationDb)
                    .WithMany(p => p.AmadeusProportioningDestinationDbs)
                    .HasForeignKey(d => d.DestinationDbid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_destination_dbid");

                entity.HasOne(d => d.ProportioningRecordDb)
                    .WithMany(p => p.AmadeusProportionings)
                    .HasForeignKey(d => d.ProportioningRecordDbid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_proportioning_record_dbid");

                entity.HasOne(d => d.SourceDb)
                    .WithMany(p => p.AmadeusProportioningSourceDbs)
                    .HasForeignKey(d => d.SourceDbid)
                    .HasConstraintName("fk_source_dbid");
            });

            modelBuilder.Entity<AmadeusProportioningrecord>(entity =>
            {
                entity.HasKey(e => e.ProportioningrecordDbid)
                    .HasName("PK_proportioningrecord_dbid");

                entity.ToTable("amadeus_proportioningrecord");

                entity.HasIndex(e => e.ProportioningrecordId, "proportioningrecord_id_unique")
                    .IsUnique();

                entity.Property(e => e.ProportioningrecordDbid)
                    .HasColumnName("proportioningrecord_dbid")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.Actualamount).HasColumnName("actualamount");

                entity.Property(e => e.ArticleId)
                    .IsRequired()
                    .HasMaxLength(15)
                    .HasColumnName("article_id");

                entity.Property(e => e.ArticleName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("article_name");

                entity.Property(e => e.Articledensity).HasColumnName("articledensity");

                entity.Property(e => e.BatchId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("batch_id");

                entity.Property(e => e.BoxId)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("box_id");

                entity.Property(e => e.EndTime).HasColumnName("end_time");

                entity.Property(e => e.Ingredientboxid)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("ingredientboxid");

                entity.Property(e => e.Ingredientlotid)
                    .IsRequired()
                    .HasMaxLength(15)
                    .HasColumnName("ingredientlotid");

                entity.Property(e => e.LotId)
                    .IsRequired()
                    .HasMaxLength(15)
                    .HasColumnName("lot_id");

                entity.Property(e => e.Manufacturingorderid)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("manufacturingorderid");

                entity.Property(e => e.Measuredangleofrepose).HasColumnName("measuredangleofrepose");

                entity.Property(e => e.Measureddensity).HasColumnName("measureddensity");

                entity.Property(e => e.Proportioninglocation).HasColumnName("proportioninglocation");

                entity.Property(e => e.ProportioningrecordId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("proportioningrecord_id");

                entity.Property(e => e.Proportioningsequencenr).HasColumnName("proportioningsequencenr");

                entity.Property(e => e.Proportioningstatus).HasColumnName("proportioningstatus");

                entity.Property(e => e.Requestedamount).HasColumnName("requestedamount");

                entity.Property(e => e.Requestreceivedtime).HasColumnName("requestreceivedtime");

                entity.Property(e => e.Requiredalarmtolerance).HasColumnName("requiredalarmtolerance");

                entity.Property(e => e.Requiredtolerance).HasColumnName("requiredtolerance");

                entity.Property(e => e.StartTime).HasColumnName("start_time");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
