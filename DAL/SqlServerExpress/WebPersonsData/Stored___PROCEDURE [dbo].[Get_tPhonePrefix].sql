USE [WebPersonData]
GO
/****** Object:  StoredProcedure [dbo].[Get_tPhonePrefix]    Script Date: 2021-12-07 05:26:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Victor>
-- ALTER date: <03/12/2021>
-- Description:	<[Get_tPhonePrefix]>
-- =============================================
ALTER PROCEDURE [dbo].[Get_tPhonePrefix]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select  
		Id,
		tPrefix
	
		from tPhonePrefix
END

